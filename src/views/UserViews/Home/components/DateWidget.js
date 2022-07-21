import React, { Component } from "react";
import moment from "moment";
import "moment/locale/vi";
class DateWidget extends Component {
  constructor() {
    super();

    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.state = {
      currentTime: time,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleString(),
      });
    }, 1000);
  }
  render() {
    return (
      <div style={{ textAlign: "right", textTransform: "capitalize" }}>
        <i className="icon-clock" />{" "}
        {moment(this.state.currentTime).format("dddd, Do MMMM YYYY, h:mm:ss")}
      </div>
    );
  }
}
export default DateWidget;
