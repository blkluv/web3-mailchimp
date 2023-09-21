/*
 gm.xmtp.eth / 0x937C0d4a6294cdfa575de17382c7076b579DC176
Get an immediate response from the XMTP message bot
prxshant.eth / 0x4b70d04124c2996De29e0caa050A49822Faec6Cc
 */
import { Wallet } from "ethers";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useClient } from "@xmtp/react-sdk";
import { walletGroupsArray } from "../constants";

interface Group {
  group: {
    groupName: string;
    recipientAddresses: string[];
  };
  index: number;
}

export default function Email() {
  const { client } = useClient();
  const [recipientGroup, setRecipientGroup] = useState<Group | null>(null);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  console.log(recipientGroup, "SELECTED RECIP group");
  const renderWalletGroups = () => {
    return walletGroupsArray.map((group, index) => (
      <div
        style={
          recipientGroup?.group.groupName === group.groupName
            ? { backgroundColor: "white" }
            : {}
        }
        className="group-list"
      >
        Title: {group.groupName}{" "}
        <div onClick={() => setRecipientGroup({ group: group, index })}>
          Addresses: {group.recipientAddresses.map((address) => address)}
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

      <div className="chat-container">
        {" "}
        <div className="group-container">
          Wallet groups go here {renderWalletGroups()}{" "}
        </div>
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
