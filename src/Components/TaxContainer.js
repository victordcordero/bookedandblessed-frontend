import React from 'react'
import TaxCard from './TaxCard'
import { render } from "react-dom";
import ComponentToPrint from "./ComponentToPrint";
import ReactToPrint from "react-to-print";

function TaxContainer({tax}) {

let taxes = tax.map((tax) => <TaxCard tax={tax} />)
    return (
        <div>
           {taxes}
        </div>
    )
}

export default TaxContainer
