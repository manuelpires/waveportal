// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract WavePortal {
    Wave[] public waves;
    uint256 public wavesCount;

    event NewWave(address indexed from, string message, uint256 timestamp);

    struct Wave {
        address from;
        string message;
        uint256 timestamp;
    }

    function wave(string memory _message) public {
        wavesCount += 1;
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, _message, block.timestamp);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
