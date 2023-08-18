import React, { useState } from "react";
import _ from 'lodash';
import ProductList from "./ProductList";
import Cart from "./Cart";
import CheckoutButton from "./CheckoutButton";
import Invoices from "./Invoices";
import { products } from "./data";

const MAX_SAME_PRODUCTS_PER_INVOICE = 50;
const MAX_PRICE_PER_INVOICE = 500;

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const handleProductSelect = (product, selectedQuantity, event) => {
    setSelectedProducts((prevSelected) => [
      ...prevSelected,
      { ...product, selectedQuantity },
    ]);
  };

  const handleProductRemove = (productIndex) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((_, index) => index !== productIndex)
    );
  };

  const handleQuantityChange = (productIndex, newQuantity) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product, index) =>
        index === productIndex
          ? { ...product, selectedQuantity: newQuantity }
          : product
      )
    );
  };

  const canAddMoreProductsToInvoice = (invoiceTotal, newValue, quantity) =>
    quantity < MAX_SAME_PRODUCTS_PER_INVOICE &&
      invoiceTotal + newValue < MAX_PRICE_PER_INVOICE;

  const prepareProductForInvoice = (product, quantity) => {
    const discountedTotal = (product.price - product.discount) * quantity;
    const vatTotal = discountedTotal + (discountedTotal * (product.vat / 100));
    
    return {
      name: product.name,
      quantity,
      price: product.price,
      discount: product.discount,
      vat: product.vat,
      total: discountedTotal,
      vatTotal,
    }
  }

  const handleCheckout = () => {
    let currentInvoice = [];
    let currentInvoiceValue = 0;
    const newInvoices = [];

    selectedProducts.forEach((product) => {
      const { selectedQuantity } = product;
 
      let quantityPerInvoice = 0;

      _.times(selectedQuantity, () => {
        quantityPerInvoice += 1;

        const preparedProduct = prepareProductForInvoice(product, quantityPerInvoice);

        if (!canAddMoreProductsToInvoice(currentInvoiceValue, preparedProduct.vatTotal, quantityPerInvoice)) {
          currentInvoice.push(preparedProduct)

          newInvoices.push(currentInvoice);

          currentInvoice = [];
          quantityPerInvoice = 0;
          currentInvoiceValue = 0;
        }
      })

      if (quantityPerInvoice !== 0) {
        const preparedProduct = prepareProductForInvoice(product, quantityPerInvoice);

        currentInvoice.push(preparedProduct)
        currentInvoiceValue += preparedProduct.vatTotal;
      }
    });

    if (currentInvoice.length > 0) {
      newInvoices.push(currentInvoice);
    }

    setInvoices(newInvoices);
  };

  return (
    <div>
      <h1>Supermarket Checkout</h1>
      <ProductList
        products={products}
        onProductSelect={handleProductSelect}
        onQuantityChange={handleQuantityChange}
      />
      <Cart
        selectedProducts={selectedProducts}
        onProductRemove={handleProductRemove}
      />
      <CheckoutButton onClick={handleCheckout} />
      <Invoices invoices={invoices} />
    </div>
  );
}

export default App;
