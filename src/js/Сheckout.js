import React from "react";
import ReactDOM from "react-dom";
import products from '../data/cart.json';

var currentLocation = window.location.pathname;

function ProductListElement(props) {
  return (
    <div className='store-grid-item'>
      <div className='checkout-inner-item no-p-x'>
        <button className='checkout-remove-button'></button>
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
  
  const products = selectedProducts.map((product) => 
    <ProductListElement 
      key={product.id}
      title={product.title}
      imagePath={product.imagePath}
      name={product.name}
      price={product.price}
    />   
  );

  return (
    <div className='grid-list store-grid-list'>
      { products.length ?
        products :
        <p className='text'>Time to visit our <a href='store' className='link link-dark'>store</a> page</p>
      }
    </div>
  );
}

function SearchBlock(props) {
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
              <div className='checkout-list-wrapper'>
                <ProductList products={this.products} cart={this.cart}/>
              </div>
            </div>
          </div>
          </div>
      </div>
    )
  }
};

if (currentLocation.match(/^\/checkout/)) {
  var cart = localStorage.getItem('cart') || [];

  ReactDOM.render(
    <Checkout products={products} cart={cart}/>,
    document.getElementById('content-container')
  );
}
