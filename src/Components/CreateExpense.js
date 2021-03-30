import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";

function CreateExpense({addTaxtoInvoice, addExpenseToInvoice, currentJob, lastJob, expenses, setExpenses, setCurrentInvoice, currentInvoice, setNewExpense, newExpense}) {
    const history = useHistory()

 const [inputField, setinputField] = useState([{
    id: uuidv4(),
    amount:"", 
    job_number: currentJob,
    invoice_id: currentInvoice.id,
}])

const [expenseID, setExpenseID] = useState(0)
const [inputComponent, setInputComponent] = useState({})
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
        console.log(inputField)
        fetch(`http://localhost:3000/expenses`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : 'application/json'
                    },
                    body: JSON.stringify({expenses: inputField})
                })
                .then(response => response.json())
                .then(data => {
                  addExpenseToInvoice(data, currentInvoice.id)
                  addTaxtoInvoice(data, currentInvoice.id)
                  history.push('/invoicecontainer')
                })
    }


    function handleAddField(event) {
        event.stopPropagation()
        setinputField([...inputField, { id: uuidv4(), amount: "", job_number: currentJob, 
        invoice_id: currentInvoice.id}])
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
                <input type="number" name="amount" value={inputField.amount} onChange={event => handleChangeInput(inputField.id, event)}></input>
            </div>)))}
            <button type="submit">Submit</button>
          </form>
            <button onClick={handleAddField}>Add Field</button>
            <button onClick={() => handleRemoveField(inputField.id)}>Remove Field</button>
        </div>
    )
}

export default CreateExpense

