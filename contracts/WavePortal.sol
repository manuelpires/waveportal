// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract WavePortal {
    uint256 public wavesCount;

    event NewWave(address indexed from, string message, uint256 timestamp);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] private waves;

    function wave(string memory _message) public {
        wavesCount += 1;
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, _message, block.timestamp);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
