import React, { Component } from "react";
import PublishedPostTable from "../components/PostTables/PublishedPostTable";

class PublishedPosts extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-2">
        <PublishedPostTable/>
      </div>
    );
  }
}

export default PublishedPosts;