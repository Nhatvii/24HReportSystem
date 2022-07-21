import React, { useEffect } from "react";
import { Option, Options } from "../../MyTaskStyle";
const OptionMenu = (props) => {
  const allOptions = [
    {
      id: 1,
      message: `Tất cả`,
      icon: "fa fa-list",
    },
    {
      id: 2,
      message: `Công việc chưa xong`,
      icon: "fa fa-angellist",
    },
    {
      id: 3,
      message: `Trong tuần`,
      icon: "fa fa-list-alt",
    },
    {
      id: 4,
      message: `Đã quá hạn`,
      icon: "fa fa-hourglass",
    },
    {
      id: 5,
      message: `Đang xem xét`,
      icon: "fa fa-hourglass",
    },
    {
      id: 6,
      message: `Đã hoàn thành`,
      icon: "fa fa-check",
    },
  ];
  return (
    <Options>
      {allOptions.map((option) => (
        <Option onClick={() => props.setSelectedOption(option.id)}>
          <i className={option.icon} /> <span>{option.message}</span>{" "}
          <span id="number">
            {option.id === 1
              ? localStorage.getItem("task1")
              : option.id === 2
              ? localStorage.getItem("task2")
              : option.id === 3
              ? localStorage.getItem("task3")
              : option.id === 4
              ? localStorage.getItem("task4")
              : option.id === 5
              ? localStorage.getItem("task5")
              : option.id === 6
              ? localStorage.getItem("task6")
              : 0}
          </span>
        </Option>
      ))}
    </Options>
  );
};

export default OptionMenu;
