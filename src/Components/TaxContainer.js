import React from 'react'
import TaxCard from './TaxCard'

function TaxContainer({tax}) {
console.log(tax)
let taxes = tax.map((tax) => <TaxCard tax={tax} />)
    return (
        <div>
           {taxes}
        </div>
    )
}

export default TaxContainer
