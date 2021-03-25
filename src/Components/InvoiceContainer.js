import React, {useState, useEffect} from 'react'
import InvoiceCard from "./InvoiceCard"
import Tax from "./Tax"

function InvoiceContainer({user, setInvoices, invoices, onUpdateClient, expenses, newExpense}) {
const [tax, setTax] = useState(0)
const [taxArray, setTaxArray] = useState([])
const [updatedInvoices, setUpdatedInvoices] = useState("")
const [newClientName, setNewClientName] = useState("")

useEffect(() => {
    fetch('http://localhost:3000/taxes')
    .then(response => response.json())
    .then(data => {
        setTaxArray(data)
    })
}, [])

const newInvoices = invoices.map( invoice => {
    if ( invoice.id !== newExpense.invoice ) return invoice
    {return {...invoice, expenses: [ ...invoice.expenses, newExpense ]
  } }})
//   setInvoices( newInvoices )

function deleteInvoicefromArray(deleteInvoice) {
    let invoicesKeep = invoices.filter((invoice) => invoice.id !== deleteInvoice)
    setInvoices(invoicesKeep)
}


let sendInvoices = invoices.map((invoices) => <InvoiceCard invoices={invoices} deleteInvoicefromArray={deleteInvoicefromArray} key={invoices.id} user={user} tax={tax} setTax={setTax} setTaxArray={setTaxArray} taxArray={taxArray} onUpdateClient={onUpdateClient} expense={invoices.expenses}/>)
 


// console.log(taxArray)
// console.log(singleTax)
    return (
        <div>
            {sendInvoices}
            {/* {singleTax} */}
        </div>
    )
}

export default InvoiceContainer
