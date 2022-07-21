import React, { Component } from "react";
import UnpublishedPostTable from "../components/PostTables/UnpublishedPost";

class UnPublishedPosts extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-2">
        <UnpublishedPostTable/>
      </div>
    );
  }
}

export default UnPublishedPosts;