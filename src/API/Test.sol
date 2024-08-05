// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract inbox {
    string public message;
    function Inbox (string memory initialMessage) public{
    message = initialMessage;
    }
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    function getMessage() public view returns (string memory){
        return message;
    }
}