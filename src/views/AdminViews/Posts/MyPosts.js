import React, { Component } from "react";
import EditorPostTable from "../components/PostTables/EditorPostTable";

class MyPosts extends Component {
  render() {
    return (
      <div className="animated fadeIn pl-3 pr-3 pt-2">
        <EditorPostTable/>
      </div>
    );
  }
}

export default MyPosts;
