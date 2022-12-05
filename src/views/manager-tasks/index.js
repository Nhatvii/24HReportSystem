/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DraggableTask from "./components/EditorManagerTaskComponents/DragableTask";
import taskApi from "../../api/TaskApi";
import reportApi from "../../api/reportApi";
import moment from "moment";
import "moment/locale/vi";
import { toast } from "react-toastify";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Badge, Label } from "reactstrap";
import userApi from "../../api/UserApi";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import Select from "react-select";
import sendNotifyAPI from "../../api/SendNotificationAPI";

const DragDropContextContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
`;
const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;
const shortcuts = {
  Today: moment(),
  Yesterday: moment().subtract(1, "days"),
  Clear: "",
};
const statusList = ["New", "Pending", "Review", "Finish", "UnFinished"];
export const columns = [
  {
    key: "index",
    label: "STT",
    filter: false,
    sorter: false,
    _style: { width: "2%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "location",
    label: "Vị trí",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "description",
    label: "Nội dung",
    _style: { width: "20%" },
    _props: { className: "fw-semibold" },
  },
  {
    key: "show_details",
    label: "Chi tiết",
    _style: { width: "10%" },
    filter: false,
    sorter: false,
    _props: { className: "fw-semibold" },
  },
];
function Tasks(props) {
  const search = props.location.search;
  const urlParams = new URLSearchParams(search);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [task, setTask] = useState();
  const [editors, setEditors] = useState([]);
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [time, setTime] = useState(moment());
  const [temp, setTemp] = useState(0);
  const id = urlParams.get("id");
  // load tasks
  const loadTask = async () => {
    try {
      const params = { BoardId: id };
      const response = await taskApi.getAll(params);
      setTasks(
        response
          .filter((e) => (e.posts.length > 0 && e.posts[0].status) !== "Public")
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
    task.reportTasks.map(async (task) => {
      const params2 = { reportID: task.reportId, editorID: "" };
      await reportApi.updateReportEditor(params2);
    });
    const response = await taskApi.updateStatus(params);
    if (!JSON.stringify(response).includes("error")) {
      toast.success("Không tạo tại task");
      loadTask();
    } else {
      loadTask();
    }
  };
  const sendNotify = async (token) => {
    try {
      const params = {
        data: {
          title: "Thông báo",
          body: "Bạn có 1 công việc mới.",
        },
        to: token,
      };
      const response = await sendNotifyAPI.sendNotify(params);
      console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const resetTask = async () => {
    // Tạo mới task
    try {
      const params = {
        editorId: selected.value,
        deadLineTime: time.format("YYYY-MM-DD HH:mm:ss"),
        description: description,
        reportId: task.reportTasks.map((report) => report.reportId),
        boardId: task.boardId,
        subTaskId: task.taskId,
      };
      const response = await taskApi.create(params);
      if (JSON.stringify(response).includes("taskId")) {
        // Bỏ task vào chưa xong
        const params = {
          taskId: task.taskId,
          status: 5,
          postId: task.posts[0].postId,
        };
        const response = await taskApi.updateStatus(params);
        if (!JSON.stringify(response).includes("error")) {
          toast.success("Tạo lại task thành công");
          sendNotify(selected.tokenId);
          setShowReset(false);
          setEditors([]);
          setSelected("");
          setDescription("");
          setTimeout(moment());
          setShow(false);
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
          setTask(response);
          setShow(true);
        }
      } else {
        await taskApi.updateStatus(params);
      }
      loadTask();
    } catch (e) {
      toast.error(e.message);
    }
  };
  async function loadEditors() {
    try {
      const params = { roleId: 3 };
      const response = await userApi.getByRole(params);
      response.map((editor) => {
        editors.push({
          tokenId: editor.tokenId === null ? null : editor.tokenId,
          specializeNavigation:
            editor.specializeNavigation === undefined
              ? "Không có"
              : editor.specializeNavigation,
          workLoad: editor.workLoad,
          value: editor.accountId,
          label: (
            <div className="d-flex justify-content-between">
              <span>
                {editor.accountInfo ? editor.accountInfo.fullname : "Không có"}
              </span>
              <div>
                <Badge pill color="danger" style={{ paddingTop: "4px" }}>
                  Task đang làm: {editor.workLoad}
                </Badge>
                <Badge pill color="success" style={{ paddingTop: "4px" }}>
                  Chuyên môn:{" "}
                  {editor.specializeNavigation === null
                    ? "Không có"
                    : editor.specializeNavigation.type === null
                    ? "Không có"
                    : editor.specializeNavigation.type}
                </Badge>
              </div>
            </div>
          ),
        });
      });
    } catch (e) {
      toast.error(e.message);
    }
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseReset = () => {
    setShowReset(false);
    setEditors([]);
  };
  const handleMoment = (moment) => {
    setTime(moment);
  };
  const handleAbort = () => {
    setShow(false);
    abortTask();
  };
  const handleReset = () => {
    setShowReset(true);
    loadEditors();
  };
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };
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
        scrollable={true}
        show={show}
        onHide={handleClose}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chú ý</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <span className="font-weight-bold h5">
            Bạn có muốn tạo lại task này?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="warning" onClick={() => handleAbort()}>
            Không cần
          </Button>
          <Button variant="primary" onClick={() => handleReset()}>
            Tạo lại
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Reset */}
      <Modal show={showReset} onHide={handleCloseReset} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tạo lại công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <Row>
            <Col md={12}>
              <Row>
                <Col md="2">
                  <Label for="file">
                    <b>
                      Miêu tả công việc:
                      <span style={{ color: "red" }}>*</span>
                    </b>{" "}
                  </Label>
                </Col>
                <Col md="9">
                  <div className="row pl-3">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                      onChange={(e) => handleTextChange(e)}
                    >
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <Label for="file">
                    <b>
                      Biên tập viên:<span style={{ color: "red" }}>*</span>
                    </b>{" "}
                  </Label>
                </Col>
                <Col md="9">
                  <Select
                    name="editorId"
                    // isDisabled={editors.length !== 0}
                    styles={{
                      // Fixes the overlapping problem of the component
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    options={editors}
                    onChange={(option) => setSelected(option)}
                    placeholder="Chọn Biên tập viên công việc"
                    defaultValue={selected}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <Label for="file">
                    <b>
                      Chọn deadline:<span style={{ color: "red" }}>*</span>
                    </b>{" "}
                  </Label>
                </Col>
                <Col md="10">
                  <DatetimePickerTrigger
                    shortcuts={shortcuts}
                    moment={time}
                    onChange={handleMoment}
                    minDate={moment()}
                  >
                    <Row>
                      <Col md="6">
                        <input
                          className="pt-1 pb-1"
                          type="text"
                          value={time.format("YYYY-MM-DD HH:mm")}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </DatetimePickerTrigger>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReset}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => resetTask()}>
            Tạo lại
          </Button>
        </Modal.Footer>
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
