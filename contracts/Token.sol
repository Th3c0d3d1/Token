// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
// allows you to log messages to the console
// for debugging purposes
import "hardhat/console.sol";

contract Token {
    // "public" visibility accesses value from outside the contract
    // state vars are stored on the blockchain
    string public name;
    string public symbol;
    uint public decimals = 18;
    uint public totalSupply;

    constructor(string memory _name, string memory _symbol, uint _totalSupply) {
        // arg passed into state variable when contract is deployed
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
    }
}
