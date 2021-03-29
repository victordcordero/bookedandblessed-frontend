import React from 'react'
import TaxCard from './TaxCard'
import { render } from "react-dom";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";

function TaxContainer({tax}) {

let taxes = tax.map((tax) => <TaxCard tax={tax} />)
let taxAmount = tax.map((tax) => tax.amount)

let taxTotal = taxAmount.reduce(function(a, b) {
    return a + b
}, 0)
    return (
        <div>
           {taxes}
           <h1>Grand Total: {taxTotal} dollars</h1>
        </div>
    )
}

export default TaxContainer
