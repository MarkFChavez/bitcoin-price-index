import React from 'react'

const Header = props => (
  <header>
    <div>
      <span className="header"> {props.title} </span>
    </div>

    <div className="subheader-body">
      <span className="subheader"> Powered by <a className="link" target="_blank" href="https://www.coindesk.com/price/">CoinDesk</a>. </span>
    </div>
  </header>
)

export default Header
