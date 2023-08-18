import React from "react";
import "./assets/Invoices.css"; 

const Invoices = ({ invoices }) => {
  const renderInvoiceProduct = (product, productIndex) => {
    return (
      <tr key={productIndex}>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.discount.toFixed(2)}</td>
        <td>{product.vat}%</td>
        <td>${product.total.toFixed(2)}</td>
        <td>${product.vatTotal.toFixed(2)}</td>
      </tr>
    );
  };

  const sumArray = (arr) => arr.reduce((a, b) => a + b, 0).toFixed(2);

  const renderInvoiceTable = (invoice, index) => {
    const subTotal = sumArray(invoice.map((p1) => p1.total));
    const vatTotal = sumArray(invoice.map((p1) => p1.vatTotal));
    const vat = (vatTotal - subTotal).toFixed(2);

    return (
      <div className="invoice" key={index}>
        <h3>Invoice {index + 1}</h3>
        <table className="invoice-table">
          {console.log("invoice", invoice)}
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>VAT</th>
              <th>Total</th>
              <th>VatTotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.map(renderInvoiceProduct)}
            <tr>
              <td colSpan={6}>
                <p className="total-col-label">Subtotal</p>
              </td>
              <td>{subTotal}</td>
            </tr>
            <tr>
              <td colSpan={6}>
                <p className="total-col-label">VAT</p>
              </td>
              <td>{vat}</td>
            </tr>
            <tr>
              <td colSpan={6}>
                <p className="total-col-label">Total</p>
              </td>
              <td>{vatTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="invoices-container">
      <h2>Invoices</h2>
      {invoices.map(renderInvoiceTable)}
    </div>
  );
};

export default Invoices;
