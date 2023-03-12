import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Row } from "reactstrap"
import { useState } from "react"
import Buy from "./component/Buy.js"
import Web3 from "web3"
import Swap from "./component/Swap.js"
import Header from "./component/Header.js"
import Sell from "./component/Sell.js"
import Info from "./component/Info.js"
import Exchange from "./contracts/Exchange.json"
import Gamma from "./contracts/Gamma.json"
import Sigma from "./contracts/Sigma.json"

function App() {
  const [account, setAccount] = useState()
  const [ethBalance, setEthBalance] = useState()
  const [network, setNetwork] = useState()
  const [Gamma_con, setGamma_con] = useState()
  const [Sigma_con, setSigma_con] = useState()
  const [sigBalance, setSigBalance] = useState()
  const [gamBalance, setGamBalance] = useState()


  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545")
  const exc_address = Exchange.networks["5777"].address
  const exc_abi = Exchange.abi
  let Exchange_con

  const gam_abi = Gamma.abi
  const sig_abi = Sigma.abi
  Exchange_con = new web3.eth.Contract(exc_abi, exc_address)
  Exchange_con.methods
    .sigmaToken()
    .call()
    .then((res) => {
      setSigma_con(new web3.eth.Contract(sig_abi, res))
    })
  Exchange_con.methods
    .gammaToken()
    .call()
    .then((res) => {
      setGamma_con(new web3.eth.Contract(gam_abi, res))
    })

  async function load() {
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0])
    await web3.eth.net.getNetworkType().then((network) => {
      setNetwork(network)
    })
    const balance = await web3.eth.getBalance(account)
    setEthBalance(web3.utils.fromWei(balance))
    const Sig_balance = await Sigma_con.methods.balanceOf(account).call();
    
    setSigBalance(web3.utils.fromWei(Sig_balance));

    const Gam_balance = await Gamma_con.methods.balanceOf(account).call();
    
    setGamBalance(web3.utils.fromWei(Gam_balance));
    
  }

  load()

  return (
    <div className="App true">
      <Router>
        <Header account={account} network={network} web3={web3} />
        <div className="container">
          <Row>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <Buy
                    web3={web3}
                    ethBalance={ethBalance}
                    account={account}
                    Exchange={Exchange_con}
                    Gamma={Gamma_con}
                    Sigma={Sigma_con}
                    sigBalance={sigBalance}
                    gamBalance= {gamBalance}
                  />
                }
              ></Route>
              <Route
                path="/buy"
                exact
                element={
                  <Buy
                    web3={web3}
                    ethBalance={ethBalance}
                    account={account}
                    Exchange={Exchange_con}
                    Gamma={Gamma_con}
                    Sigma={Sigma_con}
                    sigBalance={sigBalance}
                    gamBalance= {gamBalance}
                  />
                }
              ></Route>
              <Route
                path="/swap"
                exact
                element={
                  <Swap
                    web3={web3}
                    ethBalance={ethBalance}
                    account={account}
                    Exchange={Exchange_con}
                    Gamma={Gamma_con}
                    Sigma={Sigma_con}
                    sigBalance={sigBalance}
                    gamBalance= {gamBalance}
                  />
                }
              ></Route>
              <Route
                path="/sell"
                exact
                element={
                  <Sell
                    web3={web3}
                    ethBalance={ethBalance}
                    account={account}
                    Exchange={Exchange_con}
                    Gamma={Gamma_con}
                    Sigma={Sigma_con}
                    sigBalance={sigBalance}
                    gamBalance= {gamBalance}
                  />
                }
              ></Route>
              <Route path="/info" exact element={Info}></Route>
            </Routes>
          </Row>
        </div>
      </Router>
    </div>
  )
}

export default App
