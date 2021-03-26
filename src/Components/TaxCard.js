import React from 'react'

function TaxCard({tax}) {
    return (
        <div>
            <ul>
                <li>
                <h1>Job Number: {tax.job_number} Tax Amount:{tax.amount}</h1> 
                </li>
                </ul>
        </div>
    )
}

export default TaxCard
