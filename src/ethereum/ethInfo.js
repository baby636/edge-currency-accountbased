/* global */
// @flow

import type {
  EdgeCorePluginOptions,
  EdgeCurrencyInfo
} from 'edge-core-js/types'

import { imageServerUrl } from '../common/utils'
import { makeEthereumBasedPluginInner } from './ethPlugin'
import type { EthereumSettings } from './ethTypes.js'

const defaultNetworkFees = {
  default: {
    gasLimit: {
      regularTransaction: '21000',
      tokenTransaction: '300000',
      minGasLimit: '21000'
    },
    gasPrice: {
      lowFee: '1000000001',
      standardFeeLow: '40000000001',
      standardFeeHigh: '300000000001',
      standardFeeLowAmount: '100000000000000000',
      standardFeeHighAmount: '10000000000000000000',
      highFee: '40000000001',
      minGasPrice: '1000000000'
    }
  },
  '1983987abc9837fbabc0982347ad828': {
    gasLimit: {
      regularTransaction: '21002',
      tokenTransaction: '37124'
    },
    gasPrice: {
      lowFee: '1000000002',
      standardFeeLow: '40000000002',
      standardFeeHigh: '300000000002',
      standardFeeLowAmount: '200000000000000000',
      standardFeeHighAmount: '20000000000000000000',
      highFee: '40000000002'
    }
  },
  '2983987abc9837fbabc0982347ad828': {
    gasLimit: {
      regularTransaction: '21002',
      tokenTransaction: '37124'
    }
  }
}

const otherSettings: EthereumSettings = {
  rpcServers: [
    'https://eth-mainnet.alchemyapi.io',
    'https://mainnet.infura.io/v3',
    'https://cloudflare-eth.com'
  ],
  etherscanApiServers: [
    'https://api.etherscan.io'
    // 'https://blockscout.com/eth/mainnet' // not reliable enough...
  ],
  blockcypherApiServers: ['https://api.blockcypher.com'],
  blockbookServers: [
    'https://blockbook-ethereum.tronwallet.me',
    'https://eth1.trezor.io/',
    'https://eth2.bcfn.ca/'
  ],
  uriNetworks: ['ethereum', 'ether'],
  ercTokenStandard: 'ERC20',
  chainId: 1,
  hdPathCoinType: 60,
  checkUnconfirmedTransactions: true,
  iosAllowedTokens: {
    REP: true,
    WINGS: true,
    HUR: true,
    IND: true,
    USDT: true,
    AGLD: true
  },
  blockchairApiServers: ['https://api.blockchair.com'],
  alethioApiServers: ['https://api.aleth.io/v1'],
  alethioCurrencies: {
    // object or null
    native: 'ether',
    token: 'token'
  },
  amberdataRpcServers: ['https://rpc.web3api.io'],
  amberdataApiServers: ['https://web3api.io/api/v2'],
  amberDataBlockchainId: '1c9c969065fcd1cf', // ETH mainnet
  pluginMnemonicKeyName: 'ethereumMnemonic',
  pluginRegularKeyName: 'ethereumKey',
  ethGasStationUrl: 'https://www.ethgasstation.info/json/ethgasAPI.json',
  defaultNetworkFees
}

const defaultSettings: any = {
  customFeeSettings: ['gasLimit', 'gasPrice'],
  otherSettings
}

