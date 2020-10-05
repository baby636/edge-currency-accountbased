// @flow

// import { bns } from 'biggystring'
import { Harmony } from '@harmony-js/core'
import { ChainID, ChainType, isPrivateKey } from '@harmony-js/utils'
// import or require settings
import { bns } from 'biggystring'
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from 'bip39'
import {
  type EdgeCorePluginOptions,
  type EdgeCurrencyEngine,
  type EdgeCurrencyEngineOptions,
  type EdgeCurrencyPlugin,
  type EdgeEncodeUri,
  type EdgeIo,
  type EdgeParsedUri,
  type EdgeWalletInfo
} from 'edge-core-js/types'
import { fromMasterSeed } from 'hdkey'

import { CurrencyPlugin } from '../common/plugin.js'
import { getDenomInfo } from '../common/utils.js'
import { OneEngine } from './oneEngine.js'
import { currencyInfo, GAS_LIMIT, GAS_PRICE } from './oneInfo'

export class OnePlugin extends CurrencyPlugin {
  harmonyApi: Harmony
  harmonyRpcNodes: Array<string>
  // connectionPool: Object

  constructor(io: EdgeIo) {
    super(io, 'one', currencyInfo)

    this.harmonyRpcNodes = []

    for (const rpcNode of currencyInfo.defaultSettings.otherSettings
      .oneServers) {
      this.harmonyRpcNodes.push(rpcNode)
    }

    this.harmonyApi = new Harmony(this.harmonyRpcNodes[0], {
      // chainType set to Harmony
      chainType: ChainType.Harmony,
      // chainType set to HmyLocal
      chainId: ChainID.HmyMainnet
    })
  }

  async importPrivateKey(userInput: string): Promise<Object> {
    if (/^(0x)?[0-9a-fA-F]{64}$/.test(userInput)) {
      if (!isPrivateKey(userInput)) {
        throw new Error('Invalid private key')
      }

      return { oneKey: userInput }
    } else {
      if (!validateMnemonic(userInput)) {
        throw new Error('Invalid mnemonic')
      }

      const account = await this.harmonyApi.wallet.addByMnemonic(userInput)

      const privateKey = account.privateKey.replace('0x', '')

      return { oneKey: privateKey, oneMnemonic: userInput }
    }
  }

  async createPrivateKey(walletType: string): Promise<Object> {
    const type = walletType.replace('wallet:', '')

    if (type === 'one') {
      const mnemonic = generateMnemonic(128).split(',').join(' ')

      const seed = await mnemonicToSeed(mnemonic)
      const hdKey = fromMasterSeed(seed)

      const path = '1023'
      const childKey = hdKey.derive("m/44'/" + path + "'/0'/0/" + 0)
      const privateKey = childKey.privateKey.toString('hex')

      return { oneKey: privateKey, oneMnemonic: mnemonic }
    } else {
      throw new Error('InvalidWalletType')
    }
  }

  async derivePublicKey(walletInfo: EdgeWalletInfo): Promise<Object> {
    const type = walletInfo.type.replace('wallet:', '')

    if (type === 'one') {
      const account = await this.harmonyApi.wallet.addByPrivateKey(
        walletInfo.keys.oneKey
      )

      const address = this.harmonyApi.crypto.getAddress(account.address).bech32

      return { publicKey: address }
    } else {
      throw new Error('InvalidWalletType')
    }
  }

  async parseUri(uri: string): Promise<EdgeParsedUri> {
    const networks = {
      one: true
    }

    const { edgeParsedUri } = this.parseUriCommon(currencyInfo, uri, networks)

    try {
      this.harmonyApi.crypto.getAddress(edgeParsedUri.publicAddress)
    } catch (e) {
      throw new Error('InvalidPublicAddressError')
    }

    return edgeParsedUri
  }

  async encodeUri(obj: EdgeEncodeUri): Promise<string> {
    try {
      this.harmonyApi.crypto.getAddress(obj.publicAddress)
    } catch (e) {
      throw new Error('InvalidPublicAddressError')
    }

    let amount
    if (typeof obj.nativeAmount === 'string') {
      const currencyCode: string = 'ONE'
      const nativeAmount: string = obj.nativeAmount

      const denom = getDenomInfo(currencyInfo, currencyCode)
      if (!denom) {
        throw new Error('ONE InternalErrorInvalidCurrencyCode')
      }
      // amount = nativeAmount
      amount = bns.div(nativeAmount, denom.multiplier, 18)
    }
    const encodedUri = this.encodeUriCommon(obj, 'one', amount)

    return encodedUri
  }
}

export function makeOnePlugin(opts: EdgeCorePluginOptions): EdgeCurrencyPlugin {
  const { io } = opts

  let toolsPromise: Promise<OnePlugin>
  function makeCurrencyTools(): Promise<OnePlugin> {
    if (toolsPromise != null) return toolsPromise
    toolsPromise = Promise.resolve(new OnePlugin(io))
    return toolsPromise
  }

  async function makeCurrencyEngine(
    walletInfo: EdgeWalletInfo,
    opts: EdgeCurrencyEngineOptions
  ): Promise<EdgeCurrencyEngine> {
    const tools = await makeCurrencyTools()
    const currencyEngine = new OneEngine(tools, walletInfo, opts)

    await currencyEngine.loadEngine(tools, walletInfo, opts)

    // This is just to make sure otherData is Flow type checked
    currencyEngine.otherData = currencyEngine.walletLocalData.otherData

    currencyEngine.otherData.gasPrice = GAS_PRICE
    currencyEngine.otherData.gasLimit = GAS_LIMIT

    if (!currencyEngine.otherData.recommendedFee) {
      currencyEngine.otherData.recommendedFee = String(GAS_PRICE * GAS_LIMIT)
    }

    const out: EdgeCurrencyEngine = currencyEngine
    return out
  }

  return {
    currencyInfo,
    makeCurrencyEngine,
    makeCurrencyTools
  }
}