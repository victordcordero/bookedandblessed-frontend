import React, {useState} from 'react'
import NumberFormat from 'react-number-format';

function InvoiceCard({invoices, deleteInvoicefromArray, user, tax, setTax, taxArray, setTaxArray, onUpdateClient}) {
const [updatedClient, setUpdatedClient] = useState("")

let amount = invoices.expenses.map((expense) => <li> Expenses: {expense.amount} dollars</li>)

let amounts = invoices.expenses.map((expense) => expense.amount)
let expenseTotal = amounts.reduce(function(a, b) {
    return a + b
}, 0)

tax = (invoices.amount * .30)
setTax(tax)

function caclulateTax() {

    fetch(`http://localhost:3000/taxes`, {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({amount: tax, job_number: invoices.job_number, user_id: user.id})
    })
    .then(response => response.json())
    .then(data => {
        setTaxArray([...taxArray, data])
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

    return (
        <div>
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
            <p><ul>{amount}</ul></p>
            <p> Invoice Total: {invoices.amount} dollars</p>
            <p>Expense Total: {expenseTotal} dollars</p>
            <p>Grand Total: {invoices.amount + expenseTotal} dollars</p>
            <p>Tax: {tax} dollars</p>
            <button onClick={deleteInvoice}>Delete Invoice</button>
        </div>
    )
}

export default InvoiceCard