export const currencyInfo: EdgeCurrencyInfo = {
  // Basic currency information:
  currencyCode: 'ETH',
  displayName: 'Ethereum',
  pluginId: 'ethereum',
  walletType: 'wallet:ethereum',

  defaultSettings,

  addressExplorer: 'https://etherscan.io/address/%s',
  transactionExplorer: 'https://etherscan.io/tx/%s',

  denominations: [
    // An array of Objects of the possible denominations for this currency
    {
      name: 'ETH',
      multiplier: '1000000000000000000',
      symbol: 'Ξ'
    },
    {
      name: 'mETH',
      multiplier: '1000000000000000',
      symbol: 'mΞ'
    }
  ],
  symbolImage: `${imageServerUrl}/ethereum-logo-solo-64.png`,
  symbolImageDarkMono: `${imageServerUrl}/ethereum-logo-solo-64.png`,
  metaTokens: [
    // Array of objects describing the supported metatokens
    {
      currencyCode: 'REP',
      currencyName: 'Augur',
      denominations: [
        {
          name: 'REP',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
      symbolImage: `${imageServerUrl}/augur-logo-solo-64.png`
    },
    {
      currencyCode: 'REPV2',
      currencyName: 'Augur v2',
      denominations: [
        {
          name: 'REPV2',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
      symbolImage: `${imageServerUrl}/augur-logo-solo-64.png`
    },
    {
      currencyCode: 'HERC',
      currencyName: 'Hercules',
      denominations: [
        {
          name: 'HERC',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x2e91E3e54C5788e9FdD6A181497FDcEa1De1bcc1',
      symbolImage: `${imageServerUrl}/herc-logo-solo-64.png`
    },
    {
      currencyCode: 'AGLD',
      currencyName: 'Anthem Gold',
      denominations: [
        {
          name: 'AGLD',
          multiplier: '1000000000'
        }
      ],
      contractAddress: '0xd668dab892f1b702a6b9ee01342508b14d4e62c5',
      symbolImage: `${imageServerUrl}/agld-logo-solo-64.png`
    },
    {
      currencyCode: 'DAI',
      currencyName: 'Dai Stablecoin',
      denominations: [
        {
          name: 'DAI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      symbolImage: `${imageServerUrl}/dai-logo-solo-64.png`
    },
    {
      currencyCode: 'SAI',
      currencyName: 'Sai Stablecoin',
      denominations: [
        {
          name: 'SAI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
      symbolImage: `${imageServerUrl}/sai-logo-solo-64.png`
    },
    {
      currencyCode: 'WINGS',
      currencyName: 'Wings',
      denominations: [
        {
          name: 'WINGS',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x667088b212ce3d06a1b553a7221E1fD19000d9aF',
      symbolImage: `${imageServerUrl}/wings-logo-solo-64.png`
    },
    {
      currencyCode: 'USDT',
      currencyName: 'Tether',
      denominations: [
        {
          name: 'USDT',
          multiplier: '1000000'
        }
      ],
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbolImage: `${imageServerUrl}/tether-logo-solo-64.png`
    },
    {
      currencyCode: 'IND',
      currencyName: 'Indorse',
      denominations: [
        {
          name: 'IND',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xf8e386EDa857484f5a12e4B5DAa9984E06E73705',
      symbolImage: `${imageServerUrl}/indorse-logo-solo-64.png`
    },
    {
      currencyCode: 'HUR',
      currencyName: 'Hurify',
      denominations: [
        {
          name: 'HUR',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xCDB7eCFd3403Eef3882c65B761ef9B5054890a47',
      symbolImage: `${imageServerUrl}/hur-logo-solo-64.png`
    },
    {
      currencyCode: 'ANTV1',
      currencyName: 'Aragon',
      denominations: [
        {
          name: 'ANTV1',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x960b236A07cf122663c4303350609A66A7B288C0',
      symbolImage: `${imageServerUrl}/aragon-logo-solo-64.png`
    },
    {
      currencyCode: 'ANT',
      currencyName: 'Aragon',
      denominations: [
        {
          name: 'ANT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xa117000000f279D81A1D3cc75430fAA017FA5A2e',
      symbolImage: `${imageServerUrl}/aragon-v2-logo-solo-64.png`
    },
    {
      currencyCode: 'BAT',
      currencyName: 'Basic Attention Token',
      denominations: [
        {
          name: 'BAT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
      symbolImage: `${imageServerUrl}/basic-attention-token-logo-solo-64.png`
    },
    {
      currencyCode: 'BNT',
      currencyName: 'Bancor',
      denominations: [
        {
          name: 'BNT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
      symbolImage: `${imageServerUrl}/bancor-logo-solo-64.png`
    },
    {
      currencyCode: 'GNT',
      currencyName: 'Golem (old)',
      denominations: [
        {
          name: 'GNT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
      symbolImage: `${imageServerUrl}/golem-logo-solo-64.png`
    },
    {
      currencyCode: 'KNC',
      currencyName: 'Kyber Network',
      denominations: [
        {
          name: 'KNC',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xdd974D5C2e2928deA5F71b9825b8b646686BD200',
      symbolImage: `${imageServerUrl}/kyber-network-logo-solo-64.png`
    },
    {
      currencyCode: 'POLY',
      currencyName: 'Polymath Network',
      denominations: [
        {
          name: 'POLY',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC',
      symbolImage: `${imageServerUrl}/polymath-network-logo-solo-64.png`
    },
    {
      currencyCode: 'STORJ',
      currencyName: 'Storj',
      denominations: [
        {
          name: 'STORJ',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC',
      symbolImage: `${imageServerUrl}/storj-logo-solo-64.png`
    },
    {
      currencyCode: 'USDC',
      currencyName: 'USD Coin',
      denominations: [
        {
          name: 'USDC',
          multiplier: '1000000'
        }
      ],
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbolImage: `${imageServerUrl}/usd-coin-logo-solo-64.png`
    },
    {
      currencyCode: 'USDS',
      currencyName: 'StableUSD',
      denominations: [
        {
          name: 'USDS',
          multiplier: '1000000'
        }
      ],
      contractAddress: '0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe',
      symbolImage: `${imageServerUrl}/stableusd-logo-solo-64.png`
    },
    {
      currencyCode: 'TUSD',
      currencyName: 'TrueUSD',
      denominations: [
        {
          name: 'TUSD',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x0000000000085d4780B73119b644AE5ecd22b376',
      symbolImage: `${imageServerUrl}/trueusd-logo-solo-64.png`
    },
    {
      currencyCode: 'ZRX',
      currencyName: '0x',
      denominations: [
        {
          name: 'ZRX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
      symbolImage: `${imageServerUrl}/0x-logo-solo-64.png`
    },
    {
      currencyCode: 'GNO',
      currencyName: 'Gnosis',
      denominations: [
        {
          name: 'GNO',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
      symbolImage: `${imageServerUrl}/gnosis-logo-solo-64.png`
    },
    {
      currencyCode: 'OMG',
      currencyName: 'OmiseGO',
      denominations: [
        {
          name: 'OMG',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
      symbolImage: `${imageServerUrl}/omisego-logo-solo-64.png`
    },
    {
      currencyCode: 'NMR',
      currencyName: 'Numeraire',
      denominations: [
        {
          name: 'NMR',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671',
      symbolImage: `${imageServerUrl}/numeraire-logo-solo-64.png`
    },
    {
      currencyCode: 'MKR',
      currencyName: 'Maker',
      denominations: [
        {
          name: 'MKR',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      symbolImage: `${imageServerUrl}/maker-logo-solo-64.png`
    },
    {
      currencyCode: 'GUSD',
      currencyName: 'Gemini Dollar',
      denominations: [
        {
          name: 'GUSD',
          multiplier: '100'
        }
      ],
      contractAddress: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
      symbolImage: `${imageServerUrl}/gemini-dollar-logo-solo-64.png`
    },
    {
      currencyCode: 'PAX',
      currencyName: 'Paxos',
      denominations: [
        {
          name: 'PAX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
      symbolImage: `${imageServerUrl}/paxos-logo-solo-64.png`
    },
    {
      currencyCode: 'SALT',
      currencyName: 'SALT',
      denominations: [
        {
          name: 'SALT',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x4156D3342D5c385a87D264F90653733592000581',
      symbolImage: `${imageServerUrl}/salt-logo-solo-64.png`
    },
    {
      currencyCode: 'MANA',
      currencyName: 'Decentraland',
      denominations: [
        {
          name: 'MANA',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
      symbolImage: `${imageServerUrl}/decentraland-logo-solo-64.png`
    },
    {
      currencyCode: 'NEXO',
      currencyName: 'Nexo',
      denominations: [
        {
          name: 'NEXO',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
      symbolImage: `${imageServerUrl}/nexo-logo-solo-64.png`
    },
    {
      currencyCode: 'FUN',
      currencyName: 'FunFair',
      denominations: [
        {
          name: 'FUN',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      symbolImage: `${imageServerUrl}/funfair-logo-solo-64.png`
    },
    {
      currencyCode: 'KIN',
      currencyName: 'Kin',
      denominations: [
        {
          name: 'KIN',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5',
      symbolImage: `${imageServerUrl}/kin-logo-solo-64.png`
    },
    {
      currencyCode: 'LINK',
      currencyName: 'Chainlink',
      denominations: [
        {
          name: 'LINK',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
      symbolImage: `${imageServerUrl}/chainlink-logo-solo-64.png`
    },
    {
      currencyCode: 'BRZ',
      currencyName: 'BRZ Token',
      denominations: [
        {
          name: 'BRZ',
          multiplier: '10000'
        }
      ],
      contractAddress: '0x420412E765BFa6d85aaaC94b4f7b708C89be2e2B',
      symbolImage: `${imageServerUrl}/brz-logo-solo-64.png`
    },
    {
      currencyCode: 'CREP',
      currencyName: 'Compound Augur',
      denominations: [
        {
          name: 'CREP',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x158079ee67fce2f58472a96584a73c7ab9ac95c1',
      symbolImage: `${imageServerUrl}/crep-logo-solo-64.png`
    },
    {
      currencyCode: 'CUSDC',
      currencyName: 'Compound USDC',
      denominations: [
        {
          name: 'CUSDC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x39aa39c021dfbae8fac545936693ac917d5e7563',
      symbolImage: `${imageServerUrl}/cusdc-logo-solo-64.png`
    },
    {
      currencyCode: 'CETH',
      currencyName: 'Compound ETH',
      denominations: [
        {
          name: 'CETH',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
      symbolImage: `${imageServerUrl}/ceth-logo-solo-64.png`
    },
    {
      currencyCode: 'CBAT',
      currencyName: 'Compound BAT',
      denominations: [
        {
          name: 'CBAT',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
      symbolImage: `${imageServerUrl}/cbat-logo-solo-64.png`
    },
    {
      currencyCode: 'CZRX',
      currencyName: 'Compound ZRX',
      denominations: [
        {
          name: 'CZRX',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407',
      symbolImage: `${imageServerUrl}/czrx-logo-solo-64.png`
    },
    {
      currencyCode: 'CWBTC',
      currencyName: 'Compound WBTC',
      denominations: [
        {
          name: 'CWBTC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
      symbolImage: `${imageServerUrl}/cwbtc-logo-solo-64.png`
    },
    {
      currencyCode: 'CSAI',
      currencyName: 'Compound SAI',
      denominations: [
        {
          name: 'CSAI',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0xf5dce57282a584d2746faf1593d3121fcac444dc',
      symbolImage: `${imageServerUrl}/csai-logo-solo-64.png`
    },
    {
      currencyCode: 'CDAI',
      currencyName: 'Compound DAI',
      denominations: [
        {
          name: 'CDAI',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      symbolImage: `${imageServerUrl}/cdai-logo-solo-64.png`
    },
    {
      currencyCode: 'ETHBNT',
      currencyName: 'BNT Smart Token Relay',
      denominations: [
        {
          name: 'ETHBNT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xb1CD6e4153B2a390Cf00A6556b0fC1458C4A5533',
      symbolImage: `${imageServerUrl}/bancor-logo-solo-64.png`
    },
    {
      currencyCode: 'OXT',
      currencyName: 'Orchid',
      denominations: [
        {
          name: 'OXT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb',
      symbolImage: `${imageServerUrl}/orchid-logo-solo-64.png`
    },
    {
      currencyCode: 'COMP',
      currencyName: 'Compound',
      denominations: [
        {
          name: 'COMP',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xc00e94cb662c3520282e6f5717214004a7f26888',
      symbolImage: `${imageServerUrl}/compound-logo-solo-64.png`
    },
    {
      currencyCode: 'MET',
      currencyName: 'Metronome',
      denominations: [
        {
          name: 'MET',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xa3d58c4e56fedcae3a7c43a725aee9a71f0ece4e',
      symbolImage: `${imageServerUrl}/met-logo-solo-64.png`
    },
    {
      currencyCode: 'SNX',
      currencyName: 'Synthetix Network',
      denominations: [
        {
          name: 'SNX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
      symbolImage: `${imageServerUrl}/snx-logo-solo-64.png`
    },
    {
      currencyCode: 'SUSD',
      currencyName: 'Synthetix USD',
      denominations: [
        {
          name: 'SUSD',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
      symbolImage: `${imageServerUrl}/synthusd-logo-solo-64.png`
    },
    {
      currencyCode: 'SBTC',
      currencyName: 'Synthetix BTC',
      denominations: [
        {
          name: 'SBTC',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
      symbolImage: `${imageServerUrl}/synthbtc-logo-solo-64.png`
    },
    {
      currencyCode: 'AAVE',
      currencyName: 'Aave',
      denominations: [
        {
          name: 'AAVE',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      symbolImage: `${imageServerUrl}/aave-logo-solo-64.png`
    },
    {
      currencyCode: 'AYFI',
      currencyName: 'Aave Interest Bearing YFI',
      denominations: [
        {
          name: 'AYFI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x5165d24277cd063f5ac44efd447b27025e888f37',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-yfi-logo-solo-64.png`
    },
    {
      currencyCode: 'ALINK',
      currencyName: 'Aave Interest Bearing LINK',
      denominations: [
        {
          name: 'ALINK',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-link-logo-solo-64.png`
    },
    {
      currencyCode: 'ADAI',
      currencyName: 'Aave Interest Bearing Dai',
      denominations: [
        {
          name: 'ADAI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-dai-logo-solo-64.png`
    },
    {
      currencyCode: 'ABAT',
      currencyName: 'Aave Interest Bearing BAT',
      denominations: [
        {
          name: 'ABAT',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-bat-logo-solo-64.png`
    },
    {
      currencyCode: 'AWETH',
      currencyName: 'Aave Interest Bearing Wrapped ETH',
      denominations: [
        {
          name: 'AWETH',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x030ba81f1c18d280636f32af80b9aad02cf0854e',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-wrapped-eth-logo-solo-64.png`
    },
    {
      currencyCode: 'AWBTC',
      currencyName: 'Aave Interest Bearing Wrapped BTC',
      denominations: [
        {
          name: 'AWBTC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-wrapped-btc-logo-solo-64.png`
    },
    {
      currencyCode: 'ASNX',
      currencyName: 'Aave Interest Bearing SNX',
      denominations: [
        {
          name: 'ASNX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x35f6b052c598d933d69a4eec4d04c73a191fe6c2',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-snx-logo-solo-64.png`
    },
    {
      currencyCode: 'AREN',
      currencyName: 'Aave Interest Bearing REN',
      denominations: [
        {
          name: 'AREN',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-ren-logo-solo-64.png`
    },
    {
      currencyCode: 'AUSDT',
      currencyName: 'Aave Interest Bearing USDT',
      denominations: [
        {
          name: 'AUSDT',
          multiplier: '1000000'
        }
      ],
      contractAddress: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-usdt-logo-solo-64.png`
    },
    {
      currencyCode: 'AMKR',
      currencyName: 'Aave Interest Bearing MKR',
      denominations: [
        {
          name: 'AMKR',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xc713e5e149d5d0715dcd1c156a020976e7e56b88',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-mkr-logo-solo-64.png`
    },
    {
      currencyCode: 'AMANA',
      currencyName: 'Aave Interest Bearing MANA',
      denominations: [
        {
          name: 'AMANA',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xa685a61171bb30d4072b338c80cb7b2c865c873e',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-mana-logo-solo-64.png`
    },
    {
      currencyCode: 'AZRX',
      currencyName: 'Aave Interest Bearing ZRX',
      denominations: [
        {
          name: 'AZRX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-zrx-logo-solo-64.png`
    },
    {
      currencyCode: 'AKNC',
      currencyName: 'Aave Interest Bearing KNC',
      denominations: [
        {
          name: 'AKNC',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x39c6b3e42d6a679d7d776778fe880bc9487c2eda',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-knc-logo-solo-64.png`
    },
    {
      currencyCode: 'AUSDC',
      currencyName: 'Aave Interest Bearing USDC',
      denominations: [
        {
          name: 'AUSDC',
          multiplier: '1000000'
        }
      ],
      contractAddress: '0xbcca60bb61934080951369a648fb03df4f96263c',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-usdc-logo-solo-64.png`
    },
    {
      currencyCode: 'ASUSD',
      currencyName: 'Aave Interest Bearing SUSD',
      denominations: [
        {
          name: 'ASUSD',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x6c5024cd4f8a59110119c56f8933403a539555eb',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-susd-logo-solo-64.png`
    },
    {
      currencyCode: 'AUNI',
      currencyName: 'Aave Interest Bearing UNI',
      denominations: [
        {
          name: 'AUNI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1',
      symbolImage: `${imageServerUrl}/aave-interest-bearing-uni-logo-solo-64.png`
    },
    {
      currencyCode: 'WBTC',
      currencyName: 'Wrapped Bitcoin',
      denominations: [
        {
          name: 'WBTC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      symbolImage: `${imageServerUrl}/wrapped-bitcoin-logo-solo-64.png`
    },
    {
      currencyCode: 'YFI',
      currencyName: 'Yearn Finance',
      denominations: [
        {
          name: 'YFI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      symbolImage: `${imageServerUrl}/yearn-finance-logo-solo-64.png`
    },
    {
      currencyCode: 'CRV',
      currencyName: 'Curve DAO Token',
      denominations: [
        {
          name: 'CRV',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      symbolImage: `${imageServerUrl}/curve-dao-token-logo-solo-64.png`
    },
    {
      currencyCode: 'BAL',
      currencyName: 'Balancer',
      denominations: [
        {
          name: 'BAL',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xba100000625a3754423978a60c9317c58a424e3d',
      symbolImage: `${imageServerUrl}/balancer-logo-solo-64.png`
    },
    {
      currencyCode: 'SUSHI',
      currencyName: 'Sushi Token',
      denominations: [
        {
          name: 'SUSHI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      symbolImage: `${imageServerUrl}/sushi-token-logo-solo-64.png`
    },
    {
      currencyCode: 'UMA',
      currencyName: 'UMA',
      denominations: [
        {
          name: 'UMA',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
      symbolImage: `${imageServerUrl}/uma-logo-solo-64.png`
    },
    {
      currencyCode: 'BADGER',
      currencyName: 'Badger',
      denominations: [
        {
          name: 'BADGER',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x3472A5A71965499acd81997a54BBA8D852C6E53d',
      symbolImage: `${imageServerUrl}/badger-logo-solo-64.png`
    },
    {
      currencyCode: 'IDLE',
      currencyName: 'Idle Finance',
      denominations: [
        {
          name: 'IDLE',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x875773784Af8135eA0ef43b5a374AaD105c5D39e',
      symbolImage: `${imageServerUrl}/idle-finance-logo-solo-64.png`
    },
    {
      currencyCode: 'NXM',
      currencyName: 'Nexus Mutual',
      denominations: [
        {
          name: 'NXM',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b',
      symbolImage: `${imageServerUrl}/nexus-mutual-logo-solo-64.png`
    },
    {
      currencyCode: 'CREAM',
      currencyName: 'Cream',
      denominations: [
        {
          name: 'CREAM',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x2ba592F78dB6436527729929AAf6c908497cB200',
      symbolImage: `${imageServerUrl}/cream-logo-solo-64.png`
    },
    {
      currencyCode: 'PICKLE',
      currencyName: 'PickleToken',
      denominations: [
        {
          name: 'PICKLE',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x429881672B9AE42b8EbA0E26cD9C73711b891Ca5',
      symbolImage: `${imageServerUrl}/pickleToken-logo-solo-64.png`
    },
    {
      currencyCode: 'CVP',
      currencyName: 'Concentrated Voting Power',
      denominations: [
        {
          name: 'CVP',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1',
      symbolImage: `${imageServerUrl}/concentrated-voting-power-logo-solo-64.png`
    },
    {
      currencyCode: 'ROOK',
      currencyName: 'Keeper DAO',
      denominations: [
        {
          name: 'ROOK',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a',
      symbolImage: `${imageServerUrl}/keeper-dao-logo-solo-64.png`
    },
    {
      currencyCode: 'DOUGH',
      currencyName: 'PieDAO',
      denominations: [
        {
          name: 'DOUGH',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xad32a8e6220741182940c5abf610bde99e737b2d',
      symbolImage: `${imageServerUrl}/piedao-logo-solo-64.png`
    },
    {
      currencyCode: 'COMBO',
      currencyName: 'COMBO',
      denominations: [
        {
          name: 'COMBO',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xffffffff2ba8f66d4e51811c5190992176930278',
      symbolImage: `${imageServerUrl}/combo-logo-solo-64.png`
    },
    {
      currencyCode: 'INDEX',
      currencyName: 'INDEX COOP',
      denominations: [
        {
          name: 'INDEX',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x0954906da0Bf32d5479e25f46056d22f08464cab',
      symbolImage: `${imageServerUrl}/index-coop-logo-solo-64.png`
    },
    {
      currencyCode: 'WETH',
      currencyName: 'Wrapped ETH',
      denominations: [
        {
          name: 'WETH',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbolImage: `${imageServerUrl}/wrapped-eth-logo-solo-64.png`
    },
    {
      currencyCode: 'RENBTC',
      currencyName: 'Ren BTC',
      denominations: [
        {
          name: 'RENBTC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      symbolImage: `${imageServerUrl}/ren-btc-logo-solo-64.png`
    },
    {
      currencyCode: 'RENBCH',
      currencyName: 'Ren BCH',
      denominations: [
        {
          name: 'RENBCH',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x459086f2376525bdceba5bdda135e4e9d3fef5bf',
      symbolImage: `${imageServerUrl}/ren-bch-logo-solo-64.png`
    },
    {
      currencyCode: 'RENZEC',
      currencyName: 'Ren ZEC',
      denominations: [
        {
          name: 'RENZEC',
          multiplier: '100000000'
        }
      ],
      contractAddress: '0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2',
      symbolImage: `${imageServerUrl}/ren-zec-logo-solo-64.png`
    },
    {
      currencyCode: 'TBTC',
      currencyName: 'tBTC',
      denominations: [
        {
          name: 'TBTC',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa',
      symbolImage: `${imageServerUrl}/tbtc-logo-solo-64.png`
    },
    {
      currencyCode: 'DPI',
      currencyName: 'DefiPulse Index',
      denominations: [
        {
          name: 'DPI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
      symbolImage: `${imageServerUrl}/defipulse-index-logo-solo-64.png`
    },
    {
      currencyCode: 'YETI',
      currencyName: 'Yearn Ecosystem Token Index',
      denominations: [
        {
          name: 'YETI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xb4bebd34f6daafd808f73de0d10235a92fbb6c3d',
      symbolImage: `${imageServerUrl}/yearn-ecosystem-token-index-logo-solo-64.png`
    },
    {
      currencyCode: 'BAND',
      currencyName: 'BAND',
      denominations: [
        {
          name: 'BAND',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
      symbolImage: `${imageServerUrl}/band-logo-solo-64.png`
    },
    {
      currencyCode: 'REN',
      currencyName: 'Ren',
      denominations: [
        {
          name: 'REN',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x408e41876cccdc0f92210600ef50372656052a38',
      symbolImage: `${imageServerUrl}/republic-logo-solo-64.png`
    },
    {
      currencyCode: 'AMPL',
      currencyName: 'Ampleforth',
      denominations: [
        {
          name: 'AMPL',
          multiplier: '1000000000'
        }
      ],
      contractAddress: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
      symbolImage: `${imageServerUrl}/ampleforth-logo-solo-64.png`
    },
    {
      currencyCode: 'OCEAN',
      currencyName: 'OCEAN',
      denominations: [
        {
          name: 'OCEAN',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48',
      symbolImage: `${imageServerUrl}/ocean-logo-solo-64.png`
    },
    {
      currencyCode: 'GLM',
      currencyName: 'Golem',
      denominations: [
        {
          name: 'GLM',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429',
      symbolImage: `${imageServerUrl}/golem-logo-solo-64.png`
    },
    {
      currencyCode: 'UNI',
      currencyName: 'Uniswap',
      denominations: [
        {
          name: 'UNI',
          multiplier: '1000000000000000000'
        }
      ],
      contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      symbolImage: `${imageServerUrl}/uniswap-logo-solo-64.png`
    }
  ]
}

export const makeEthereumPlugin = (opts: EdgeCorePluginOptions) => {
  return makeEthereumBasedPluginInner(opts, currencyInfo)
}
