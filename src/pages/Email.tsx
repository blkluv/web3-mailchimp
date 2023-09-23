/*
 gm.xmtp.eth / 0x937C0d4a6294cdfa575de17382c7076b579DC176
Get an immediate response from the XMTP message bot
prxshant.eth / 0x4b70d04124c2996De29e0caa050A49822Faec6Cc
 */
import { Wallet, ethers } from "ethers";
import cron from "node-cron";

import { ConnectWallet } from "@thirdweb-dev/react";
import { FormEvent, useEffect, useState } from "react";
import {
  Client,
  useCanMessage,
  useClient,
  useConversations,
  useStartConversation,
} from "@xmtp/react-sdk";
import { walletGroupsArray } from "../constants";
import { scheduleCronJob, sendEmail, shortenAddress } from "../utils";
import Scheduler from "../components/SelectCronInterval";

//const walletAddress = "0x937C0d4a6294cdfa575de17382c7076b579DC176"; //xmtp tester wallet
//const walletAddress = "0xdC25482eB1094F1F50119F45f799250b0a5622AF"; // tommys wallet
const walletAddress = "0xe7910F0b83ad155737043c771E2594f74B0BB739"; //my own wallet but on Chrome

interface Group {
  group: {
    groupName: string;
    recipientAddresses: string[];
  };
  index: number;
}

export default function Email() {
  const { client, initialize } = useClient();
  const { conversations } = useConversations();
  const { startConversation } = useStartConversation();
  const { canMessage } = useCanMessage();
  const [recipientGroup, setRecipientGroup] = useState<Group | null>(null);
  const [emailText, setEmailText] = useState<string | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const [xmtpClient, setXmtpClient] = useState<any | null>(null);
  const [conversation, setConversation] = useState<any | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(_provider);
      const _xmtpClient = await Client.create(_provider.getSigner(), {
        env: "production",
      });
      setXmtpClient(_xmtpClient);
      console.log("Client Created BÄ", _xmtpClient?.address);
      if (_xmtpClient?.address) {
        const isOnDevNetwork = await _xmtpClient.canMessage(walletAddress);
        console.log("Is on devnetwork?", isOnDevNetwork);
      }
    };
    fetchData();
  }, []);

  const handleEmailText = (text: string) => {
    setEmailText(text);
  };

  const handleSendEmail = async () => {};

  const handleScheduleChange = (interval: string) => {
    setSelectedInterval(interval);
    scheduleCronJob(interval); //
  };

  const renderWalletGroups = () => {
    return walletGroupsArray.map((group, index) => (
      <div
        style={
          recipientGroup?.group.groupName === group.groupName
            ? { backgroundColor: "#9b67a9" }
            : {}
        }
        className="group-list"
      >
        <b>{group.groupName} </b>
        <div onClick={() => setRecipientGroup({ group: group, index })}>
          Addresses:{" "}
          {group.recipientAddresses.map(
            (address) => shortenAddress(address) + ", "
          )}
        </div>
      </div>
    ));
  };
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          Start sending out your web3
          <span className="gradient-text-0">
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              NEWSLETTER
            </a>
          </span>
        </h1>

        <p className="description">
          Get started by typing your newsletter below in the{" "}
          <code className="code">text-box</code>, then send out with the{" "}
          <code className="code">send</code> button!
        </p>
      </div>

      <div className="chat-container flex-direction-row">
        {" "}
        <div className="group-container ">{renderWalletGroups()} </div>
        <textarea
          className="text-area-email flex-direction-row"
          value={emailText ?? ""}
          onChange={(e) => handleEmailText(e.target.value)}
          placeholder="Write your email here..."
        />
        <button onClick={() => handleSendEmail()} className="code btn-bottom">
          SEND
        </button>
        <Scheduler onScheduleChange={handleScheduleChange} />
      </div>

      <div className="grid">
        <a href="/email" className="card">
          <img
            src="/images/portal-preview.png"
            alt="Placeholder preview of starter"
          />
          <div className="card-text">
            <h2 className="gradient-text-1">Email ➜</h2>
            <p>Email</p>
          </div>
        </a>

        <a href="/" className="card">
          <img
            src="/images/dashboard-preview.png"
            alt="Placeholder preview of starter"
          />
          <div className="card-text">
            <h2 className="gradient-text-2">Home</h2>
            <p>Home page</p>
          </div>
        </a>

        <a href="/about" className="card">
          <img
            src="/images/templates-preview.png"
            alt="Placeholder preview of templates"
          />
          <div className="card-text">
            <h2 className="gradient-text-3">About</h2>
            <p>About this application</p>
          </div>
        </a>
      </div>
    </div>
  );
}
