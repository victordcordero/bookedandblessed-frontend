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
import PdfDocument from './Pdf'

// Create styles

// Create Document Component
function WholePdf({currentUser}) {
  const [printInvoicePDF, setPrintInvoicePDF] = useState(null)
  const [printExpensePDF, setPrintExpensePDF] = useState([])
  const [testing, setTesting] = useState("working")
  const [printRate, setPrintRate] = useState("")
  const [printDayWorked, setPrintDayWorked] = useState("")
  const [printClient, setPrintClient] = useState("")
  const [printAmount, setPrintAmount] = useState("")
  const [printJobNumber, setPrintJobNumber] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/invoices/1`)
    .then(response => response.json())
    .then(data => {
      setPrintInvoicePDF(data[0])
      setPrintRate(data[0].rate)
      setPrintDayWorked(data[0].days_worked)
      setPrintClient(data[0].client)
      setPrintAmount(data[0].amount)
      setPrintJobNumber(data[0].job_number)
      setPrintExpensePDF(data[0].expenses)
    })
  }, [])

  return (
    currentUser && <div>
      <PDFViewer>
        <PdfDocument currentUser={currentUser} testing={testing} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>
      </PDFViewer>

      <PDFDownloadLink document={<PdfDocument currentUser={currentUser} testing={testing} printRate={printRate} printDayWorked={printDayWorked} printClient={printClient} printAmount={printAmount} printJobNumber={printJobNumber}/>} fileName="pdftest.pdf">
        {({ blob, url, loading, error }) => (loading ? "loading" : "download")}
      </PDFDownloadLink>
    </div>
  );
}
export default WholePdf;
