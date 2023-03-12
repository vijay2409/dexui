import React from "react"
import "./Dapp.css"
import "bootstrap/dist/css/bootstrap.min.css"

function Header(props) {
  return (
    <div className="container-nav">
      <div>
        <nav className=" navbar navbar text-light">
          <div>
            <a href="/">
              <img alt="logo" src="logo.png"></img>
            </a>
          </div>
          {/* <a
            className="mr-0 navbar-brand col-sm-3 col-md-2 text-light"
            href="/"
          ></a> */}
          Account : {props.account}
        </nav>
      </div>
      <div>
        <nav className=" navbar navbar text-light">
          <a
            className="mr-2 navbar-brand col-sm-3 col-md-2 text-light"
            href="/"
          >
            {" "}
          </a>
          Network : {props.network}
        </nav>
      </div>
    </div>
  )
}

export default Header
