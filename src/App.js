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
import jsPDF from 'jspdf'

function App() {
  const [user, setUser] = useState(null)
  const [invoices, setInvoices] = useState([])
  // const [singleInvoice, setSingleInvoice] = useState(0)
  const [jobs, setJobs] = useState([])
  const [expenses, setExpenses] = useState([])
  const [tax, setTax] = useState([])
  const [newExpense, setNewExpense] = useState([])
  const [currentJob, setCurrentJob] = useState(0)
  const [currentInvoice, setCurrentInvoice] = useState([])
  const [lastJob, setLastJob] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  // const [singleInvoiceExpenses, setSingleInvoiceExpenses]= useState(null);
  // const [individualInvoice, setIndividualInvoice] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    rate:"", 
    days_worked:"", 
    client: "", 
    job_id: "",
    job_number: "",
    amount: "",
})


function addExpenseToInvoice(newExpense, lastJob) {
  const newInvoices = invoices.map( invoice => {
    if ( invoice.id !== lastJob ) return invoice
    {return {...invoice, expenses: [ ...invoice.expenses, ...newExpense ]
  } }})
  setInvoices(newInvoices)
}


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
  
  return (
    <> 
      <Header currentUser={currentUser}></Header> 
      <main>
        <Switch>
        <Route path="/signup">
            <SignUp setCurrentUser={setCurrentUser} />
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
            <CreateExpense currentJob={currentJob} lastJob={lastJob} setExpenses={setExpenses} expenses={expenses} currentInvoice={currentInvoice} setCurrentInvoice={setCurrentInvoice} newExpense={newExpense} setNewExpense={setNewExpense} addExpenseToInvoice={addExpenseToInvoice}></CreateExpense>
          </Route>
          <Route path="/InvoiceContainer">
            { user && expenses && <InvoiceContainer newExpense={newExpense} user={user} invoices={invoices} setInvoices={setInvoices} onUpdateClient={handleUpdateClient} expenses={expenses} tax={tax} setTax={setTax}></InvoiceContainer> }
            </Route>
            <Route path="/tax">
            <Tax tax={tax}></Tax> 
            </Route>
            <Route path="/InvoiceShowPage/:id">
          {user && <InvoiceShowPage user={user}/> }
            </Route>
            <Route path="/profile">
            {currentUser && (
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
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
        </main>
        </>
  )
}
// "react-app/jest"
export default App;
