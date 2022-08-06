import React, { useEffect, useState } from "react";
import Header from "../components/MyTaskComponents/layouts/Header/Header";
import OptionMenu from "../components/MyTaskComponents/layouts/OptionMenu/OptionMenu";
import TasksView from "../components/MyTaskComponents/layouts/TasksView/TasksView";
import {
  Container,
  Details,
  Wrapper,
} from "../components/MyTaskComponents/MyTaskStyle";
import moment from "moment";
import "moment/locale/vi";
import taskApi from "../../../../api/TaskApi";
import { toast } from "react-toastify";
const MyTask = () => {
  const [selectedOption, setSelectedOption] = useState(1);
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
      message: `Công việc trong tuần`,
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
      icon: "fa fa-check",
    },
    {
      id: 6,
      message: `Đã hoàn thành`,
      icon: "fa fa-check",
    },
  ];
  const user_info = localStorage.getItem("user_info");

  const loadAllTasks = async () => {
    try {
      const params = {
        EditorID:
          JSON.parse(user_info) !== null
            ? JSON.parse(user_info).accountId
            : null,
        status: "",
      };
      const params2 = {
        EditorID:
          JSON.parse(user_info) !== null
            ? JSON.parse(user_info).accountId
            : null,
        status: 2,
      };
      const params3 = {
        EditorID:
          JSON.parse(user_info) !== null
            ? JSON.parse(user_info).accountId
            : null,
        status: 5,
      };
      const params4 = {
        EditorID:
          JSON.parse(user_info) !== null
            ? JSON.parse(user_info).accountId
            : null,
        status: 3,
      };
      const params5 = {
        EditorID:
          JSON.parse(user_info) !== null
            ? JSON.parse(user_info).accountId
            : null,
        status: 4,
      };
      const response = await taskApi.getAllByIdAndStatus(params);
      const response2 = await taskApi.getAllByIdAndStatus(params2);
      const response3 = await taskApi.getAllByIdAndStatus(params3);
      const response4 = await taskApi.getAllByIdAndStatus(params4);
      const response5 = await taskApi.getAllByIdAndStatus(params5);
      localStorage.setItem("task1", response.length);
      localStorage.setItem(
        "task2",
        response.filter((task) => moment(task.deadLineTime).isBefore()).length
      );
      localStorage.setItem(
        "task3",
        response2.filter(
          (task) =>
            moment
              .duration(moment(task.deadLineTime).diff(moment()))
              .asDays() <= 7
        ).length
      );
      localStorage.setItem("task4", response3.length);
      localStorage.setItem("task5", response4.length);
      localStorage.setItem("task6", response5.length);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 5000);
  }, []);
  useEffect(() => {
    loadAllTasks();
  }, [temp]);
  useEffect(() => {
    setSelectedOption(1);
    loadAllTasks();
  }, []);
  return (
    <Container>
      <OptionMenu setSelectedOption={setSelectedOption} />
      <Wrapper>
        {allOptions.map(
          (option) =>
            option.id === selectedOption && (
              <Details>
                <Header title={option.message} />
                <TasksView id={option.id} />
              </Details>
            )
        )}
      </Wrapper>
    </Container>
  );
};
export default MyTask;
