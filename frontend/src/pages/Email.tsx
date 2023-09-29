/*
 gm.xmtp.eth / 0x937C0d4a6294cdfa575de17382c7076b579DC176
Get an immediate response from the XMTP message bot
prxshant.eth / 0x4b70d04124c2996De29e0caa050A49822Faec6Cc
 */

import { useEffect, useState } from "react";

import { walletGroupsArray } from "../constants";
import { sendEmail, shortenAddress } from "../utils";
import { useInterval } from "../hooks/useInterval";
import { CustomModal } from "../components/CustomModal";
import { Client } from "@xmtp/react-sdk";
import { ethers } from "ethers";
import Sidebar from "../components/SidebarSelection";

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
  const [recipientGroup, setRecipientGroup] = useState<Group | null>(null);
  const [emailText, setEmailText] = useState<string | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const [xmtpClient, setXmtpClient] = useState<any | null>(null);
  const [conversation, setConversation] = useState<any | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [interval, setInterval] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [scheduleSelected, setScheduleSelected] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!xmtpClient) {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        const _xmtpClient = await Client.create(_provider.getSigner(), {
          env: "production",
        });
        setXmtpClient(_xmtpClient);
      }
    };
    fetchData();
  }, [interval]);

  //Fetch on mounting component
  useEffect(() => {
    //fetchApiData();
  }, []);

  const handleEmailText = (text: string) => {
    setEmailText(text);
  };

  const handleSendEmail = async () => {
    if (emailText && scheduleSelected) {
      //setShowModal(true);
      try {
        const url = "http://localhost:5000/v1/schedule";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: xmtpClient, // Convert the data object to JSON string
        });
        console.log(response, "wats response??");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      setErrorMsg("You have to write an email!");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  console.log(xmtpClient, "xmtpclkent");
  /*   useInterval(
    () => {
      sendEmail(xmtpClient, walletAddress, emailText);
      //fetchApiData();
      setCount(count + 1);
    },
    isRunning ? interval : null
  ); */

  console.log(scheduleSelected, "schedule selected??");
  const renderWalletGroups = () => {
    return walletGroupsArray.map((group, index) => (
      <div
        key={index}
        onClick={() => setRecipientGroup({ group: group, index })}
        style={
          recipientGroup?.group.groupName === group.groupName
            ? { backgroundColor: "grey" }
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
          <code className="code">text-box</code> then send out with the{" "}
          <code className="code">send</code> button!
        </p>
      </div>

      <div className="chat-container flex-direction-row">
        {" "}
        <div className="group-container ">{renderWalletGroups()} </div>
        <textarea
          className="form-control text-area-email flex-direction-row"
          value={emailText ?? ""}
          onChange={(e) => handleEmailText(e.target.value)}
          placeholder="Write your email here..."
        />
        <button
          onClick={() => handleSendEmail()}
          className="btn-bottom btn btn-secondary"
        >
          <b>SEND</b>
        </button>
        {errorMsg && <p className="error-bottom">{errorMsg}</p>}
        <Sidebar
          setScheduleSelected={setScheduleSelected}
          scheduleSelected={scheduleSelected}
        />
      </div>

      <CustomModal
        emailText={emailText}
        show={showModal}
        setInterval={setInterval}
        interval={interval}
        setShow={setShowModal}
        count={count}
        provider={provider}
        recipientGroup={recipientGroup}
        xmtpClient={xmtpClient}
      />
    </div>
  );
}
