import { ethers } from "ethers";
import IdentityABI from "./IdentityABI.json"; // You'll get this from Hardhat artifacts

const contractAddress = "0xf7Fbb5Cb43C34ED2c4bF46424AaBF528Eb1B612C"; // Replace with your deployed contract address

const getBlockchain = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask to use this app.");
        return null;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const identityContract = new ethers.Contract(contractAddress, IdentityABI, signer);

    return { identityContract };
};

export default getBlockchain;
