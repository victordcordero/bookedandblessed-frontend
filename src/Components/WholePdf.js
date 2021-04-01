import React, {useState, useEffect} from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams
} from "react-router-dom";
import PdfDocument from './Pdf'

// Create styles

// Create Document Component
function WholePdf({currentUser, user}) {
  const {id} = useParams();
  const [printInvoicePDF, setPrintInvoicePDF] = useState(null)
  const [printExpensePDF, setPrintExpensePDF] = useState([])
  const [singleExpensePDf, setSingleExpensePDF] = useState([1,2,3])
  const [testingAgain, setTestingAgain] = useState([])
  const [testing, setTesting] = useState("working")
  const [printRate, setPrintRate] = useState("")
  const [printDayWorked, setPrintDayWorked] = useState("")
  const [printClient, setPrintClient] = useState("")
  const [printAmount, setPrintAmount] = useState("")
  const [printJobNumber, setPrintJobNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [one, setOne] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [social, setsocial] = useState("")
  const [email, setEmail] = useState("")
  const [bank, setBank] = useState("")
  const [route, setRoute] = useState("")
  const [checking, setChecking] = useState("")
  // const [email, setEmail] = useState(null)
  useEffect(() => {
    console.log(id, "id")
    // console.log(currentUser)
    fetch(`http://localhost:3000/invoices/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(id, "hello",  data)
      setPrintInvoicePDF(data[0])
      setPrintRate(data[0].rate)
      setPrintDayWorked(data[0].days_worked)
      setPrintClient(data[0].client)
      setPrintAmount(data[0].amount)
      setPrintJobNumber(data[0].job_number)
      setPrintExpensePDF(data[0].expenses)
      setTestingAgain(printExpensePDF.map((expense) => expense))
      setName(user.name)
      setAddress(user.address)
      setsocial(user.social_security)
      setEmail(user.email)
      setBank(user.bank)
      setRoute(user.routing)
      setChecking(user.account)
      console.log(user.account)
      console.log(user)
      setIsLoading(!isLoading)
    
    })
  }, [])

let expensesList
let expenseTotal
let expenseAndRate
  if (user){
   expensesList = printExpensePDF.map((expense) => expense.amount)
   expenseTotal = expensesList.reduce(function(a, b) {
      return a + b
  }, 0)
  expenseAndRate = expenseTotal + printAmount
  } 


  console.log(expenseTotal)
  if (isLoading) {
    return <p>"Working"</p>
  }
  else {
    return (currentUser && <>
      <PDFViewer  height="860px" width="1920px"
  marginleft="1000px">
      <PdfDocument name={name} email={email} expenseAndRate={expenseAndRate} expenseTotal={expenseTotal} address={address} bank={bank} checking={checking} route={route} social={social}expensesList={expensesList} currentUser={currentUser} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>
      </PDFViewer>
      {/* <PDFViewer>
      <PdfDocument/>
      </PDFViewer> */}

      {/* <button><PDFDownloadLink document={<PdfDocument expensesList={expensesList} currentUser={currentUser} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>} fileName="pdftest.pdf">
       {({ blob, url, loading, error }) => (loading ? "loading" : "download")} 
     </PDFDownloadLink></button> */}
    </>)
  }

  // return (

  //   currentUser && <div>
  //     {/* <PDFViewer>
  //     <PdfDocument currentUser={currentUser} testing={testing} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>
  //     </PDFViewer> */}
  //     <PDFViewer>
  //     <PdfDocument/>
  //     </PDFViewer>

  //     <PDFDownloadLink document={<PdfDocument currentUser={currentUser} testing={testing} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>} fileName="pdftest.pdf">
  //      {({ blob, url, loading, error }) => (loading ? "loading" : "download")} 
  //    </PDFDownloadLink>
  //   </div>
  // );
}
export default WholePdf;
