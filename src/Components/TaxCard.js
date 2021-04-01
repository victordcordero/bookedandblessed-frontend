import React from 'react'
import ReactToPrint from "react-to-print";

function TaxCard({tax}) {
   
    return (
        <div>
            <li className="list-group-item">Job Number: {tax.job_number} Tax Amount: {tax.amount} dollars</li>
               
                {/* <h1>Job Number: {tax.job_number} Tax Amount: {tax.amount} dollars</h1>  */}
               
        </div>
    )
}

export default TaxCard
