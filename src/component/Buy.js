import React, { useState } from "react"
import Navigate from "./Navigate"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Buy(props) {
  const [coinBalance, setCoinBalance] = useState()
  const [excRate, setExcRate] = useState()
  const [coinName, setCoinName] = useState()
  const [output, setOutput] = useState()

  const handleChange = async (e) => {
    const coin = e.target.value
    if (coin === "sigma") {
      setCoinName("Sigma")
  
      setExcRate(10)

      setCoinBalance(props.sigBalance)
    } else if (coin === "gamma") {
      setCoinName("Gamma")
  
      setExcRate(20)

      setCoinBalance(props.gamBalance)
    }
  }

  const handleInput = (e) => {
    const input = e.target.value
    setOutput(input * excRate)
  }

  const buyTokens = async (e) => {
    e.preventDefault()
    let ethAmount = (output / excRate).toString()
    ethAmount = props.web3.utils.toWei(ethAmount, "ether")
    const outputAmt = props.web3.utils.toWei(output.toString(), "ether")
    console.log(props.Sigma._address)
    try {
      if (coinName === "Sigma") {
        await props.Exchange.methods
          .buyToken(props.Sigma._address, outputAmt)
          .send({ from: props.account, value: ethAmount })
      } else if (coinName === "Gamma") {
        await props.Exchange.methods
          .buyToken(props.Gamma._address, outputAmt)
          .send({ from: props.account, value: ethAmount })
      }

      toast.success("Transaction successful", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch {
      toast.error("Transaction failed", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    window.setTimeout(function () {
      window.location.reload()
    }, 3000)
  }


  return (
    <div className="container w-50 p-3">
      <div className style={{ borderRadius: "40px", width: "550px" }}>
        <div
          className="mt-2 mb-4 card"
          style={{
            backgroundColor: "rgb(252, 251, 251)",
            borderRadius: "40px",
          }}
        >
          <div className="row">
            <main className="ml-auto mr-auto col-lg-12" />
          </div>
          <div className="mt-2 mb-2 mr-4" style={{ textAlign: "right" }}>
            <a href="/info">
              <img src="info.png" height="20" alt="Info"></img>
            </a>
          </div>
          <Navigate />
          <div className="card-body">
            <form onSubmit={buyTokens}>
              <div>
                <label
                  className="float-left"
                  style={{ fontSize: "12px", alignSelf: "left" }}
                >
                  <b>Input</b>
                </label>
                <span
                  className="float-right text-muted"
                  style={{ fontsize: "12px" }}
                >
                  <b> Balance: {props.ethBalance}</b>
                </span>
              </div>
              <div className="mb-4 input-group">
                <input
                  type="number"
                  onChange={handleInput}
                  className="form-control"
                  placeholder="0"
                  required
                  style={{ height: "38px", borderRadius: "4px" }}
                />
                <div className="input-group-append">
                  <div
                    className="input-group-text"
                    style={{ height: "38px", borderRadius: "4px" }}
                  >
                    &nbsp;<img alt="logo" src="eth.png" height="32"></img>{" "}
                    &nbsp; ETH
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label
                    className="float-left"
                    style={{ fontSize: "12px", textAlign: "left" }}
                  >
                    <b>Output</b>
                  </label>
                  <span
                    className="float-right text-muted"
                    style={{ fontsize: "12px" }}
                  >
                    <b> Balance: {coinBalance}</b>
                  </span>
                </div>
                <div className="mb-4 input-group">
                  <input
                    id=""
                    type="text"
                    value={output}
                    className="form-control"
                    placeholder="0"
                    disabled="0"
                    style={{ height: "38px", borderRadius: "4px" }}
                  />
                  <div className="input-group-append">
                    <div
                      className="input-group-text"
                      style={{ height: "38px", borderRadius: "1px" }}
                    >
                      <div className=" css-tlfecz-indicatorContainer">
                        <svg height="20" width="20" />
                        <select onChange={handleChange} id="coins">
                          <option value="">select</option>
                          <option value="sigma">Sigma</option>
                          <option value="gamma">Gamma</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <span
                  className="float-left text-muted"
                  style={{ fontsize: "12px" }}
                >
                  Exchange Rate{" "}
                </span>
                <span
                  className="float-right text-muted"
                  style={{ fontsize: "12px" }}
                >
                  <b>
                    1 ETH = {excRate} {coinName} &nbsp;
                  </b>
                </span>
              </div>
              <br></br>
              <div>
                <span
                  className="float-left mb-2 text-muted"
                  style={{ fontsize: "12px" }}
                >
                  Service Charge :&nbsp;<b>0.001&nbsp; ETH</b>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-2 btn btn-primary btn-block "
                  style={{
                    height: "38px",
                    backgroundColor: "rgb(0, 112, 173)",
                    borderRadius: "50px",
                  }}
                >
                  {" "}
                  &nbsp;Buy
                </button>

                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
