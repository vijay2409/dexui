import React from 'react'
import { Link } from 'react-router-dom'
// 
export default function Navigate() {
  return (
    <div>
        <div className="ml-4 mr-4 d-flex justify-content-between">
            <Link
              to="/buy"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;&nbsp;Buy&nbsp;&nbsp;
            </Link>
            <Link
              to="/sell"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;&nbsp;Sell&nbsp;&nbsp;
            </Link>
            <Link
              to="/swap"
              className=" btn btn-outline-primary btn-sm"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "40px" }}
            >
              &nbsp;Swap&nbsp;
            </Link>
          </div>
    </div>
  )
}
