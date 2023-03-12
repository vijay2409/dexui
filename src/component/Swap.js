import React, { useState } from "react"
import Navigate from "./Navigate"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Swap(props) {
  const [coinBalance, setCoinBalance] = useState()
  const [excRate, setExcRate] = useState()
  const [coinName, setCoinName] = useState()
  const [output, setOutput] = useState()

  const [coinBalance2, setCoinBalance2] = useState()
  const [excRate2, setExcRate2] = useState()
  const [coinName2, setCoinName2] = useState()

  const handleChange = async (e) => {
    const coin = e.target.value
    if (coin === "sigma") {
      setCoinName("Sigma")
      setExcRate(10)

      const balance = await props.Sigma.methods.balanceOf(props.account).call()
      
      setCoinBalance(props.web3.utils.fromWei(balance, "ether"))
    } else if (coin === "gamma") {
      setCoinName("Gamma")
      setExcRate(20)

      const balance = await props.Gamma.methods.balanceOf(props.account).call()
    
      setCoinBalance(props.web3.utils.fromWei(balance, "ether"))
    }
  }

  const handleInput = (e) => {
   const input = e.target.value;
   setOutput(input * (excRate2 / excRate))
  }

  const handleChange2 = async (e) => {
    const coin = e.target.value
    if (coin === "sigma") {
      setCoinName2("Sigma")

      setExcRate2(10)

      const balance = await props.Sigma.methods.balanceOf(props.account).call()

     

      setCoinBalance2(props.web3.utils.fromWei(balance, "ether"))
    } else if (coin === "gamma") {
      setCoinName2("Gamma")

      setExcRate2(20)

      const balance = await props.Gamma.methods.balanceOf(props.account).call()
      setCoinBalance2(props.web3.utils.fromWei(balance, "ether"))
    }
  }

  const swapTokens = async (e) => {
    e.preventDefault()
    let tokenAmount = (output * (excRate / excRate2)).toString()
    tokenAmount = props.web3.utils.toWei(tokenAmount, "ether")
    let token2Amount = props.web3.utils.toWei(output.toString(), "ether")

    try {
      if (coinName === "Sigma" && coinName2 === "Gamma") {
        await props.Sigma.methods
          .approve(props.Exchange.options.address, tokenAmount)
          .send({ from: props.account })

        await props.Exchange.methods
          .swapToken(props.Sigma._address,props.Gamma._address,tokenAmount,token2Amount)
          .send({ from: props.account })
      } else if (coinName === "Gamma" && coinName2 === "Sigma") {
        await props.Gamma.methods
          .approve(props.Exchange.options.address, tokenAmount)
          .send({ from: props.account })

        await props.Exchange.methods
          .swapToken(props.Gamma._address,props.Sigma._address,tokenAmount,token2Amount)
          .send({ from: props.account })
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
            <main
              className="ml-auto mr-auto col-lg-12"
              style={{ maxWidth: "500px" }}
            />
          </div>
          <div className="mt-2 mb-2 mr-4" style={{ textAlign: "right" }}>
            <a href="/info">
              <img src="info.png" height="20" alt="info"></img>
            </a>
          </div>
          <Navigate />
          <div className="card-body">
            <form onSubmit={swapTokens}>
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
                  <b>
                    Balance: {coinBalance} {coinName}
                  </b>
                </span>
              </div>
              <div className="mb-4 input-group">
                <input
                  type="number"
                  onChange={handleInput}
                  className="form-control "
                  placeholder="0"
                  required
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
                    <b>
                      {" "}
                      Balance: {coinBalance2} {coinName2}
                    </b>
                  </span>
                </div>
                <div className="mb-4 input-group">
                  <input
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
                        <select onChange={handleChange2} id="coins">
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
                    {" "}
                    1 {coinName} = {excRate2 / excRate} {coinName2} &nbsp;
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
                  &nbsp;Swap
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
