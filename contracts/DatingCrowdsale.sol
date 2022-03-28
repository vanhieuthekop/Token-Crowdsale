// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Crowdsale.sol";
import "./WhitelistContract.sol";

contract DatingCrowdsale is Crowdsale {
  WhitelistContract whitelist;
  uint32 startAt;
  uint32 endAt;

  constructor (
    uint256 rate,
    address payable wallet, 
    IERC20 token,
    WhitelistContract _whitelist,
    uint32 _startAt,
    uint32 _endAt
  ) Crowdsale(rate, wallet, token)
    {
      startAt = _startAt;
      endAt = _endAt;
      // require(startAt >= block.timestamp, "Start time must be greater or equal current times!");
      require(startAt < endAt, "Start time must be smaller than end time!");
      whitelist = _whitelist;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(block.timestamp >= startAt, "Token Sale not started!");
    require(block.timestamp <= endAt, "Token Sale ended!");
    require(whitelist.isWhitelisted(msg.sender), "User isn't whitelisted!");
  }
}