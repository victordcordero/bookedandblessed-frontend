import React, {useState} from 'react'

function Expense({invoiceData, currentJob, lastJob}) {
console.log(lastJob.id)
 const [inputField, setinputField] = useState([{
    amount:"", 
    job_number: currentJob,
    invoice_id: lastJob.id,
}])

const [expenseID, setExpenseID] = useState(0)
    
    function handleChangeInput(index, event) {
        const values = [...inputField]; values[index][event.target.name] = event.target.value
        setinputField(values)
    }

    function handleSubmit(e) {
        console.log(inputField)
        
        e.preventDefault()
        inputField.job_number = currentJob
        console.log(inputField)
        inputField.forEach(element =>
           { console.log(element)
        fetch(`http://localhost:3000/expenses`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : 'application/json'
                    },
                    body: JSON.stringify(element)
                })
                .then(response => response.json())
                .then(data => {
                   console.log(data)
                })},       
            )
    }

    function handleAddField() {
        setinputField([...inputField, {amount: "", job_number: currentJob, 
        invoice_id:lastJob.id}])
    }

    function handleRemoveField(index) {
        const values = [...inputField];
        values.splice(index, 1)
        setinputField(values)
    }
    return (
        <div>
            <h1>Expense</h1>
          <form onSubmit={handleSubmit}>
            { inputField.map((inputField, index) =>
            <div key={index}>
                <input type="text" name="amount" value={inputField.amount} onChange={event => handleChangeInput(index, event)}></input>
                <button type="submit" onClick={() => handleAddField()}>Add Field</button>
                <button type="submit" onClick={() => handleRemoveField(index)}>Remove Field</button>
            </div>)}
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
    )
}

export default Expense