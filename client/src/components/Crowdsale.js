import React from 'react'
import { useState, useEffect } from "react";

function Crowdsale({
  tokenContractAddress, amountOfTokens, buyTokens
}) {
  const [amount, setAmount] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount < 0) {
      alert("Please enter your address!");
      return;
    }

    await buyTokens({ amountInEther: amount });
  }

  return (
    <div>
      <h1>Token Sale</h1>
        <p>If you want to buy tokens, send eth to this address (1Eth = 1 Token): {tokenContractAddress}</p>
        <p>You currently have: { amountOfTokens }</p>
        <h2>Buy more tokens:</h2>
        <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor="">Enter amount: </label>
          <input type="number" name="inputAddress" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <input type="submit" className='btn btn-block' />
      </form>
    </div>
  )
}

export default Crowdsale