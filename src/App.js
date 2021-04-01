import React, {useEffect, useState, PureComponent} from "react"
import './App.css';
import Body from "./Components/Body"
import Header from './Components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import CreateJob from "./Components/CreateJob";
import CreateInvoice from "./Components/CreateInvoice";
import CreateExpense from "./Components/CreateExpense";
import InvoiceContainer from "./Components/InvoiceContainer";
import Tax from "./Components/TaxContainer";
import InvoiceShowPage from "./Components/InvoiceShowPage"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import Profile from "./Components/Profile"
import WholePdf from "./Components/WholePdf"
import PDF from "./Components/Pdf"
import jsPDF from 'jspdf'
import Button from 'react-bootstrap/button'
import Footer from "./Components/Footer";
// import Footer from "./Components/Navbar/Footer";




function App() {
  const [user, setUser] = useState(null)
  const [invoices, setInvoices] = useState([])
  const [jobs, setJobs] = useState([])
  const [expenses, setExpenses] = useState([])
  const [tax, setTax] = useState([])
  const [newExpense, setNewExpense] = useState([])
  const [currentJob, setCurrentJob] = useState(0)
  const [currentInvoice, setCurrentInvoice] = useState([])
  const [lastJob, setLastJob] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const [taxAmount, setTaxAmount] = useState([])
  const [singleInvoice, setSingleInvoice] = useState(null)
  const [invoiceData, setInvoiceData] = useState({
    rate:"", 
    days_worked:"", 
    client: "", 
    job_id: "",
    job_number: "",
    amount: "",
})


function addExpenseToInvoice(newExpense, currentInvoiceNumber) {
  const newInvoices = invoices.map( invoice => {
    if ( invoice.id !== currentInvoiceNumber ) return invoice
    {return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
  } }})
  setInvoices(newInvoices)

}

// function addExpenseToSingleInvoice(newExpense, currentInvoiceNumber) {
//   let single = invoices.find( invoice => {
//     if ( invoice.id === currentInvoiceNumber )
//     {return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
//   } }})
//   // const single = invoices.find( invoice => {
//   //   if ( invoice.id === currentInvoiceNumber ) return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
//   //   } })
//   console.log(newExpense)
//   console.log(single)
//   setSingleInvoice(single)
// }

useEffect(() => {
  fetch('http://localhost:3000/users/1')
  .then(response => response.json())
  .then(data => {
    setUser(data[0])
    setInvoices(data[0].invoices)
    let userExpenses = data[0].invoices.map((expense) => expense.expenses)
    setExpenses(userExpenses) 
    setTax(data[0].taxes)
  })
}, [])


useEffect(() => {
  fetch('http://localhost:3000/jobs')
  .then(response => response.json())
  .then(data => {
  setJobs(data)
  })
}, [])

useEffect(() => {
  const token = true;
  if(token) {
  fetch('http://localhost:3000/me')
  .then(response => response.json())
  .then(data => {
  setCurrentUser(data)
  })
}}, [])

function handleUpdateClient(updatedClient) {
  console.log(updatedClient.client)
  const updatedClientArray = invoices.map((invoice) => {
    if(invoice.id === updatedClient.id) {
      return updatedClient; 
    } else {
      return invoice;
    }
  });
  setInvoices(updatedClientArray);
  } 
  
  function addTaxtoInvoice(expense, invoiceNumber) {
    const foundInvoice = invoices.find( invoice => {
      if ( invoice.id === invoiceNumber ) return invoice})
let expenseAdd = expense.map((expense) => expense.amount)
let expenseTotal = expenseAdd.reduce(function(a, b) {
    return a + b
}, 0)

let taxFromInvoice = (foundInvoice.amount * .30)
fetch(`http://localhost:3000/taxes`, {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({amount: taxFromInvoice, job_number: foundInvoice.job_number, user_id: user.id})
    })
    .then(response => response.json())
    .then(data => {
        setTax([...tax, data])
        
    })
  }
  return (
    <> 

      {/* <Header currentUser={currentUser}></Header>  */}
      
      <main>
      <Header currentUser={currentUser}></Header> 
      
        <Switch>
        <Route path="/signup">
            <SignUp setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/wholepdf/:id">
         { user && <WholePdf setCurrentUser={setCurrentUser} currentUser={currentUser} user={user}/>}
          </Route>
          <Route exact path="/pdf">
         <PDF/>
          </Route>
          <Route path="/login">
          <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/CreateJob">
            <CreateJob currentJob={currentJob} user={user} lastJob={lastJob} setLastJob={setLastJob} setCurrentJob={setCurrentJob} jobs={jobs} setJobs={setJobs}></CreateJob>
          </Route>
            <Route path="/CreateInvoice">
            <CreateInvoice currentJob={currentJob} lastJob={lastJob} invoiceData={invoiceData} setInvoiceData={setInvoiceData} setInvoices={setInvoices} invoices={invoices} setCurrentInvoice={setCurrentInvoice}></CreateInvoice>
          </Route>
          <Route path="/CreateExpense">
            <CreateExpense addTaxtoInvoice={addTaxtoInvoice} currentJob={currentJob} lastJob={lastJob} setExpenses={setExpenses} expenses={expenses} currentInvoice={currentInvoice} setCurrentInvoice={setCurrentInvoice} newExpense={newExpense} setNewExpense={setNewExpense} addExpenseToInvoice={addExpenseToInvoice}></CreateExpense>
          </Route>

         
          <Route path="/InvoiceContainer">
            { user && expenses && <InvoiceContainer newExpense={newExpense} user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient} expenses={expenses} tax={tax} setTax={setTax}></InvoiceContainer> }
            </Route>
            <Route path="/taxContainer">
            <Tax tax={tax}></Tax> 
            </Route>
            <Route path="/InvoiceShowPage/:id">
          {user && <InvoiceShowPage user={user} invoices={invoices} setInvoices={setInvoices} singleInvoice={singleInvoice} setSingleInvoice={setSingleInvoice}/> }
            </Route>
            <Route path="/profile">
            {currentUser && (
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentJob={currentJob} user={user} lastJob={lastJob} setLastJob={setLastJob} setCurrentJob={setCurrentJob} jobs={jobs} setJobs={setJobs}
              />
            )}
          </Route>
          <Route path="/">
            {currentUser ? (
              <h1>Welcome, {currentUser.username}</h1>
            ) : (
              <h1>Please Login or Sign Up</h1>
            )}
          </Route>
        </Switch>
        {/* <Footer /> */}
        <Footer></Footer>
        </main>
        </>
  )
}

export default App;
