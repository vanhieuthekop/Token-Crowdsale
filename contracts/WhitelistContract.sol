// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistContract is Ownable {
  mapping(address => bool) whitelist;

  function addToWhitelist(address _addr) public onlyOwner {
    require(whitelist[_addr] != true, "User is already added to whitelist!");
    whitelist[_addr] = true;
  }

  function removeFromeWhitelist(address _addr) public onlyOwner {
    whitelist[_addr] = false;
  }

  function isWhitelisted(address _addr) public view returns(bool) {
    return whitelist[_addr];
  }
}