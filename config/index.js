require("dotenv").config();

module.exports = {
  initialTokens: process.env.INITIAL_TOKENS || 100000000000000000000,
  networks : {
    ganache : {
      mnemonic : process.env.MNEMONIC,
      host: process.env.GANACHE_HOST,
      networkId: Number(process.env.GANACHE_NETWORK_ID) || 5777
    },
    ropsten_infura : {
      mnemonic : process.env.MNEMONIC,
      host: process.env.ROPSTEN_INFURA_HOST,
      networkId: 3
    }
  }
}