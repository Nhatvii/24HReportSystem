import React, { Component } from "react";
import DeniedReportTable from "../components/ReportTables/DeniedReportTable";

class NewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <DeniedReportTable />
      </div>
    );
  }
}

export default NewReports;
