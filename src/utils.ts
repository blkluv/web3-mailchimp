import { ethers } from "ethers";
import { genericERC20Abi, maticTokenContractAddressOnEthereum } from "./constants";

export const shortenAddress = (address: string): string => {
    return String(address).substr(0, 4) +
        "..." +
        String(address).substr(38, 4)
}


export const getMaticBalances = async (walletArray: string[], provider: ethers.providers.JsonRpcProvider) => {
    try {
        const balances = await Promise.all(
            walletArray.map(async (address) => {
                try {
                    const contract = new ethers.Contract(maticTokenContractAddressOnEthereum, genericERC20Abi, provider);

                    const balanceInWei = await contract.balanceOf("0xe7910F0b83ad155737043c771E2594f74B0BB739");

                    if (balanceInWei == null) {
                        // Handle null or undefined values
                        return null;
                    }

                    const balanceInToken = ethers.utils.formatUnits(balanceInWei, 18); // Assuming MATIC has 18 decimal places

                    return {
                        address,
                        balance: parseFloat(balanceInToken),
                    };
                } catch (error) {
                    console.error(`Error fetching balance for address ${address}:`, error);
                    return null; // Handle the error gracefully and return null for this address
                }
            })
        );

        // Filter out null values and wallets with positive and non-zero balances
        const filteredBalances = balances.filter((balance) => balance !== null && balance.balance > 0);

        return filteredBalances;
    } catch (error) {
        console.error("Error in getMaticBalances:", error);
        return []; // Return an empty array or handle the error as needed
    }
};








export const sendEmail = async (xmtpClient: any, walletAddress: string, emailText: string | null) => {
    try {
        if (emailText && walletAddress) {
            const addressIsOnXmtp = await xmtpClient.canMessage(walletAddress);
            console.log(addressIsOnXmtp, "Can you message this walletaddress? XMTP");
            if (addressIsOnXmtp) {
                const _conversation = await xmtpClient.conversations.newConversation(
                    walletAddress
                );
                console.log(
                    "Conversation started recipient: XMTP",
                    _conversation.peerAddress
                );
                //setConversation(_conversation);
                const message = await _conversation.send(emailText);
                console.log("Sent message XMTP", message);
            }
        }

    } catch (e) {
        console.log(e, "xmtp error");
    }
}