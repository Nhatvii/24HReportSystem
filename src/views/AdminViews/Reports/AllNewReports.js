import React, { Component } from "react";
import AllNewReportTable from "../components/ReportTables/AllNewReportTable";

class AllNewReports extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-5">
        <AllNewReportTable />
      </div>
    );
  }
}

export default AllNewReports;
