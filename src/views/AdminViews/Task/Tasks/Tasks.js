import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableTask from "../components/EditorManagerTaskComponents/DragableTask";
import taskApi from "../../../../api/TaskApi";
import moment from "moment";
import "moment/locale/vi";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import reportApi from "../../../../api/reportApi";
import { toast } from "react-toastify";
const DragDropContextContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
`;
const statusList = ["New", "Pending", "Review", "Finish", "UnFinished"];

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const search = props.location.search;
  const urlParams = new URLSearchParams(search);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = urlParams.get("id");
  // load tasks
  const loadTask = async () => {
    try {
      const params = { BoardId: id };
      const response = await taskApi.getAll(params);
      setTasks(
        response
          .sort((a, b) => new moment(a.createTime) - new moment(b.createTime))
          .reverse()
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const abortTask = async () => {
    //bỏ task
    const params = {
      taskId: task.taskId,
      status: 5,
      postId: task.posts[0].postId,
    };
    task.reportTasks.map(async (report) => {
      const params2 = { reportID: report.reportId, editorID: "" };
      await reportApi.updateReportEditor(params2);
    });
    const response = await taskApi.updateStatus(params);
    if (!JSON.stringify(response).includes("error")) {
      console.log("Không tạo tại task");
      loadTask();
    } else {
      loadTask();
    }
  };
  const resetTask = async () => {
    // Tạo mới task
    setIsLoading(true);
    try {
      const params = {
        editorId: task.editorId,
        deadLineTime:
          moment
            .duration(moment(task.deadLineTime).diff(moment()))
            .asSeconds() < -1
            ? moment(task.deadLineTime, "DD-MM-YYYY").add("DD-MM-YYYY", 7)
            : task.deadLineTime,
        description: task.description,
        reportId: task.reportTasks.map((report) => report.reportId),
        boardId: task.boardId,
      };
      const response = await taskApi.create(params);
      if (JSON.stringify(response).includes("taskId")) {
        setVisibleModal(false);
        setIsLoading(false);
        // Bỏ task vào chưa xong
        const params = {
          taskId: task.taskId,
          status: 5,
          postId: task.posts[0].postId,
        };
        const response = await taskApi.updateStatus(params);
        if (!JSON.stringify(response).includes("error")) {
          console.log("Bỏ task");
        }
        loadTask();
      } else {
        loadTask();
        toast.error("Tạo lại thất bại");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    try {
      const params = {
        taskId: result.draggableId,
        status:
          result.destination.droppableId === "New"
            ? 1
            : result.destination.droppableId === "Pending"
            ? 2
            : result.destination.droppableId === "Review"
            ? 3
            : result.destination.droppableId === "Finish"
            ? 4
            : result.destination.droppableId === "UnFinished"
            ? 5
            : null,
        postId:
          tasks
            .filter((task) => task.taskId === result.draggableId)
            .map((task) => task)[0].posts.length !== 0
            ? tasks
                .filter((task) => task.taskId === result.draggableId)
                .map((task) => task)[0].posts[0].postId
            : null,
      };
      if (result.destination.droppableId === "UnFinished") {
        const params = { id: result.draggableId };
        const response = await taskApi.getById(params);
        if (!JSON.stringify(response).includes("error")) {
          setVisibleModal(true);
          setTask(response);
        }
      } else {
        await taskApi.updateStatus(params);
      }
      loadTask();
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
    loadTask();
  }, [temp]);
  return (
    <>
      <Modal
        isOpen={visibleModal}
        toggle={() => (setVisibleModal(false), setIsLoading(false), setTask())}
        className=""
        size="lg"
        style={{ maxWidth: "400px", width: "40%", paddingTop: "15rem" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (
            setVisibleModal(false), setIsLoading(false), setTask()
          )}
        >
          Tạo công việc
        </ModalHeader>
        <>
          <ModalBody>
            <span className="font-weight-bold h5">
              Bạn có muốn tạo lại task này?
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => (
                setVisibleModal(false), setIsLoading(false), abortTask()
              )}
              class="font-weight-bold "
            >
              Không cần
            </Button>
            {!isLoading ? (
              <Button
                color="info"
                onClick={() => resetTask()}
                class="font-weight-bold"
              >
                Tạo lại công việc
              </Button>
            ) : (
              <Button class="font-weight-bold">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Đang tạo lại công việc
              </Button>
            )}
          </ModalFooter>
        </>
      </Modal>
      <DragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {statusList.map((listKey) => (
              <DraggableTask
                loadTask={loadTask}
                id={id}
                tasks={tasks}
                key={listKey}
                prefix={listKey}
              />
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </>
  );
}

export default Tasks;
