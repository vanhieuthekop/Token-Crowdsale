import React from 'react'
import { useState } from "react";

function AddWhitelist({ onAddWhitelist }) {
  const [inputAddress, setInputAddress] = useState("");
  const [kycCompleted, setKycCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputAddress) {
      alert("Please enter your address!");
      return;
    }

    await onAddWhitelist({ inputAddress });

    setKycCompleted(true);
    setInputAddress("");
  }

  return (
    <div>
      <h2>Kyc Whitelisting</h2>
      <form className='add-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor="">Input your address: </label>
          <input type="text" name="inputAddress" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)}/>
        </div>
        <input type="submit" className='btn btn-block' />
        {kycCompleted && <p style={{color:"green"}}>Kyc Completed!</p>}
      </form>
    </div>
    
  )
}

export default AddWhitelist