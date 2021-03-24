import React, {useState, useEffect} from 'react'
import InvoiceArray from "./InvoiceArray"
import Tax from "./Tax"

function Invoices({user}) {
const [tax, setTax] = useState(0)
const [taxArray, setTaxArray] = useState([])
console.log(user)

useEffect(() => {
    fetch('http://localhost:3000/taxes')
    .then(response => response.json())
    .then(data => {
        setTaxArray(data)
    })
}, [])

let sendInvoices = user.invoices.map((invoice) => <InvoiceArray invoice={invoice} key={invoice.id} user={user} tax={tax} setTax={setTax} setTaxArray={setTaxArray} taxArray={taxArray}/>)
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
