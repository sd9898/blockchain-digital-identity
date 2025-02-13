require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // ✅ Load environment variables

module.exports = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // ✅ Fetch from .env
      accounts: [process.env.PRIVATE_KEY], // ✅ Fetch private key from .env
    },
  },
};
