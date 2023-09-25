import { ethers } from "ethers";

export const shortenAddress = (address: string): string => {
    return String(address).substr(0, 5) +
        "..." +
        String(address).substr(38, 4)
}


export const getMaticBalances = async () => {
    /*     const contract = new ethers.Contract(tokenContractAddress, ABI, provider);
        //TODO loop thorugh this, we want all the wallet addresses that have more than 15 MATIC and return them
        const balanceInWei = await contract.balanceOf(publicAddress[0]);
        const balanceInToken = balanceInWei.toString();
    
        const balanceObject = {
            balance: balanceInToken,
            tokenSymbol: tokenSymbol,
            tokenContractAddress: tokenContractAddress,
        }; */
}