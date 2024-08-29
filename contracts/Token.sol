// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// allows you to log messages to the console
// for debugging purposes
import "hardhat/console.sol";

contract Token {
    // "public" visibility accesses value from outside the contract
    // state variables are stored on the blockchain
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
    // Send tokens from one address to another3

    // Indexed keyword allows you to filter events
    // Arguments are indexed in the event log
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 value
        );

    constructor(
        string memory _name, 
        string memory _symbol, 
        uint _totalSupply
        ){
        // arg (local variables) passed into state variable @ deployment
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);

        // msg.sender is the address that deployed the contract
        // msg is a global variable
        // [msg.sender] read & write to balanceOf mapping
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        // Require that the sender has enough tokens
        // Throw an error if the condition is not met
        require(balanceOf[msg.sender] >= _value, 'Not enough tokens');
        require(_to != address(0));

        // Deduct tokens from sender
        balanceOf[msg.sender] -= _value;

        // Credit the recipient
        balanceOf[_to] += _value;

        // Emit the event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
