import React, {useState, useEffect} from 'react'
import ExpensesArray from "./ExpensesArray"

function Expenses({currentUser}) {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUser}`)
        .then(response => response.json())
        .then(data => {
            setExpenses(data)
        })
    }, [])

   
        let jobs
        if (expenses.length > 0) {
        jobs = expenses[0].jobs.map((job) => (<ExpensesArray job={job} key={job.id}/>))
        }
        
    return (
        <div>
           {jobs}
        </div>
    )
}

export default Expenses
