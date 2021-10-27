require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const isLocalEnv = process.env.ALCHEMY_KEY && process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.7",
  // Only add networks for deploying locally
  ...(isLocalEnv && {
    networks: {
      rinkeby: {
        url: process.env.ALCHEMY_KEY,
        accounts: [process.env.PRIVATE_KEY],
      },
    },
  }),
};
