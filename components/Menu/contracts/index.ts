import { Token } from '@components/Menu/token';
import BridgeRouter from './abi/BridgeRouter.json';
import ERC20 from './abi/erc20.json';

export class Contracts {
  static ABI = {
    BridgeRouter,
  };

  static ADDRESS = {
    BridgeRouter: {
      evmos: '', // devnet
      aurora: '', // testnet
      neon: '', // devnet
      ropsten: '',
    },
  };

  static getEthers(): any {
    const { ethers } = window as any;
    return ethers.ethers;
  }

  static getWelldoneWallet(): any {
    const { welldone } = window as any;
    return welldone;
  }

  static tokenList: { [key: string]: Token[] } = {
    evmos: [
      {
        name: 'TKN-evmos',
        address: '0x85d2876C370F91D9a541dcca24B7932b4E793D7E',
      },
    ],
    ethereum: [
      {
        name: 'TKN-ropsten',
        address: '0x85d2876C370F91D9a541dcca24B7932b4E793D7E',
      },
    ],
  };

  static async getBalanceOf(network: string, _token: string, _who: string): Promise<string> {
    let rpc = '';

    switch (network) {
      case 'evmos':
        rpc = 'https://ethereum.rpc.evmos.dev';
        break;
      case 'ethereum':
        rpc = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
        break;
      case 'aurora':
        rpc = 'https://testnet.aurora.dev';
        break;
      case 'neon':
        rpc = 'https://proxy.devnet.neonlabs.org/solana';
        break;
      default:
        break;
    }

    const ethers = Contracts.getEthers();

    if (ethers && _token && rpc) {
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const erc20 = new ethers.Contract(_token, ERC20, provider);
      const balance = await erc20.callStatic.balanceOf(_who);
      return ethers.utils.formatEther(balance); // TODO: temp decimal
    }
    return '';
  }

  static makeData(
    _token: string,
    _amount: string,
    _destination: string,
    _recipient: string,
  ): string {
    const ethers = Contracts.getEthers();
    if (ethers) {
      const iface = new ethers.utils.Interface(BridgeRouter);
      const data = iface.encodeFunctionData('send', [
        _token,
        ethers.utils.parseEther(_amount),
        _destination,
        _recipient,
      ]);
      return data;
    }
    return '';
  }

  static async send(
    network: string,
    _token: string,
    _amount: string,
    _destination: string,
    _recipient: string,
  ): Promise<string> {
    let to = '';

    switch (network) {
      case 'evmos':
        to = Contracts.ADDRESS.BridgeRouter.evmos;
        break;
      case 'ethereum':
        to = Contracts.ADDRESS.BridgeRouter.ropsten;
        break;
      case 'aurora':
        to = Contracts.ADDRESS.BridgeRouter.aurora;
        break;
      case 'neon':
        to = Contracts.ADDRESS.BridgeRouter.neon;
        break;
      default:
        break;
    }

    if (to) {
      const welldone = Contracts.getWelldoneWallet();
      const hash = await welldone.sendTransaction(
        network,
        Contracts.makeData(_token, _amount, _destination, _recipient),
        to,
      );
      console.log(hash);
      return hash;
    }
    return '';
  }
}
