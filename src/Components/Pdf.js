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
    size: "",
      width: '100%',
      height: '100%',
      padding: 0,
      backgroundColor: 'white',
  },
  image: {
      objectFit: '100%',
  },
});
function PDF({ currentUser, printRate, printDayWorked, printClient, printAmount, printJobNumber, one}) {
 

  return (
    
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Invoice {printJobNumber}</Text>
          </View>
          <View style={styles.section}>
            <Text>Rate: {printRate}</Text>
          </View>
          <View style={styles.section}>
            <Text>Days Worked: {printDayWorked}</Text>
          </View>
          <View style={styles.section}>
            <Text>Client: {printClient}</Text>
          </View>
          {/* <View style={styles.section}>
            <Text>Expenses: {expensesList}</Text>
          </View> */}
          <View style={styles.section}>
            <Text>Total: {printAmount}</Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text></Text>
          </View>
          <View style={styles.section}>
            <Text>{one ? "Expense:" : null} {one ? one : null}</Text>
          </View>
          <View style={styles.section}>
            <Text>{one ?  null : "Expense:"} {one ? null : one} </Text>
          </View>
          <View style={styles.section}>
            <Text>{one ? "Expense:" : null} {one ? one : null}</Text>
          </View>
          <View style={styles.section}>
            <Text>Client: {printClient}</Text>
          </View>
          {/* <View style={styles.section}>
            <Text>Expenses: {expensesList}</Text>
          </View> */}
          <View style={styles.section}>
            <Text>Total: {printAmount}</Text>
          </View>
        </Page>
      </Document>
  
  );
}

export default PDF;
