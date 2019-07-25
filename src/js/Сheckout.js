import React from "react";
import ReactDOM from "react-dom";

var currentLocation = window.location.pathname;

function CheckoutPoductList(props) {
  return (
    <div>
      <p>Test</p>
    </div>
  );
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CheckoutPoductList/>
    )
  }

};

if (currentLocation.match(/^\/checkout/)) {
  ReactDOM.render(
    <Checkout/>,
    document.getElementById('content-container')
  );
}
