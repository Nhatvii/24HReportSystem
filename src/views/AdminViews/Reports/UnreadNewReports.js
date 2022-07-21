import React, { Component } from "react";
import UnreadNewReportTable from "../components/ReportTables/UnreadNewReportTable";

class UnreadNewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <UnreadNewReportTable/>
      </div>
    );
  }
}

export default UnreadNewReports;