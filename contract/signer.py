#!/usr/bin/env python3
# 
# Optics agents invoke the `eth_sendTransaction` rpc call that public rpc
#   services do not support. This script convert `eth_sendTransaction` calls
#   to `eth_sendRawTransaction` that public rpc services support.

import requests
import json
from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
from web3 import Web3

from jsonrpc import JSONRPCResponseManager, dispatcher

from_address = '0x00000000...agent.eoa.account...000000000'
private_key = '0000000000000000000000000000000000000000000000000000000000000000'

url = 'https://eth-ropsten.alchemyapi.io/v2/00000000...project.id...00000000'
chain_id = 3
# url = 'https://ethereum.rpc.evmos.dev/' # 'https://evmos-evm-rpc.tk/'
# chain_id = 9000
headers = {'content-type': 'application/json'}
id_ = 0

w3 = Web3(Web3.HTTPProvider(url))

def rpc(method, params):
    global id_
    payload = {
        "method": method,
        "params": params,
        "jsonrpc": "2.0",
        "id": id_
    }
    id_ = id_ + 1
    response = requests.post(
        url, data=json.dumps(payload), headers=headers).json()
    print(response)
    return response["result"]

def eth_sendTransaction(*params):
    tx = params[0]
    print('tx:', tx)
    tx['to'] = Web3.toChecksumAddress(tx['to'])
    tx['from'] = from_address
    # tx['value'] = '0'
    tx['nonce'] = w3.eth.getTransactionCount(from_address)
    tx['chainId'] = chain_id
    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    sent = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return sent.hex()

@Request.application
def application(request):
    print(request.data)
    dispatcher["eth_call"] = lambda *p: rpc('eth_call', [*p])
    dispatcher["eth_blockNumber"] = lambda: rpc('eth_blockNumber', [])
    dispatcher["eth_getLogs"] = lambda *p: rpc('eth_getLogs', [*p])
    dispatcher["eth_estimateGas"] = lambda *p: rpc('eth_estimateGas', [*p])
    dispatcher["eth_gasPrice"] = lambda: rpc('eth_gasPrice', [])
    dispatcher["eth_sendTransaction"] = eth_sendTransaction
    dispatcher["eth_chainId"] = lambda: rpc('eth_chainId', [])

    response = JSONRPCResponseManager.handle(
        request.data, dispatcher)
    return Response(response.json, mimetype='application/json')

if __name__ == '__main__':
    run_simple('localhost', 4000, application)

