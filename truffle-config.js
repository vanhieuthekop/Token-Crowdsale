const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

const { networks } = require("./config");
const { ganache, ropsten_infura } = networks;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ganache: {
      provider: function() {
        return new HDWalletProvider(ganache.mnemonic, ganache.host, AccountIndex);
      },
      network_id: ganache.networkId
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(ropsten_infura.mnemonic, ropsten_infura.host, AccountIndex);
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "0.8.1"
    }
  }
};
