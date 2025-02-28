// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStaking {
    mapping(address => uint256) public balances;

    event Staked(address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint256 amount);

    // Stake function: User sends ETH and it gets recorded
    function stake() external payable {
        require(msg.value > 0, "Must stake more than 0");
        balances[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }


    // UnstakeAll function: Withdraw the entire staked balance
    function unstakeAll() external {
        uint256 stakedAmount = balances[msg.sender];
        require(stakedAmount > 0, "No staked balance to unstake");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(stakedAmount);
        emit Unstaked(msg.sender, stakedAmount);
    }
}


