import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Logo from "../components/Logo";
import "./Invoice.css";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);

  /* ───────── Fetch the most-recent order ───────── */
  useEffect(() => {
    const fetchLatest = async () => {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) setInvoice(snap.docs[0].data());
    };
    fetchLatest();
  }, []);

  if (!invoice) return <div className="invoice-container">Loading…</div>;

  /* ───────── Static / fake meta data ───────── */
  const BILL_TO = `John Doe\n123 Fake St\nFaketown FT 00000`;
  const INVOICE_NO = "INV-0001";
  const TERMS = "Net 7";
  const DUE_DATE = "10/13/2016";

  /* ───────── Helpers ───────── */
  const fmtMoney = n =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      n
    );
  const fmtDate = ts =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(ts.toDate());

  return (
    <div className="invoice-container">
      {/* Brand block */}
      <div className="brand-block">
        <Logo size={48} />
        <address>
          <strong>Preloved Ltd.</strong>
          <br />
          340 S Lemon Ave #9714
          <br />
          Walnut CA 91789
          <br />
          VAT SI 553 367 95
        </address>
      </div>

      <h2 className="invoice-heading">Invoice&nbsp;#{INVOICE_NO}</h2>

      {/* Meta grid */}
      <div className="meta-grid">
        <div>
          <strong>Bill To</strong>
          <br />
          {BILL_TO.split("\n").map(line => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <div>
          <strong>Invoice Date</strong>
          <br />
          {fmtDate(invoice.createdAt)}
        </div>
        <div>
          <strong>Due Date</strong>
          <br />
          {DUE_DATE}
        </div>
        <div>
          <strong>Terms</strong>
          <br />
          {TERMS}
        </div>
      </div>

      {/* Line-items */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.title || item.name}</td>
              <td>{item.quantity}</td>
              <td>{fmtMoney(item.price)}</td>
              <td>{fmtMoney(item.quantity * item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notes / Totals */}
      <div className="summary-row">
        <div className="notes">
          <p>
            <strong>Notes</strong>
          </p>
          <p>
            Please pay to our Chase bank account.
            <br />
            ACC #: 1234567890   Routing #: 9876543210
          </p>
          <p>Thank you for your business!</p>
        </div>

        <div className="totals">
          <p>Subtotal: {fmtMoney(invoice.totalAmount)}</p>
          <p>Discount: 5 %</p>
          <p className="total">
            Total: {fmtMoney(invoice.totalAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
