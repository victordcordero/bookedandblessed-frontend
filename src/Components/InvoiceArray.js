import React, {useState} from 'react'
import Expenses from './Expenses'
import Invoice from './Invoice'
import Invoices from './Invoices'


function InvoiceArray({invoice, user, tax, setTax, taxArray, setTaxArray}) {
const [showTax, setShowTax] = useState(false)

let amount = invoice.expenses.map((expense) => <li> Expenses: {expense.amount} dollars</li>)
let amounts = invoice.expenses.map((expense) => expense.amount)
let expenseTotal = amounts.reduce(function(a, b) {
    return a + b
}, 0)

tax = (invoice.amount * .30)
setTax(tax)

console.log(showTax)
function caclulateTax() {
    if (showTax === false) {
    fetch(`http://localhost:3000/taxes`, {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({amount: tax, job_number: invoice.job_number, user_id: user.id})
    })
    .then(response => response.json())
    .then(data => {
        setTaxArray([...taxArray, data])
    })
     
}}
    return (
        <div>
            <br></br>
            <br></br>
            <h2>Invoice Template</h2>
            <p>From: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Job Number: {invoice.job_number}</p>
            <p>Client: {invoice.client}</p>
            <p>Dates Worked: {invoice.days_worked}</p>
            <p>Rate: {invoice.rate} dollars</p>
            <p><ul>{amount}</ul></p>
            <p> Invoice Total: {invoice.amount} dollars</p>
            <p>Expense Total: {expenseTotal} dollars</p>
            <p>Grand Total: {invoice.amount + expenseTotal} dollars</p>
            <button onClick={caclulateTax}>Send Tax</button>
            <p>Tax: {tax} dollars</p>
        </div>
    )
}

export default InvoiceArray
