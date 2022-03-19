import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./containers/Navbar";
import Loading from "./containers/Loading";

import FormsApp from "./abis/FormsApp.json";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "./components/create-form/CreateForm";

const FormsContext = React.createContext();

export const useForms = () => useContext(FormsContext);

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [account, setAccount] = useState("");

  const [formsAppContract, setFormsAppContract] = useState(null);

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
      const _formsAppContract = new web3.eth.Contract(
        FormsApp.abi,
        networkData.address
      );
      // console.log(_formsAppContract);
      setFormsAppContract(_formsAppContract);

      let res = await _formsAppContract.methods.formsCount().call();
      console.log(res);
    } else {
      //If network data doesn't exists, log error
      alert(" Contract is not deployed to detected network!!!");
    }
  }

  function getErrorMessage(error) {
    let message = error.message;
    if (!message.includes("revert")) {
      return message;
    }
    let revertIndex = message.indexOf(`"message\\": \\"`);
    // console.log(revertIndex);
    let slicedMessage = message.slice(revertIndex);
    // console.log(slicedMessage);
    let nearestEnd = slicedMessage.indexOf('\\"');
    let requiredMessage = slicedMessage.slice(0, nearestEnd);
    return requiredMessage.replace(`"message\\": \\"`, "");
  }

  if (loading) {
    return <Loading loadingMsg={loadingMsg} />;
  }

  return (
    <>
      <Navbar account={account} />
      <div className="container mt-5">
        <FormsContext.Provider
          value={{ formsAppContract, address: account, getErrorMessage }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="create-form" element={<CreateForm />} />
              {/* /forms/edit/1 */}
              {/* /forms/view/1 */}
            </Routes>
          </BrowserRouter>
        </FormsContext.Provider>
      </div>
    </>
  );
}

export default App;
