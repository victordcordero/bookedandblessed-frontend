import React, {useState, useEffect} from 'react'
import InvoiceCard from "./InvoiceCard"
import Tax from "./TaxContainer"

function InvoiceContainer({setSingleInvoice, user, setInvoices, invoices, onUpdateClient, expenses, newExpense, setTax, tax}) {
const [updatedInvoices, setUpdatedInvoices] = useState("")
const [newClientName, setNewClientName] = useState("")


const newInvoices = invoices.map( invoice => {
    if ( invoice.id !== newExpense.invoice ) return invoice
    {return {...invoice, expenses: [ ...invoice.expenses, newExpense ]
  } }})

 

function deleteInvoicefromArray(deleteInvoice, invoice) {
    let invoicesKeep = invoices.filter((invoice) => invoice.id !== deleteInvoice)
    setInvoices(invoicesKeep)
    let newTaxArray = tax.filter((tax) => {
        if(tax.job_number !== deleteInvoice.job_number) {
          return tax
        }})
   setTax(newTaxArray)
}


let sendInvoices = invoices.map((invoices) => <InvoiceCard setSingleInvoice={setSingleInvoice} invoices={invoices} deleteInvoicefromArray={deleteInvoicefromArray} key={invoices.id} user={user} tax={tax} setTax={setTax} onUpdateClient={onUpdateClient} expense={invoices.expenses} />)
 
    return (
        <div className="container-fluid padding">
                <div className="row padding">

             {sendInvoices}
        </div>
        </div>
    )
}

export default InvoiceContainer
