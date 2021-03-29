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

const styles = StyleSheet.create({
  page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: '100%',
      orientation: 'portrait',
  },
  view: {
      width: '100%',
      height: '100%',
      padding: 0,
      backgroundColor: 'white',
  },
  image: {
      objectFit: 'cover',
  },
});
function PDF({currentUser, testing, printRate, printDayWorked, printClient, printAmount, printJobNumber }) {
 
  return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Invoice</Text>
          </View>
          <View style={styles.section}>
            <Text>Rate: {printJobNumber}</Text>
          </View>
          <View style={styles.section}>
            <Text>Rate: {printRate}</Text>
          </View>
          <View style={styles.section}>
            <Text>Days Worked: {printDayWorked}</Text>
          </View>
          <View style={styles.section}>
            <Text>Days Worked: {printDayWorked}</Text>
          </View>
          <View style={styles.section}>
            <Text>Client: {printClient}</Text>
          </View>
          <View style={styles.section}>
            <Text>Client: {printAmount}</Text>
          </View>
        </Page>
      </Document>
  
  );
}

export default PDF;
