import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import sosApi from "../../api/sosApi";
import { Markup } from "interweave";
import { createReportList, sendSOSList, createPostList } from "./data";
import reportApi from "../../api/reportApi";
import postApi from "../../api/postApi";
import taskApi from "../../api/TaskApi";
import boardApi from "../../api/boardApi";
import userApi from "../../api/UserApi";

const Scripts = () => {
  const messagesEndRef = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("Đang chờ lệnh");
  const [result, setResult] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editorIdList, setEditorIdList] = useState([]);
  const [responseSOS, setReponseSOS] = useState([]);
  const [lastestBoard, setLastestBoard] = useState("");
  const [activeOfficerNumber, setActiveOfficerNumber] = useState(0);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
    getActiveOfficer();
  });
  const clearConsole = () => {
    setResult([]);
  };
  useEffect(() => {
    loadLastestBoard();
    getActiveOfficer();
  }, []);
  const getActiveOfficer = async () => {
    try {
      const params = {};
      const response = await userApi.getActiveOfficer(params);
      setActiveOfficerNumber(response.length);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const loadLastestBoard = async () => {
    try {
      const params = {};
      const response = await boardApi.getAll(params);
      setLastestBoard(
        response
          .filter((e) => e.isDelete === false)
          .sort((a, b) => new moment(b.createTime) - new moment(a.createTime))
          .slice(0, 1)[0].boardId
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const loadAllTasks = async () => {
    setEditorIdList([]);
    try {
      const params = {
        status: "1",
        boardId: lastestBoard,
      };
      const response = await taskApi.getAllByStatusAndBoard(params);
      response.length > 0
        ? response
            .sort((a, b) => new moment(b.createTime) - new moment(a.createTime))
            .slice(0, 10)
            .map((e) =>
              setResult((result) => [
                ...result,
                {
                  message:
                    "Lấy công việc mới với ID:<b className='text-black'>" +
                    e.taskId +
                    "</b> do <b>" +
                    e.editorId +
                    "</b>đảm nhận",
                },
              ])
            )
        : setResult((result) => [
            ...result,
            {
              message: "Không tìm thấy công việc mới trong bảng mới nhất.",
            },
          ]);
      response.length > 0
        ? response
            .sort((a, b) => new moment(b.createTime) - new moment(a.createTime))
            .slice(0, 10)
            .map((e) =>
              setEditorIdList((result) => [
                ...result,
                {
                  userId: e.editorId,
                },
              ])
            )
        : setResult((result) => [
            ...result,
            {
              message: "Không tìm thấy công việc mới trong bảng mới nhất.",
            },
          ]);
      setTasks(response);

      response.length > 0 ? (
        setResult((result) => [
          ...result,
          {
            message: "<b>Hoàn thành</b>",
          },
        ])
      ) : (
        <></>
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  const createReport = async () => {
    setIsLoading(true);
    setTitle("Đang tạo 10 báo cáo...");
    for await (let report of createReportList) {
      setResult((result) => [
        ...result,
        {
          message: "Đang tạo báo cáo ",
        },
      ]);
      try {
        const params = { report };
        const response = await reportApi.send(params.report);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Tạo báo cáo thành công. Công việc được tạo trong bảng <b className='text-black'>" +
                lastestBoard +
                "</b>",
            },
          ]);
        }
        if (!JSON.stringify(response).includes("200")) {
          setResult((result) => [
            ...result,
            {
              message: "Tạo báo cáo thất bại.",
            },
          ]);
        }
      } catch (e) {
        toast.error("Tạo báo cáo thất bại.");
      }
    }
    setResult((result) => [
      ...result,
      {
        message: "<b>Hoàn thành <i class='fa fa-solid fa-thumbs-up'></i></b>",
      },
    ]);
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  const createPost = async () => {
    setIsLoading(true);
    setTitle("Đang tạo 10 bài viết...");
    for await (let post of createPostList.reverse()) {
      console.log(createPostList.indexOf(post));
      setResult((result) => [
        ...result,
        {
          message: "Đang tạo bài viết ",
        },
      ]);
      try {
        const params = { post };
        const response = await postApi.create({
          ...params.post,
          userID: editorIdList[createPostList.indexOf(post)].userId,
        });
        console.log(response);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message: "Tạo Bài viết thành công .",
            },
          ]);
          const params2 = {
            taskId: tasks[createPostList.reverse().indexOf(post)].taskId,
            status: 3,
            postId: response,
          };
          console.log(params2);
          await taskApi.updateStatus(params2);
        }
      } catch (e) {
        toast.error("Tạo bài viết thất bại.");
      }
    }
    setResult((result) => [
      ...result,
      {
        message: "<b>Hoàn thành <i class='fa fa-solid fa-thumbs-up'></i></b>",
      },
    ]);
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  const sendSOS = async () => {
    setIsLoading(true);
    setReponseSOS([]);
    setTitle("Đang gửi 5 tín hiệu SOS");
    for await (let sos of sendSOSList) {
      setResult((result) => [
        ...result,
        {
          message:
            "Gửi SOS với accountID: <b className='text-black'>" +
            sos.accountId +
            "</b>",
        },
      ]);
      try {
        const params = { sos };
        const response = await sosApi.sendSOS(params);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi SOS thành công với accountID: <b className='text-black'>" +
                sos.accountId +
                "</b>",
            },
          ]);
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi thành công đến <b className='text-black'>" +
                response.officeName +
                "</b> tại địa chỉ <b className='text-black'>" +
                response.district +
                "</b>. Cộng tác viên <b className='text-green'>" +
                response.officerName +
                "</b> với số điện thoại <b className='text-black'>" +
                response.officerPhoneNumber +
                "</b> sẽ đảm nhận.",
            },
          ]);
          setResult((result) => [
            ...result,
            {
              message:
                "------------------------------------------------------------------------------------------------",
            },
          ]);
          setReponseSOS((responseSOS) => [
            ...responseSOS,
            {
              notifyId: response.notifyId,
              officerId: response.officerId,
              executeTime: "20 phút",
              sumaryContent: "[Test] Demo",
            },
          ]);
        }
        if (!JSON.stringify(response).includes("notifyId")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi SOS thất bại với accountID: <b className='text-danger'>" +
                sos.accountId +
                "</b>",
            },
          ]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  const completeSOS = async () => {
    setIsLoading(true);
    setTitle("Hoàn thành 5 tín hiệu SOS");
    for await (let sos of responseSOS) {
      setResult((result) => [
        ...result,
        {
          message:
            "Hoàn thành SOS với ID: <b className='text-black'>" +
            sos.notifyId +
            "</b>",
        },
      ]);
      try {
        const params = { sos };
        const response = await sosApi.completeSOS(params);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Hoàn thành SOS thành công với ID: <b className='text-black'>" +
                sos.notifyId +
                "</b>",
            },
          ]);
        }
        if (JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Hoàn thành SOS thất bại với ID: <b className='text-danger'>" +
                sos.notifyId +
                "</b>",
            },
          ]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  return (
    <Row className="">
      <Col lg="12" className="">
        <Card className="rounded" style={{ height: "80vh" }}>
          <Card.Body className="">
            <Row>
              <Col lg="4">
                <div className="mb-3 font-weight-bold h6 d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fa fa-light fa-terminal mr-2" /> Script Demo
                    tạo bài viết
                  </div>
                </div>
                <Row className="pr-2 mb-2">
                  <Button onClick={createReport} disabled={isLoading}>
                    Test tạo 10 báo cáo
                  </Button>
                </Row>
                <Row className="pr-2 mb-2">
                  <Button onClick={loadAllTasks} disabled={isLoading}>
                    Nhận 10 công việc mới
                  </Button>
                </Row>
                <Row className="pr-2 mb-2">
                  <Button onClick={createPost} disabled={isLoading}>
                    Test tạo 10 bài viết
                  </Button>
                </Row>
                <div className="mb-3 font-weight-bold h6 d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fa fa-light fa-terminal mr-2" /> Script Demo
                    SOS. Đang có{" "}
                    <b className="text-success">{activeOfficerNumber}</b> người
                    hỗ trợ đang hoạt động
                  </div>
                </div>
                <Row className="pr-2 mb-2">
                  <Button onClick={sendSOS} disabled={isLoading}>
                    Test gửi 5 SOS
                  </Button>
                </Row>
                <Row className="pr-2 mb-2">
                  <Button
                    onClick={completeSOS}
                    disabled={isLoading || responseSOS.length === 0}
                  >
                    Test hoàn tất SOS
                  </Button>
                </Row>
              </Col>
              <Col lg="8">
                <Card
                  text={"dark"}
                  className="rounded"
                  style={{
                    height: "70vh",
                    backgroundColor: "rgb(227 224 224)",
                  }}
                >
                  <Card.Header
                    className="mb-3 font-weight-bold h5 d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: "rgb(227 224 224)",
                      fontWeight: "bold",
                      padding: "0.5rem 1.5rem",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <span>
                      Trạng thái: <span className="text-success">{title}</span>
                    </span>
                    <Button
                      onClick={clearConsole}
                      style={{ backgroundColor: "red", borderColor: "red" }}
                      disabled={result.length === 0 || isLoading === true}
                    >
                      Dọn sạch
                    </Button>
                  </Card.Header>
                  <Card.Body
                    className=""
                    style={{
                      maxHeight: "calc(100vh - 210px)",
                      overflowY: "auto",
                    }}
                  >
                    {result.length > 0 &&
                      result.map((r) => (
                        <Row>
                          <span>
                            <i className="fa fa-solid fa-check text-success" />{" "}
                            {moment().format("YYYY/MM/DD HH:mm:ss")}{" "}
                            <i className="fa fa-solid fa-caret-right" />{" "}
                            <Markup
                              content={r.message}
                              allowAttributes
                              allowElements
                            />
                          </span>
                        </Row>
                      ))}
                    {isLoading && (
                      <Row>
                        <span>
                          <Spinner
                            animation="border"
                            role="status"
                            size="sm"
                          ></Spinner>{" "}
                          {moment().format("YYYY/MM/DD HH:mm:ss")}{" "}
                          <i className="fa fa-solid fa-caret-right" /> Đang
                          chạy...
                        </span>
                      </Row>
                    )}
                    <div ref={messagesEndRef} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Scripts;
