import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function CreateInvoice({currentJob, lastJob, setInvoiceData, invoiceData, setInvoices, invoices, setCurrentInvoice, currentInvoice}) {

    const history = useHistory()
    
    function handleFormSubmit(e) {
        e.preventDefault()
        invoiceData.amount = invoiceData.rate * invoiceData.days_worked
        invoiceData.job_id = lastJob.id
        invoiceData.job_number = currentJob
        fetch(`http://localhost:3000/invoices`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(invoiceData)
        })
        .then(response => response.json())
        .then(data => {
            setInvoices([...invoices, data])
            
            setCurrentInvoice(data)
            history.push('/CreateExpense')
        })
        
        }

        function handleChange(e) {
            setInvoiceData({
                ...invoiceData,
                [e.target.name]: e.target.value
            })
        }
    return (
        <div>
            <h1>Invoice</h1>
            <form onSubmit={handleFormSubmit} autoComplete="off"> 
            <label>Rate</label>
            <input name="rate" value={invoiceData.rate} onChange={handleChange}></input>
            <label>Number of Days</label>
            <input name="days_worked" value={invoiceData.days_worked} onChange={handleChange}></input>
            <label>Client</label>
            <input name="client" value={invoiceData.client} onChange={handleChange}></input>
            <input type="submit" value="Start!"></input>
            </form>
        </div>
    )
}

export default CreateInvoice
