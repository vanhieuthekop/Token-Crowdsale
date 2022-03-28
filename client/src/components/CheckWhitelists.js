import React from 'react'
import { useState } from "react";

function CheckWhitelists({ checkWhitelisted }) {
  const [checkAddress, setCheckAddress] = useState("");
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    const isWhitelisted = await checkWhitelisted({ checkAddress });
    setIsWhitelisted(isWhitelisted);

    if (isWhitelisted) {
      setResult(React.createElement('p', {}, 'Address is whitelisted!'));
    } else {
      setResult(React.createElement('p', {}, "Address isn't whitelisted"));
    }
  };

  return (
   <div>
      <form className='add-form'  onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor="">Input check address:</label>
          <input type="text" name="checkAddress" value={checkAddress} onChange={(e) => setCheckAddress(e.target.value)}/>
          {result}
        </div>
        <input type="submit" className='btn btn-block' />
      </form>
   </div>
  )
}

export default CheckWhitelists