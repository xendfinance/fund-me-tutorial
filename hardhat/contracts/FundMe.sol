//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


/**

 * @author ASSETCHAIN DEVREL TEAM
   @author James Harrison(https://github.com/KodeSage/)
   @author  Okorie Ebube(https://github.com/theiceeman)
 */

contract FundMe {
    address public owner;
    uint256 public totalDonations;
    address[] donators;
    
    mapping(address => uint256) public donations;

    event DonationReceived(address donor, uint256 amount);
    event FundsWithdrawn(address owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount should be greater than zero");

        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        donators.push(msg.sender);

        emit DonationReceived(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        payable(owner).transfer(amount);
        emit FundsWithdrawn(owner, amount);
    }

    function getDonationDetails(address _donor) external view returns (uint256) {
        return donations[_donor];
    }
}
