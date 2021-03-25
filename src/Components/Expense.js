import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";

function Expense({currentJob, lastJob}) {
    const history = useHistory()

 const [inputField, setinputField] = useState([{
    id: uuidv4(),
    amount:"", 
    job_number: currentJob,
    invoice_id: lastJob.id,
}])

const [expenseID, setExpenseID] = useState(0)
const [inputComponent, setInputComponent] = useState([])
const NumberFormat = require('react-number-format');
const handleChangeInput = (id, event) => {

    const newInputFields = inputField.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setinputField(newInputFields);
  }

    function handleSubmit(e) {
        e.preventDefault()
        inputField.job_number = currentJob
        inputField.forEach(element =>
           { 
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

    function handleAddField(event) {
        event.stopPropagation()
        setinputField([...inputField, { id: uuidv4(), amount: "", job_number: currentJob, 
        invoice_id: lastJob.id}])
    }

    function handleRemoveField(id) {
        const values = [...inputField];
        values.splice(values.findIndex(value => value.id === id), 1);
        setinputField(values)
    }

    return (
        <div>
            <h1>Expense</h1>
          <form onSubmit={handleSubmit}>
            { inputField.map((inputField => (
            <div key={inputField.id}>
                <input type="text" name="amount" value={inputField.amount} onChange={event => handleChangeInput(inputField.id, event)}></input>
            </div>)))}
            <button type="submit">Submit</button>
          </form>
            <button onClick={handleAddField}>Add Field</button>
            <button disable={inputField.length === 1} onClick={() => handleRemoveField(inputField.id)}>Remove Field</button>
        </div>
    )
}

export default Expense

{/* <div>
<h1>Expense</h1>
<form onSubmit={handleSubmit}>
{ inputField.map((inputField, index) =>
<div key={index}>
    <input type="text" name="amount" value={inputField.amount} onChange={event => handleChangeInput(index, event)}></input>
    <button onClick={() => handleAddField()}>Add Field</button>
    <button onClick={() => handleRemoveField(index)}>Remove Field</button>
</div>)}
<button type="submit" >Submit</button>
</form>
</div> */}