const DatingToken = artifacts.require("./DatingToken.sol");
const BN = web3.utils.BN;
const { initialTokens } = require("../config");

contract("DatingToken", accounts => {
  const onwerAddress = accounts[0];
  const bigDecimals = (new BN(10)).pow(new BN(18));
  beforeEach(async () => {
     this.token = await DatingToken.new(initialTokens, [accounts[0], accounts[1]]);
    // this.token = await DatingToken.deployed();
  });

  it("Onwer should have 100 million tokens", async () => {
    let correctBalance = (new BN(100000000)).mul(bigDecimals);
    const balanceOfOnwer = await this.token.balanceOf(onwerAddress);
    
    const isEqual = correctBalance.eq(balanceOfOnwer);
    assert.equal(isEqual, true, "The creator address of contract doen't have enough 100 million tokens.");
  });

  it("Total supply is 200 million tokens", async () => {
    let correctSupply = (new BN(200000000)).mul(bigDecimals);

    const totalSupply = await this.token.totalSupply();
    const isEqual = totalSupply.eq(correctSupply); 
    assert.equal(isEqual, true, "Total supply isn't 200 million tokens.");
  })

  it("It is possible to mint new tokens", async () => {
    let mintAmount = (new BN(10000000)).mul(bigDecimals);
    await this.token.mint(accounts[2], mintAmount, { from: onwerAddress });

    const balance = await this.token.balanceOf(accounts[2]);

    const isEqual = mintAmount.eq(balance);
    assert.equal(isEqual, true, "The balance after burning isn't 90 million tokens.");
  });

  it("It is possible to burn tokens", async () => {
    let burnAmount = (new BN(10000000)).mul(bigDecimals);
    await this.token.burn(burnAmount, { from: onwerAddress });

    const balanceOfOnwer = await this.token.balanceOf(onwerAddress);

    let remainAmount = (new BN(90000000)).mul(bigDecimals);
    const isEqual = remainAmount.eq(balanceOfOnwer);

    assert.equal(isEqual, true, "The balance after burning isn't 90 million tokens.");
  });

  it("It is possible to transfer tokens", async () => {
    let transferAmount = (new BN(10000000)).mul(bigDecimals);
    await this.token.transfer(accounts[3], transferAmount, { from: onwerAddress });

    const balance = await this.token.balanceOf(accounts[3]);

    const isEqual = transferAmount.eq(balance);
    assert.equal(isEqual, true, "The balance after transfering isn't 10 million tokens.");
  });

  
});
