import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
  } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function InvoiceShowPage({user, invoice, invoices, setInvoices}) {
  
    const {id} = useParams();
    
    const [singleInvoiceID, setSingleInvoiceID] = useState("")
    const [singleInvoiceJobNumber, setSingleInvoiceJobNumber] = useState("")
    const [singleInvoiceExpenses, setSingleInvoiceExpenses] = useState([])
    const [showExpenses, setShowExpenses] = useState(false)
    const [singleInvoice, setSingleInvoice] = useState(null)
    const [invoiceData, setInvoiceData] = useState(null)
    const [inputFieldShow, setInputFieldShow] = useState([{
        id: uuidv4(),
        amount:"", 
        job_number: 0,
        invoice_id: 0,
    }])
    

    useEffect(() => {
        fetch(`http://localhost:3000/invoices/${id}`)
        .then(response => response.json())
        .then(data => {
            // setSingleInvoice(data[0])
            // setSingleInvoiceExpenses(data[0].expenses)
            // setSingleInvoiceID(data[0].id)
            // setSingleInvoiceJobNumber(data[0].job_number)
            setInvoiceData(data[0])
        })
      }, [])

      console.log("data from fetch", invoiceData)

   console.log(singleInvoiceJobNumber)
   let singleInvoiceExpensesAmount
   let expenseAdd
   let expenseTotal 

      if (invoiceData) {
        singleInvoiceExpensesAmount = invoiceData.expenses.map((expense) => <li> Expenses: {expense.amount} dollars</li>)
        expenseAdd = invoiceData.expenses.map((expense) => expense.amount)
        expenseTotal = expenseAdd.reduce(function(a, b) {
            return a + b
        }, 0)
      }

     
     

    function handleSubmit(e) {
        e.preventDefault()
    console.log(inputFieldShow)
        fetch(`http://localhost:3000/expenses`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : 'application/json'
                    },
                    body: JSON.stringify({expenses: inputFieldShow})
                })
                .then(response => response.json())
                .then(newExpense => {
                //   addExpenseToSingleInvoice(newExpense, invoiceData.id)
                  setInvoiceData({...invoiceData, expenses: [...invoiceData.expenses, ...newExpense]})

                })
    }

    // function addExpenseToSingleInvoice(newExpense, currentInvoiceNumber) {
    //     setSingleInvoiceExpenses([...singleInvoiceExpenses, ...newExpense])
    //     const newInvoices = invoices.map( invoice => {
    //         if ( invoice.id !== currentInvoiceNumber ) return invoice
    //         {return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
    //       } }})
    //       setInvoices(newInvoices)
    //   }
    
    
    const handleChangeInput = (id, event) => {

        inputFieldShow[0].job_number = invoiceData.job_number
        inputFieldShow[0].invoice_id = invoiceData.id
        const newInputShow = inputFieldShow.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        // setInputFieldShow([...inputFieldShow, { id: uuidv4(), amount: "",  job_number: invoiceData.job_number,
        // invoice_id: invoiceData.id}])
        setInputFieldShow(newInputShow);

      }

      function handleAddField(event) {
        event.stopPropagation()
        setInputFieldShow([...inputFieldShow, { id: uuidv4(), amount: "",  job_number: invoiceData.job_number,
        invoice_id: invoiceData.id}])
    }

    function handleRemoveField(id) {
        const values = [...inputFieldShow];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFieldShow(values)
    }
    return (
        invoiceData && 
      //   <div className="container-fluid padding">
      //   <div className="row padding">

      //     <div className="col-lg-6">
           
      //     <div class="container">
      //           <div className="row padding">
      //             <div className="container-fluid padding">
      //  <div class="row welcome text-center">
      //    <div class="col-12">
      //  <div className="row padding">
      //  <div className="col-md-6">
      //  <div className="col-12">
<div class="container">
  <div class="row">
    <div class="col">
       <div className="card">
         <div className="card-body">
           <div>
            <h4 className="card-title">Invoice {invoiceData.job_number}</h4>
            <p>From: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Job Number: {invoiceData.job_number}</p>
            <p>Client: {invoiceData.client}</p> 
            <p>Days Worked: {invoiceData.days_worked}</p>
            <p>Rate: {invoiceData.rate} dollars</p>
            <p><ul>{singleInvoiceExpensesAmount}</ul></p>
            <p> Invoice Total: {invoiceData.amount} dollars</p>
            <p>Expense Total: {expenseTotal} dollars</p>
            <p>Grand Total: {invoiceData.amount + expenseTotal} dollars</p>
            <Link className="btn btn-outline-secondary" to={`/Wholepdf/${invoiceData.id}`} >Print</Link>
          </div>
        </div>
        </div>
      </div>
        <div class="col">
          <form onSubmit={handleSubmit}>
            <div className="container-fluid padding" >
              <div className="d-flex justify-content-center">
                <div className="col-md-12" margin-left="1000px">
                  <div className="card" margin-left="1000px">
                    <div className="card-body" margin-left="1000px"> 
                      <div class="form-outline mb-4">
                        { inputFieldShow.map((inputField => (
                         <div key={inputFieldShow.id}>
                          <input type="number" name="amount" value={inputField.amount} onChange={event => handleChangeInput(inputField.id, event)}  id="form1Example1" class="form-control"></input>
                          <label class="form-label" for="form1Example1">Expense</label>
                         </div>)))}
                      </div> 
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-center">
          <button class="btn btn-primary" onClick={handleAddField}>Add Field</button>
          <button class="btn btn-primary" width="100px" onClick={() => handleRemoveField(inputFieldShow.id)}>Remove Field</button>
        </div>
        </div>
      </div>
      </div>
     
    )
}

export default InvoiceShowPage;
