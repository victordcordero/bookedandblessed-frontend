import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
  } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function InvoiceShowPage({user}) {
  
    const {id} = useParams();
    const [singleInvoice, setSingleInvoice] = useState(null)
    const [singleInvoiceExpenses, setSingleInvoiceExpenses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/invoices/${id}`)
        .then(response => response.json())
        .then(data => {
            setSingleInvoice(data[0])
            setSingleInvoiceExpenses(data[0].expenses)
        })
      }, [])
   
      let singleInvoiceExpensesAmount = singleInvoiceExpenses.map((expense) => <li> Expenses: {expense.amount} dollars</li>)
      let expenseAdd = singleInvoiceExpenses.map((expense) => expense.amount)
      console.log(expenseAdd)
      let expenseTotal = expenseAdd.reduce(function(a, b) {
        return a + b
    }, 0)

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     inputField.job_number = currentJob
    //     console.log(inputField)
    //     fetch(`http://localhost:3000/expenses`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type" : 'application/json'
    //                 },
    //                 body: JSON.stringify({expenses: inputField})
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //               addExpenseToInvoice(data, currentInvoice.id)
    //               history.push('/invoicecontainer')
    //             })
    // }
    return (
        singleInvoice && singleInvoiceExpenses && <div>
         <h2>Invoice Template</h2>
         
            <p>From: {user.name}</p>
            <p>Email: {user.email}</p>
           <p>Job Number: {singleInvoice.job_number}</p>
            <p>Client: {singleInvoice.client}</p> 
            <p>Days Worked: {singleInvoice.days_worked}</p>
            <p>Rate: {singleInvoice.rate} dollars</p>
            <p><ul>{singleInvoiceExpensesAmount}</ul></p>
            <p> Invoice Total: {singleInvoice.amount} dollars</p>
            <p>Expense Total: {expenseTotal} dollars</p>
            <p>Grand Total: {singleInvoice.amount + expenseTotal} dollars</p>
            {/* <Link to={`/PDF/${invoices.id}`} >Click Me!</Link> */}
        </div>
    )
}

export default InvoiceShowPage;
