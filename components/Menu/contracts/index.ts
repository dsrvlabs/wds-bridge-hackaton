import { Token } from '@components/Menu/token';
import BridgeRouter from './abi/BridgeRouter.json';
import ERC20 from './abi/erc20.json';

export class Contracts {
  static ABI = {
    BridgeRouter,
  };

  static ADDRESS = {
    BridgeRouter: {
      evmos: '0x12A274455eB87C58db07A54cAEC5e47CDb44e3d6', // devnet
      aurora: '', // testnet
      neon: '', // devnet
      ropsten: '0x92B4CB6D2ca56A092de42A0B972865DFC174791C',
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

  static getRPC(_network: string): string {
    let rpc = '';

    switch (_network) {
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

    return rpc;
  }

  static getBridgeRouter(_network: string): string {
    let to = '';

    switch (_network) {
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

    return to;
  }

  static getDestination(_destination: string): string {
    let destination = '';

    switch (_destination) {
      case 'evmos':
        destination = '0x075bcd15';
        break;
      case 'ethereum':
        destination = '0x0d51ae15';
        break;
      case 'aurora':
        break;
      case 'neon':
        break;
      default:
        break;
    }

    return destination;
  }

  static async getBalanceOf(network: string, _token: string, _who: string): Promise<string> {
    const rpc = Contracts.getRPC(network);
    const ethers = Contracts.getEthers();

    if (ethers && _token && rpc) {
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const erc20 = new ethers.Contract(_token, ERC20, provider);
      const balance = await erc20.callStatic.balanceOf(_who);
      return ethers.utils.formatEther(balance); // TODO: temp decimal
    }
    return '';
  }

  static async getAllowance(
    network: string,
    _token: string,
    _owner: string,
    limit: string,
  ): Promise<boolean> {
    const rpc = Contracts.getRPC(network);
    const ethers = Contracts.getEthers();
    const spender = Contracts.getBridgeRouter(network);

    if (ethers && _token && rpc) {
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const erc20 = new ethers.Contract(_token, ERC20, provider);
      const ammount = await erc20.callStatic.allowance(_owner, spender);
      return ethers.BigNumber.from(limit).lt(ammount);
    }
    return false;
  }

  static approveData(_spender: string, _amount: string): string {
    const ethers = Contracts.getEthers();
    if (ethers) {
      const iface = new ethers.utils.Interface(ERC20);
      const data = iface.encodeFunctionData('approve', [
        _spender,
        ethers.utils.parseEther(_amount),
      ]);
      return data;
    }
    return '';
  }

  static sendData(
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

      console.log('_amount', _amount, ethers.utils.parseEther(_amount).toString());
      console.log('_token', _token);
      console.log('_destination', _destination);
      console.log('_recipient', _recipient);
      console.log('data', data);

      return data;
    }
    return '';
  }

  static async approve(network: string, _token: string, _amount: string): Promise<string> {
    const welldone = Contracts.getWelldoneWallet();
    const spender = Contracts.getBridgeRouter(network);
    const hash = await welldone.sendTransaction(
      network,
      Contracts.approveData(spender, _amount),
      _token,
    );
    console.log(hash);
    return hash;
  }

  static async send(
    network: string,
    _token: string,
    _amount: string,
    _destination: string,
    _recipient: string,
  ): Promise<string> {
    const to = Contracts.getBridgeRouter(network);
    const destination = Contracts.getDestination(_destination);

    if (to) {
      const welldone = Contracts.getWelldoneWallet();
      const hash = await welldone.sendTransaction(
        network,
        Contracts.sendData(_token, _amount, destination, _recipient),
        to,
      );
      console.log(hash);
      return hash;
    }
    return '';
  }
}
