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
        // <div>
        //     <h1>Invoice</h1>
        //     <form onSubmit={handleFormSubmit} autoComplete="off"> 
        //     <label>Rate</label>
        //     <input  type="number" name="rate" value={invoiceData.rate} onChange={handleChange}></input>
        //     <label>Number of Days</label>
        //     <input type="number" name="days_worked" value={invoiceData.days_worked} onChange={handleChange}></input>
        //     <label>Client</label>
        //     <input name="client" value={invoiceData.client} onChange={handleChange}></input>
        //     <input type="submit" value="Start!"></input>
        //     </form>
        // </div>

        <form onSubmit={handleFormSubmit} >
           
<div className="container-fluid padding" >

<div class="row">
  
<div class="col">
<div className="d-flex justify-content-center">
<div className="col-md-3" margin-left="1000px">
<div className="card" margin-left="1000px">
 <div className="card-body" margin-left="1000px">
   
<div class="form-outline mb-4">
 <input type="number" name="rate" value={invoiceData.rate} onChange={handleChange} id="form1Example1" class="form-control" />
 <label class="form-label" for="form1Example1">Rate</label>
</div>


<div class="form-outline mb-4">
 <input type="number" name="days_worked" value={invoiceData.days_worked} onChange={handleChange} id="form1Example2" class="form-control" />
 <label class="form-label" for="form1Example2">Days Worked</label>
</div>

<div class="form-outline mb-4">
 <input  name="client" value={invoiceData.client} onChange={handleChange} id="form1Example2" class="form-control" />
 <label class="form-label" for="form1Example2">Client</label>
</div>


<button type="submit" class="btn btn-primary btn-block">Submit</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</form>

    )
}

export default CreateInvoice