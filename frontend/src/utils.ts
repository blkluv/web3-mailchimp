import { ethers } from "ethers";
import { genericERC20Abi, maticTokenContractAddressOnEthereum } from "./constants";

export const shortenAddress = (address: string): string => {
    return String(address).substr(0, 4) +
        "..." +
        String(address).substr(38, 4)
}


export const getUSDTBalance = async (walletAddresses: string[]) => {
    const chain = 'eth';
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT token address
    const headers = {
        accept: 'application/json',
        'X-API-Key': process.env.REACT_APP_MORALIS_KEY,
    } as HeadersInit;

    const balances: Record<string, number> = {};
    const balancesArray = [];

    try {
        for (const walletAddress of walletAddresses) {
            const apiUrl = `https://deep-index.moralis.io/api/v2.2/${walletAddress}/erc20?chain=${chain}&token_addresses%5B0%5D=${maticTokenContractAddressOnEthereum}`;
            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.length) {
                const balance = Number(data[0].balance);
                if (balance > 0) {
                    // Add the wallet address and balance to the result if it has a positive balance
                    balances[walletAddress] = balance;
                }
            }

        }

        return balances;
    } catch (error) {
        console.error('Error:', error);
        return {};
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