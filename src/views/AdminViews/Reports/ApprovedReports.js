import React, { Component } from "react";
import ApprovedReportTable from "../components/ReportTables/ApprovedReportTable";

class NewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <ApprovedReportTable />
      </div>
    );
  }
}

export default NewReports;
