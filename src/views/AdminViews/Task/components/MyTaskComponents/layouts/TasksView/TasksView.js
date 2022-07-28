import React, { useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import {
  TasksContainer,
  SingleTask,
  TaskTitle,
  TaskPriority,
  TaskDate,
  Checkbox,
  DeadlineDate,
} from "./TasksViewStyles";
import taskApi from "../../../../../../../api/TaskApi";
import { useEffect } from "react";
import DetailsModal from "../DetailsModal/DetailsModal";

const TasksView = (props) => {
  const [openModal, setOpenModal] = useState({ ifOpen: false, id: "" });
  //Mở ra là đang làm
  const handleOpenModal = async (id, status) => {
    setOpenModal({ ifOpen: true, id: id });
    if (status === "New") {
      try {
        const params = {
          taskId: id,
          status: 2,
        };
        console.log(params);
        await taskApi.updateStatus(params);
        loadAllTasks(props.id);
      } catch (e) {
        alert(e.message);
      }
    }
  };
  const makeColors = (remainingTime) => {
    switch (true) {
      case remainingTime < 0:
        return "black";
      case remainingTime < 1:
        return "red";
      case remainingTime < 7:
        return "orange";
      case remainingTime < 14:
        return "yellow";
      case remainingTime > 14:
        return "green";
      default:
        return "gray";
    }
  };
  const setPriority = (remainingTime) => {
    switch (true) {
      case remainingTime < 0:
        return "Ưu tiên cực cao";
      case remainingTime < 1:
        return "Ưu tiên cao";
      case remainingTime < 7:
        return "Ưu tiên trung bình";
      case remainingTime < 14:
        return "Ưu tiên thấp";
      case remainingTime > 14:
        return "Ưu tiên cực thấp";
      default:
        return "Còn lâu";
    }
  };
  const [tasks, setTasks] = useState([]);
  const user_info = localStorage.getItem("user_info");
  const loadAllTasks = async (selected) => {
    try {
      var params = {};
      if (selected === 1 || selected === 2 || selected === 3) {
        params = {
          EditorID:
            JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
          status: "",
        };
      } else if (selected === 4) {
        params = {
          EditorID:
            JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
          status: 5,
        };
      } else if (selected === 5) {
        params = {
          EditorID:
            JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
          status: 3,
        };
      } else if (selected === 6) {
        params = {
          EditorID:
            JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
          status: 4,
        };
      } else {
        params = {
          EditorID:
            JSON.parse(user_info) !== null ? JSON.parse(user_info).email : null,
          status: 2,
        };
      }
      const response = await taskApi.getAllByIdAndStatus(params);
      setTasks(
        selected === 2
          ? response.filter((task) => moment(task.deadLineTime).isBefore())
          : selected === 3
          ? response.filter(
              (task) =>
                moment
                  .duration(moment(task.deadLineTime).diff(moment()))
                  .asDays() <= 7
            )
          : response
              .sort(
                (a, b) => new moment(a.createTime) - new moment(b.createTime)
              )
              .reverse()
      );
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    loadAllTasks(props.id);
  }, []);
  const getTask = tasks.map((task) => (
    <SingleTask
      key={task.taskId}
      role="button"
      onClick={() => handleOpenModal(task.taskId, task.status)}
    >
      <TaskTitle
        taskFinish={
          task.status === "Finish" || task.status === "UnFinished"
            ? "line-through"
            : task.status === "Review"
            ? "line-through black"
            : "none"
        }
        onClick={() => handleOpenModal(task.taskId, task.status)}
      >
        {task.description}
      </TaskTitle>
      <TaskPriority
        priorityColour={makeColors(
          moment.duration(moment(task.deadLineTime).diff(moment())).asDays()
        )}
      >
        <span />
        <span>
          {setPriority(
            moment.duration(moment(task.deadLineTime).diff(moment())).asDays()
          )}
        </span>
      </TaskPriority>
      <TaskDate style={{ textTransform: "capitalize" }}>
        {moment(task.createTime).format("dddd, MMMM Do YYYY, h:mm:ss")}
      </TaskDate>
      <DeadlineDate style={{ textTransform: "capitalize" }}>
        {moment(task.deadLineTime).format("dddd, MMMM Do YYYY, h:mm:ss")}
      </DeadlineDate>
      {task.status === "New" && (
        <span className="text-info float-right mr-5 font-weight-bold">Mới</span>
      )}
      {task.status === "Review" && (
        <span className="text-warning float-right mr-5 font-weight-bold">
          Đang xem xét
        </span>
      )}
      {task.status === "Finish" && (
        <span className="text-success float-right mr-5 font-weight-bold">
          Đã hoàn thành
        </span>
      )}
      {task.status === "UnFinished" && (
        <span className="text-danger float-right mr-5 font-weight-bold">
          Trễ deadline
        </span>
      )}
      {task.status === "Pending" && (
        <span className="text-primary float-right mr-5 font-weight-bold">
          Chưa hoàn thành
        </span>
      )}
    </SingleTask>
  ));
  return (
    <>
      <SingleTask key="0">
        <b>Tiêu đề</b>
        <b>Mức ưu tiên</b>
        <b>Ngày tạo</b>
        <b>Ngày kết thúc</b>
        <b>Status</b>
      </SingleTask>
      <DetailsModal
        tasks={tasks}
        setOpenModal={setOpenModal}
        openModal={openModal}
        loadAllTasks={loadAllTasks}
        id={props.id}
      />
      <TasksContainer>
        {getTask.length > 0 ? (
          getTask
        ) : (
          <div className="ml-100 justify-content-center mt-5">
            <div className="d-flex justify-content-center">
              <img
                src="https://i.pinimg.com/originals/d0/c6/04/d0c60459431b6ffaecf92fc902ca996d.gif"
                width={400}
                height={400}
                className="rounded-circle"
              />
            </div>
            <b className="h3 text-primary d-flex justify-content-center pb-5 pt-2">
              Không có task nào trong mục này
            </b>
          </div>
        )}
      </TasksContainer>
    </>
  );
};

export default TasksView;
