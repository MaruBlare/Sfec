import React from "react";
import ReactDOM from "react-dom";
import products from '../data/cart.json';

var currentLocation = window.location.pathname;

function RemoveButton(props) {
  function removeProduct(e) {
    const confirmDeletion = () => {
      return confirm('Do you want to remove this product from your cart?');
    }

    if ( !confirmDeletion() ) {
      return;
    }
    var cart = props.cart.filter(productId => productId !== props.id);
    localStorage.setItem('cart', JSON.stringify(cart));

    var storeItem = e.target.parentNode;
    while (!storeItem.className.match(/store-grid-item/)) {
      storeItem =  storeItem.parentNode;
    }
    
    storeItem.remove();
  }

  return (
    <button className='checkout-remove-button' onClick={removeProduct}></button>
  );
}

function PayButton(props) {
  function makePayment(e) {
    //TODO
  }

  return (
    <button className='checkout-pay-button' onClick={makePayment}></button>
  );
}

function ProductListElement(props) {
  return (
    <div className='store-grid-item'>
      <div className='checkout-inner-item no-p-x'>
        <RemoveButton cart={props.cart} id={props.id}/>
        <div className='item-info'>
          <img className='image mb-16' src={props.imagePath} alt="store-item"/>
          <p className='text sub-text no-m'>{props.name}</p>
        </div>
      </div>
      <p className='title sub-text no-m checkout-inner-item'>{props.price}</p>
    </div>
  );
}

function ProductList(props) {
  const selectedProducts = props.products.filter(product => !(props.cart.indexOf(product.id) === -1));
  
  const products = selectedProducts.map((product, index) => 
    <ProductListElement 
      key={index}
      id={product.id}
      title={product.title}
      imagePath={product.imagePath}
      name={product.name}
      price={product.price}
      cart={props.cart}
    />   
  );

  return (
    <div className='checkout-list-wrapper'>
      <div className='grid-list store-grid-list'>
        { products.length ?
          products :
          <p className='text'>Time to visit our <a href='store' className='link link-dark'>store</a> page</p>
        }
      </div> 
      { products.length &&
        <div className='checkout-pay-button-wrapper'>
          <PayButton/>
        </div>
      }
    </div>   
  );
}

function SearchBlock() {
  return (
    <div className='search-block-wrapper'>
      <p className='title sub-title'>Checkout</p>
    </div>
  );
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products; 
    this.cart = props.cart; 
  }

  render() {
    return (
      <div className='page-wrapper'>
        <div className='checkout-block'>
          <div className='container'>
            <div className='checkout-wrapper'>
              <SearchBlock/>
              <ProductList products={this.products} cart={this.cart}/>
            </div>
          </div>
          </div>
      </div>
    )
  }
};

if (currentLocation.match(/^\/checkout/)) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  ReactDOM.render(
    <Checkout products={products} cart={cart}/>,
    document.getElementById('content-container')
  );
}
