import React, { Component } from "react";
import PendingReportTable from "../components/ReportTables/PendingReportTable";

class NewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <PendingReportTable />
      </div>
    );
  }
}

export default NewReports;
