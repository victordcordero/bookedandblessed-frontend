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
const styles = StyleSheet.create({
  page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: '100%',
      orientation: 'landscape',
      size: "letter",
  },
  view: {
    size: "letter",
      width: '100%',
      height: '100%',
      padding: 0,
      backgroundColor: 'white',
  },
  image: {
      objectFit: '100%',
  },
});
function PDF({ address, email, expenseAndRate, expenseTotal, social, name, route, bank, checking, currentUser, printRate, printDayWorked, printClient, printAmount, printJobNumber}) {
 

  return (
    
      <Document>
        <Page size="A4" >
        <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
        <View style={{ color: 'black', textAlign: 'center', margin: 30, fontWeight: 600, fontSize: "24"}}>
            <Text>Invoice: {printJobNumber}</Text>
            </View>
            <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
            <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12",}}>
            <Text>From: {name}</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Address: {address}</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Social Security: {social}</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Email: {email}</Text>
          </View>
          <View style={{ color: 'white', textAlign: 'left', padding: "10px", fontSize: "12"}}>
            <Text></Text>
          </View>
          <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontWeight: "100", fontSize: "12"}}>
            <Text>Job Number: {printJobNumber}</Text>
          </View>
          <View class="bold_text" style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Client: {printJobNumber}</Text>
          </View>
          <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
          
          <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Rate: {printRate} dollars per day</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Days Worked: {printDayWorked} days</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Expenses: {expenseTotal} dollars</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Total: {expenseAndRate} dollars</Text>
          </View>
          <View style={{ color: 'white', textAlign: 'left', padding: "10px", fontSize: "12"}}>
            <Text></Text>
          </View>
          <View style={{ color: 'white', textAlign: 'left', padding: "10px"}}>
            <Text></Text>
          </View>
         
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Payment Details</Text>
          </View>
          <View style={{ color: 'black', textAlign: 'left', padding: "5px", fontSize: "12"}}>
            <Text>Please make all checks payable to Victor Cordero, {bank} Bank account number #{route}, routing number: #{checking}</Text>
          </View>
        </Page>
      </Document>
  
  );
}

export default PDF;
