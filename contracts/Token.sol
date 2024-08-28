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

    // Track balances for each address
    // mapping is a key-value store
    // key is an address, value is account balance
    // balanceOf is a state variable
    // database stored on the blockchain
    mapping(address => uint256) public balanceOf;
    // Send tokens from one address to another

    constructor(string memory _name, string memory _symbol, uint _totalSupply) {
        // arg (local variables) passed into state variable when contract is deployed
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);

        // msg.sender is the address that deployed the contract
        // msg is a global variable
        // [msg.sender] read & write to balanceOf mapping
        balanceOf[msg.sender] = totalSupply;
    }
}
