import React, {useState, useEffect} from 'react'
import InvoiceArray from "./InvoiceArray"
import Tax from "./Tax"

function Invoices({user, setInvoices, invoices, onUpdateClient}) {
const [tax, setTax] = useState(0)
const [taxArray, setTaxArray] = useState([])
const [updatedInvoices, setUpdatedInvoices] = useState("")
const [newClientName, setNewClientName] = useState("")
console.log(invoices)
useEffect(() => {
    fetch('http://localhost:3000/taxes')
    .then(response => response.json())
    .then(data => {
        setTaxArray(data)
    })
}, [])

function deleteInvoicefromArray(deleteInvoice) {
    let invoicesKeep = invoices.filter((invoice) => invoice.id !== deleteInvoice)
    setInvoices(invoicesKeep)
}


let sendInvoices = invoices.map((invoices) => <InvoiceArray invoices={invoices} deleteInvoicefromArray={deleteInvoicefromArray} key={invoices.id} user={user} tax={tax} setTax={setTax} setTaxArray={setTaxArray} taxArray={taxArray} onUpdateClient={onUpdateClient}/>)
 


// console.log(taxArray)
// console.log(singleTax)
    return (
        <div>
            {sendInvoices}
            {/* {singleTax} */}
        </div>
    )
}

export default Invoices
