import React, {useState} from 'react'
import NumberFormat from 'react-number-format';
import InvoiceShowPage from './InvoiceShowPage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
  } from "react-router-dom";


function InvoiceCard({setSingleInvoice, invoices, deleteInvoicefromArray, user,onUpdateClient, expense, setTax, tax}) {
const [updatedClient, setUpdatedClient] = useState("")


let expenseList = expense.map((expense) => <li> Expenses: {expense.amount} dollars</li>)


let expenseAdd = expense.map((expense) => expense.amount)

let expenseTotal = expenseAdd.reduce(function(a, b) {
    return a + b
}, 0)


// setTaxAmount(taxFromInvoice)
// function caclulateTax() {
//     let taxFromInvoice = (invoices.amount * .30)
    
//     fetch(`http://localhost:3000/taxes`, {
//         method: "POST",
//         headers: {
//             "Content-Type" : 'application/json'
//         },
//         body: JSON.stringify({amount: taxFromInvoice, job_number: invoices.job_number, user_id: user.id})
//     })
//     .then(response => response.json())
//     .then(data => {
//         setTaxAmount([...taxAmount, data])
//         setTax([...tax, data])
//     })
     
// }
function handleNameFormSubmit(e) {
e.preventDefault()
    fetch(`http://localhost:3000/invoices/${invoices.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({client: updatedClient})
    })
    .then(response => response.json())
    .then(updatedClientName => {
        onUpdateClient(updatedClientName)
    })
}

function deleteInvoice() {
    fetch(`http://localhost:3000/invoices/${invoices.id}`, {
        method: "DELETE" })
        let deleteInvoice = invoices.id
        deleteInvoicefromArray(deleteInvoice, invoices)

}

    return (
    expense &&
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Invoice Template: {invoices.job_number}</h4>
          <p className="card-text">From: {user.name}</p>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Job Number: {invoices.job_number}</p>
          <p className="card-text">Client: {invoices.client}</p>
          <p className="card-text">Days Worked: {invoices.days_worked}</p>
          <p className="card-text">Rate: {invoices.rate} dollars</p>
          <p className="card-text"><ul>{expenseList}</ul></p>
          <p className="card-text">Grand Total: {invoices.amount + expenseTotal} dollars</p>
          <button className="btn btn-outline-secondary" onClick={deleteInvoice}>Delete</button>
          <Link className="btn btn-outline-secondary" to={`/InvoiceShowPage/${invoices.id}`} >View</Link>
        </div>

        </div>
    
    </div>

    )
}

export default InvoiceCard
