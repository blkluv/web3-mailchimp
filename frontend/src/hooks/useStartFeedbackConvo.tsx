import { DecodedMessage } from "@xmtp/react-sdk";
import { useEffect, useState } from "react";
import { useClient } from "@xmtp/react-sdk";

const XMTP_FEEDBACK_ADDRESS = "0x8bcF8AFF8Cb99335CD9f4d9866a40e05E23373ff";

export const useStartFeedbackConvo = () => {
  const { client } = useClient();
  const [conversationId, setConversationId] = useState<any>(null);
  const [recipientWalletAddress, setRecipientWalletAddress] =
    useState<any>(null);
  const [conversations, setConversations] = useState<any>(null);

  useEffect(() => {
    const startFeedbackConvo = async () => {
      if (client) {
        const conversation = await client?.conversations.newConversation(
          XMTP_FEEDBACK_ADDRESS
        );

        setConversationId(conversation);

        setConversations(new Map(conversations));
        setConversationId(XMTP_FEEDBACK_ADDRESS);
        setRecipientWalletAddress(XMTP_FEEDBACK_ADDRESS);
      }
    };
    startFeedbackConvo();
  }, [client, conversations]);
};

export default useStartFeedbackConvo;
