import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import NavBar from "./NavBar/NavBar";
import StickMan from "../abis/StickMan.json";



function App() {
  const [account, setAccount] = useState();
  const [totalSupply, setTotalSupply] = useState(0);
  const [contract, setContract] = useState();
  const [stickMansDNA, setStickMansDNA] = useState([]);
  const [dnaMark, setDnaMark] = useState({}); //dictionary to keep track of past mints on the front-end
  const [newMint, setNewMint] = useState();

  const validHexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C" ,"D" ,"E","F"];

  async function gatherStickMans() {
    let stick;
    for(let i = 0; i < totalSupply; i++) {
      stick = await contract.methods.StickMans(i).call();
      if(dnaMark[stick._hex]) {
        continue;
      }
      let newDna = dnaMark;
      newDna[stick._hex] = true;
      setDnaMark(newDna => {return newDna});
      setStickMansDNA(stickMansDNA => [...stickMansDNA, stick._hex]);
    }
  }
  useEffect(() => {
    //Web 3 Init
    async function loadWeb3() {
      if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable()
      }
      else {
        window.alert("No ethereum enabled browser detected. This site will not work properly without a program like metamask.")
      }
    }

    async function loadBlockchainData() {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const netId = await web3.eth.net.getId();
      const netData = StickMan.networks[netId];
      if(netData) {
        const abi = StickMan.abi;
        const address = netData.address;
        const myContract = new web3.eth.Contract(abi,address);
        setContract(myContract);
        const curSupply = await myContract.methods.totalSupply().call()
        setTotalSupply(curSupply);
      }
      else {
        window.alert("Smart contract not deployed on this network: " + netId)
      }

    }

    loadWeb3();
    loadBlockchainData();
    gatherStickMans();
  }, [account]);

  useEffect(() => {
    gatherStickMans();
  }, [totalSupply]);

  useEffect(() => {
    console.log("sm", stickMansDNA);
  }, [stickMansDNA]);

  const mint = (newMint) => {
    console.log(account);
    contract.methods.mint(parseInt(newMint)).send({from: account}).once("receipt", (rec) => {
      setStickMansDNA(stickMansDNA => [...stickMansDNA, newMint]);
    });
  }

  const handleMint = (e) => {
    e.preventDefault();
    console.log(newMint);
    if(newMint.length !== 4 || newMint[0] !== "0" || newMint[1] !== "x" || validHexChars.indexOf(newMint[2]) === -1 || validHexChars.indexOf(newMint[3]) === -1 ) { //needs better sanitization 
      window.alert("Error, stickmen dnas must be a 2 digit hexidecimal number. Format: 0x[Number 0 - F][Number 0 - F]");
      return;
    }
    mint(newMint);
  }
  const handleInput = async (e) => {
    await setNewMint(e.target.value);
  }

  return (
      <div className="app">
        <NavBar account={account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto form-buffer">
                <h1>Issue Token</h1>
                <form onSubmit={handleMint}>
                  <input type="text" className="form-control mb-1" placeholder="ex 0x12" onChange={handleInput}/>
                  <input type="submit" className="btn btn-block btn-primary" value="GET YOUR STICKMAN"/>
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
          {stickMansDNA.map((dna,key) => {
              return <div key={key}>
                <img src="https://kol.coldfront.net/thekolwiki/images/0/05/Pastamancer.gif" alt="Your super cool and totally unique stickman!!!"/>
                <p>{dna}</p>
                </div>
          })}
          </div>
        </div>
      </div>
    );

}


export default App;
