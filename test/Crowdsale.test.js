const DatingCrowdsale = artifacts.require("./DatingCrowdsale.sol");
const DatingToken = artifacts.require("./DatingToken.sol");
const WhitelistContract = artifacts.require("./WhitelistContract.sol");
const BN = web3.utils.BN;
const moment = require("moment");
const chai = require("./ChaiSetup.js");
const expect = chai.expect;

contract("Dating Crowdsale", accounts => {
  const onwerAddress = accounts[0];
  beforeEach(async () => {
    this.tokenInstance = await DatingToken.deployed();
    this.whitelistInstance = await WhitelistContract.deployed();
    this.datingCrowdsaleInstance = await DatingCrowdsale.deployed();
  });

  it("It is possible to buy tokens for address in whitelist", async () => {
    const buyAmount = "100";
    let balanceBefore = await this.tokenInstance.balanceOf(onwerAddress);
    
    await this.whitelistInstance.addToWhitelist(onwerAddress);

    await this.datingCrowdsaleInstance.sendTransaction({
      from: onwerAddress,
      value: web3.utils.toWei(buyAmount, "wei")
    });

    return expect(this.tokenInstance.balanceOf(onwerAddress)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(buyAmount)));
  });

  it("It isn't possible to buy tokens for address not in whitelist", async () => {
    const buyer = accounts[1];
    const buyAmount = "100";
    let balanceBefore = await this.tokenInstance.balanceOf(buyer);
    
    await this.datingCrowdsaleInstance.sendTransaction({
      from: buyer,
      value: web3.utils.toWei(buyAmount, "wei")
    });

    return expect(this.tokenInstance.balanceOf(buyer)).to.eventually.be.a.bignumber.not.equal(balanceBefore.add(new BN(buyAmount)));
  });

  it("It isn't possible to buy tokens before crowdsale started", async () => {
    const datingCrowdsaleInstance = await DatingCrowdsale.new(
      1, accounts[0], 
      DatingToken.address, 
      WhitelistContract.address,
      moment().add(5, "minutes").unix(), 
      moment().add(1,"days").unix()
    );
    await this.tokenInstance.transfer(this.datingCrowdsaleInstance.address, (new BN(10000000)).mul((new BN(10)).pow(new BN(18))));

    const buyer = accounts[4];
    const buyAmount = "100";
    
    await datingCrowdsaleInstance.sendTransaction({
      from: buyer,
      value: web3.utils.toWei(buyAmount, "wei")
    });

    return expect(this.tokenInstance.balanceOf(buyer)).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("It isn't possible to buy tokens after crowdsale ended", async () => {
    const datingCrowdsaleInstance = await DatingCrowdsale.new(
      1, accounts[0], 
      DatingToken.address, 
      WhitelistContract.address,
      moment().subtract(2, "days").unix(), 
      moment().subtract(1, "days").unix()
    );
    await this.tokenInstance.transfer(this.datingCrowdsaleInstance.address, (new BN(10000000)).mul((new BN(10)).pow(new BN(18))));

    const buyer = accounts[4];
    const buyAmount = "100";
    
    const response = await datingCrowdsaleInstance.sendTransaction({
      from: buyer,
      value: web3.utils.toWei(buyAmount, "wei")
    });

    return expect(this.tokenInstance.balanceOf(buyer)).to.eventually.be.a.bignumber.equal(new BN(0));
  });

});