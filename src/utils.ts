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

export const sendEmail = async (xmtpClient: any, walletAddress: string, emailText: string | null) => {
    console.log('Inside sendEmail()')
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