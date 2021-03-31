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
      orientation: 'portrait',
      size: "A4",
  },
  view: {
    size: "A4",
      width: '100%',
      height: '100%',
      padding: 0,
      backgroundColor: 'white',
  },
  image: {
      objectFit: '100%',
  },
});
function PDF({ currentUser, printRate, printDayWorked, printClient, printAmount, printJobNumber}) {
 

  return (
    
      <Document>
        <Page size="A4" >
          <View >
            <Text>Invoice {printJobNumber}</Text>
          </View>
          <View >
            <Text>Rate: {printRate}</Text>
          </View>
          <View >
            <Text>Days Worked: {printDayWorked}</Text>
          </View>
          <View >
            <Text>Client: {printClient}</Text>
          </View>
          {/* <View >
            <Text>Expenses: {expensesList}</Text>
          </View> */}
          <View >
            <Text>Total: {printAmount}</Text>
          </View>
        </Page>
      </Document>
  
  );
}

export default PDF;
