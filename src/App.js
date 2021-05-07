import logo from "./logo.svg";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import Web3 from "../node_modules/web3";

function App() {
  const [count, setCount] = useState("");
  const interval = useRef();

  // const startcount = () => {
  //   () => {
  //     checkblock();
  //   }, 1000)
  // }
  const checkblock = async () => {
    let block = await web3.eth.getBlock("latest");
    console.log("called");
    console.log(block);
    let number = block.number;
    setCount(number);
  };

  function start() {
    const interval = setInterval(() => {
      checkblock();
    }, 1000);
  }

  useEffect(() => {
    start();
    return () => clearInterval(interval.current);
  });

  let amount;
  window.ButtonText = "connect wallet";
  const [value, setValue] = useState("Connect Wallet");
  var web3 = new Web3(
    "https://ropsten.infura.io/v3/3c2694466964424181537275d8bc2d5d"
  );

  const connect = async () => {
    let chainID = await window.ethereum.chainId;
    console.log(chainID);
    if (chainID !== "0x61") {
      alert("change network to BSC Testnet");
    }
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      setValue(accounts[0]);
      console.log(value);
    }
    return false;
  };

  window.ethereum.on("accountsChanged", async function (accounts) {
    window.location.reload(true);
    await connect();

    console.log(accounts);
  });
  async function handleInput(event) {
    amount = event.target.value;
  }

  async function betOne() {
    console.log("e");
    await window.erc20.methods
      .approve(window.supplier._address, Web3.utils.toWei(amount))
      .call();
  }

  return (
    <div className="App">
      <h1>BSC Gamble</h1>
      <>
        <button onClick={connect} value={value}>
          {value}
        </button>
      </>
      <>
        <input
          onChange={function (e) {
            amount = e.target.value;
          }}
        />
        <button
          onClick={async function () {
            let approvetx = await window.erc20.methods
              .approve(window.supplier._address, Web3.utils.toWei(amount))
              .send({ from: window.ethereum.selectedAddress });

            let betTx = await window.supplier.methods
              .betOnOne(Web3.utils.toWei(amount))
              .send({ from: window.ethereum.selectedAddress });
            console.log(approvetx, betTx);
          }}
        >
          BetonOne
        </button>

        <>
          {/* <button
            onclick={async function () {
              let mintTx = await window.erc20.methods.mint(
                window.ethereum.selectedAddress,
                Web3.utils.toWei(50)
              );
            }}
          >
            click for 50 BSCV
          </button> */}
          <button
            onClick={async function () {
              let approvetx = await window.erc20.methods
                .approve(window.supplier._address, Web3.utils.toWei(amount))
                .send({ from: window.ethereum.selectedAddress });

              let betTx = await window.supplier.methods
                .betOnTwo(Web3.utils.toWei(amount))
                .send({ from: window.ethereum.selectedAddress });
              console.log(approvetx, betTx);
            }}
          >
            BetonTwo
          </button>
          <button
            onClick={async function () {
              let approvetx = await window.erc20.methods
                .approve(window.supplier._address, Web3.utils.toWei(amount))
                .send({ from: window.ethereum.selectedAddress });

              let betTx = await window.supplier.methods
                .betOnThree(Web3.utils.toWei(amount))
                .send({ from: window.ethereum.selectedAddress });
              console.log(approvetx, betTx);
            }}
          >
            BetonThree
          </button>
          <button onClick={checkblock}>Checkblock</button>

          <p>count {count}</p>
        </>
      </>
    </div>
  );
}

export default App;
