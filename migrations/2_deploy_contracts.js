const DatingToken = artifacts.require("./DatingToken.sol");
const DatingCrowdsale = artifacts.require("./DatingCrowdsale.sol");
const WhitelistContract = artifacts.require("./WhitelistContract.sol");
const { initialTokens } = require("../config");
const BN = web3.utils.BN;
const moment = require("moment");

module.exports = async function(deployer) {
  let addresses = await web3.eth.getAccounts();
  
  try {
    await deployer.deploy(DatingToken, initialTokens, [addresses[0], addresses[1]]);
    console.log("Deploy Dating Token successfully!");

    await deployer.deploy(WhitelistContract);
    console.log("Deploy Whitelist Contract successfully!");

    await deployer.deploy(
      DatingCrowdsale,
      1, 
      addresses[0], 
      DatingToken.address, 
      WhitelistContract.address, 
      moment().unix(), 
      moment().add(1,"days").unix()
    );
    console.log("Deploy Crowdsale Contract successfully!");

    let instance = await DatingToken.deployed();
    // const amount = (new BN(10)).mul((new BN(10)).pow(new BN(18)));
    // await instance.transfer(DatingCrowdsale.address, amount);
  } catch (error) {
    console.log("Deploy error: ", error);
  }
};
