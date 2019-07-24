import React from "react";
import ReactDOM from "react-dom";

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
    this.currentPage = props.currentPage;
  }

  render() {
    const isCheckout = this.currentPage.match(/^\/checkout/);

    if (this.currentPage.match(/^\/checkout/)) {
      productList = <CheckoutPoductList />;
    }
    else {
      productList = null;
    }
    return (
      {productList}
    )
  }

};


ReactDOM.render(
  <Checkout currentPage={window.location.pathname} />,
  document.getElementById('content-container')
);
