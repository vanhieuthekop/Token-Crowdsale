// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DatingToken is ERC20, Ownable {

  constructor(uint256 inititalSupply, address[] memory listAddress) 
    ERC20("Love Hiring", "LVH") Ownable() {
    for (uint i = 0; i < listAddress.length; i++) {
      _mint(listAddress[i], inititalSupply);
    }
  }

  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }

  function burn(uint256 amount) external {
    _burn(msg.sender, amount);
  }
  
}
