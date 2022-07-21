import React, { Component } from "react";
import ReadNewReportTable from "../components/ReportTables/ReadNewReportTable";

class ReadNewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <ReadNewReportTable/>
      </div>
    );
  }
}

export default ReadNewReports;