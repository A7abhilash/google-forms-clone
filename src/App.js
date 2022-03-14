import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./containers/Navbar";
import Loading from "./containers/Loading";

import FormsApp from "./abis/FormsApp.json";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [account, setAccount] = useState("");

  const [formsApp, setFormsApp] = useState(null);

  useEffect(() => {
    if (!loading) {
      setLoadingMsg("");
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    setLoadingMsg("Loading your data...");
    loadWeb3().then(() => loadBlockchainData().then(() => setLoading(false)));
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    //Load accounts
    const accounts = await web3.eth.getAccounts();
    //Add first account the the state
    const _account = accounts[0];
    setAccount(_account);

    //Get network ID
    const networkId = await web3.eth.net.getId();
    //Get network data
    const networkData = FormsApp.networks[networkId];

    //Check if net data exists, then
    if (networkData) {
      //Assign contract to a variable
      const _formsApp = new web3.eth.Contract(
        FormsApp.abi,
        networkData.address
      );
      setFormsApp(_formsApp);
    } else {
      //If network data doesn't exists, log error
      alert(" Contract is not deployed to detected network!!!");
    }
  }

  if (loading) {
    return <Loading loadingMsg={loadingMsg} />;
  }

  return (
    <>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="text-center">
            <h3>Hello World!!</h3>
            <p>{account}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
