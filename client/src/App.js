import { useState, useEffect } from "react";
import DatingCrowdsale from "./contracts/DatingCrowdsale.json";
import DatingToken from "./contracts/DatingToken.json";
import WhitelistContract from "./contracts/WhitelistContract.json";
import getWeb3 from "./getWeb3";
import React from 'react';
import AddWhiteList from './components/AddWhitelist';
import CheckWhitelists from './components/CheckWhitelists';
import Crowdsale from './components/Crowdsale';
import Web3 from "web3";
import "./App.css";

const BN = Web3.utils.BN;

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [crowdsaleContract, setCrowdsaleContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  const [whitelistContract, setWhitelistContract] = useState(null);
  const [amountOfTokens, setAmountOfTokens] = useState(0);

  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3(web3);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const crowdsaleContract = new web3.eth.Contract(
        DatingCrowdsale.abi,
        DatingCrowdsale.networks[networkId] && DatingCrowdsale.networks[networkId].address,
      );
      setCrowdsaleContract(crowdsaleContract);

      const tokenContractInstance = new web3.eth.Contract(
        DatingToken.abi,
        DatingToken.networks[networkId] && DatingToken.networks[networkId].address,
      );
      setTokenContract(tokenContractInstance);
      setTokenContractAddress(DatingCrowdsale.networks[networkId].address);

      const whitelistContract = new web3.eth.Contract(
        WhitelistContract.abi,
        WhitelistContract.networks[networkId] && WhitelistContract.networks[networkId].address,
      );
      setWhitelistContract(whitelistContract);

      let amountOfTokens = await tokenContractInstance.methods.balanceOf(accounts[0]).call();
      // console.log("amountOfTokens ", (new BN(amountOfTokens)).div((new BN(10)).pow(new BN(18))).toNumber());
      setAmountOfTokens(amountOfTokens / (10 ** 18));

      await tokenContractInstance.events.Transfer({ to: accounts[0] }).on("data", async () => {
        let amountOfTokens = await tokenContractInstance.methods.balanceOf(accounts[0]).call(); 
        setAmountOfTokens(amountOfTokens / (10 ** 18));
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }, []);

  const onAddWhitelist = async ({ inputAddress }) => {
    await whitelistContract.methods.addToWhitelist(inputAddress).send({
      from: accounts[0]
    });
  };

  const checkWhitelisted = async ({ checkAddress }) => {
    return await whitelistContract.methods.isWhitelisted(checkAddress).call({
      from: accounts[0]
    });
  };

  const buyTokens = async ({ amountInEther }) => {
    await crowdsaleContract.methods.buyTokens(accounts[0]).send({from: accounts[0], value: web3.utils.toWei(amountInEther, "ether")});
  };

  return (
    <div className="App">
      <AddWhiteList onAddWhitelist={onAddWhitelist}/>
      <hr />
      <CheckWhitelists checkWhitelisted={checkWhitelisted} />
      <hr />
      <Crowdsale tokenContractAddress={tokenContractAddress} amountOfTokens={amountOfTokens} buyTokens={buyTokens}/>
    </div>
  );
}

export default App;
