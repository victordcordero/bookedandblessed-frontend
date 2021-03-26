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
const [taxAmount, setTaxAmount] = useState([])
let expenseList = expense.map((expense) => <li> Expenses: {expense.amount} dollars</li>)

let expenseAdd = expense.map((expense) => expense.amount)

let expenseTotal = expenseAdd.reduce(function(a, b) {
    return a + b
}, 0)


// setTaxAmount(taxFromInvoice)
function caclulateTax() {
    let taxFromInvoice = (invoices.amount * .30)
    console.log(user.id)
    console.log(invoices.job_number)
    fetch(`http://localhost:3000/taxes`, {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({amount: taxFromInvoice, job_number: invoices.job_number, user_id: user.id})
    })
    .then(response => response.json())
    .then(data => {
        setTaxAmount([...taxAmount, data])
        setTax([...tax, data])
    })
     
}
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
        deleteInvoicefromArray(deleteInvoice)
}

// function viewInvoice() {
//     <Route exact path='/invoiceshowpage/${invoice}'>
//           <SongPage song={song}/>
//         </Route>
// }

// function clickSingleInvoice() {
//     setSingleInvoice(invoices.id)
// // }
// onClick={clickSingleInvoice}
    return (
        <div>
            <Link to={`/InvoiceShowPage/${invoices.id}`}>Click Me!</Link>
            <br></br>
            <br></br>
            <h2>Invoice Template</h2>
            <p>From: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Job Number: {invoices.job_number}</p>
            <p>Client: {invoices.client}</p>
            <form onSubmit={handleNameFormSubmit}>
                <input value={updatedClient} onChange={(e) => setUpdatedClient(e.target.value)}></input>
                <button type="submit" >Update</button>
            </form>
            <p>Dates Worked: {invoices.days_worked}</p>
            <p>Rate: {invoices.rate} dollars</p>
            <p><ul>{expenseList}</ul></p>
            <p> Invoice Total: {invoices.amount} dollars</p>
            <p>Expense Total: {expenseTotal} dollars</p>
            <p>Grand Total: {invoices.amount + expenseTotal} dollars</p>
            <button onClick={deleteInvoice}>Delete Invoice</button>
            <button onClick={caclulateTax}>Calculate Tax</button>
            {/* <button onClick={viewInvoice}>View Invoice</button> */}
            
        </div>
    )
}

export default InvoiceCard
