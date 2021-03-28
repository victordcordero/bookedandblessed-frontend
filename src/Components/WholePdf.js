import React from "react";
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
function WholePdf() {

  return (
    <div>
      <PDFViewer>
        <PdfDocument />
      </PDFViewer>

      <PDFDownloadLink document={<PdfDocument />} fileName="pdftest.pdf">
        {({ blob, url, loading, error }) => (loading ? "loading" : "download")}
      </PDFDownloadLink>
    </div>
  );
}
export default WholePdf;
