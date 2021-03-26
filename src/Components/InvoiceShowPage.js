import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams
  } from "react-router-dom";

function InvoiceShowPage() {
    const {id} = useParams();
    const [singleInvoice, setSingleInvoice] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/invoices/${id}`)
        .then(response => response.json())
        .then(data => {
            setSingleInvoice(data)
            console.log(data)
        })
      }, [])

    return (
        singleInvoice && <div>
         <p>{singleInvoice[0].client}</p>
        </div>
    )
}

export default InvoiceShowPage;
