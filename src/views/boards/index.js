/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BoardTitle } from "./components/BoardTitle";
import { BoardModal } from "./components/BoardModal";
import { toast } from "react-toastify";
import boardApi from "../../api/boardApi";
import { Card, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { DeleteModal } from "./components/DeleteModal";
import { RenameModal } from "./components/RenameModal";
const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [bgColors, setBgColors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalRenameVisible, setModalRenameVisible] = useState(false);
  const [settings, setSettings] = useState("None");
  const [deleteId, setDeleteId] = useState(null);
  const [renameId, setRenameId] = useState(null);
  const randomColor = (id) => {
    if (!bgColors.find((item) => item.name === id)) {
      bgColors.push({
        name: id,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        color2: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }
  };
  const fetchBoards = async () => {
    try {
      const params = {};
      const response = await boardApi.getAll(params);
      response.map((board) => randomColor(board.boardId));
      setBoards(response);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const addBoard = async (board) => {
    try {
      const response = await boardApi.addBoard(board);
      if (!JSON.stringify(response).includes("error")) {
        toast.success("Tạo thành công");
        fetchBoards();
      }
    } catch (e) {
      toast.error(e.message);
    }
    setModalVisible(false);
  };
  const deleteBoard = async (boardId) => {
    try {
      const response = await boardApi.deleteBoard(boardId);
      if (!JSON.stringify(response).includes("error")) {
        toast.success("Xóa thành công");
        setDeleteId(null);
        fetchBoards();
      }
    } catch (e) {
      toast.error(e.message);
    }
    setModalDeleteVisible(false);
  };
  const renameBoard = async (boardId) => {
    try {
      const response = await boardApi.renameBoard(boardId);
      if (!JSON.stringify(response).includes("error")) {
        toast.success("Sửa thành công");
        setRenameId(null);
        fetchBoards();
      }
    } catch (e) {
      toast.error(e.message);
    }
    setModalRenameVisible(false);
  };
  const handleBoardRename = (boardId) => {
    setModalRenameVisible(!modalRenameVisible);
    setRenameId(boardId);
  };
  const handleBoardDelete = (boardId) => {
    setModalDeleteVisible(!modalDeleteVisible);
    setDeleteId(boardId);
  };
  useEffect(() => {
    // setLoading(true);
    fetchBoards();
  }, []);
  // const starredBoards = boards.filter((board) => board.starred);
  return (
    <Row className="">
      <Col lg="12" className="">
        <Card className="rounded" style={{ height: "70vh" }}>
          <Card.Body className="">
            <div>
              <div className="mb-3 font-weight-bold h5 d-flex justify-content-between align-items-center">
                <div>
                  <i className="fa fa-light fa-star mr-2" /> Tất cả bảng công
                  việc
                  {"  "}
                  <OverlayTrigger
                    trigger={["click"]}
                    placement="right"
                    rootClose
                    data-trigger="focus"
                    // onExit={() => setSettings("None")}
                    overlay={
                      <Popover id="popover-contained">
                        <Popover.Header className="font-weight-bold border-bottom h4">
                          Tùy chỉnh
                        </Popover.Header>
                        <Popover.Body>
                          <div
                            style={{ cursor: "pointer" }}
                            className="setting-option h5 mb-2"
                            onClick={() => setSettings("Renamed")}
                          >
                            Sửa
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            className="setting-option h5 text-danger"
                            onClick={() => setSettings("Delete")}
                          >
                            Xóa
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <i
                      className="fa fa-solid fa-wrench"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </OverlayTrigger>
                </div>
                {(settings === "Delete" || settings === "Renamed") && (
                  <div onClick={() => setSettings("None")}>
                    <p className="btn btn-outline-primary float-right">
                      <i className="fa fa-light fa-check mr-2" /> Hoàn thành
                    </p>
                  </div>
                )}
              </div>
              {settings === "Renamed" ? (
                <div className="row px-1">
                  {boards.length !== 0 &&
                    boards
                      .filter((board) => board.isDelete === false)
                      .map((board) => (
                        <div className="col-3 mb-2 board">
                          <BoardTitle
                            key={board.boardId}
                            title={board.boardName}
                            date={board.createTime}
                            managerId={board.managerId}
                            addition={false}
                            settingType={settings}
                            handleBoardClick={() =>
                              handleBoardRename(board.boardId)
                            }
                          />
                        </div>
                      ))}
                </div>
              ) : settings === "Delete" ? (
                <div className="row px-1">
                  {boards.length !== 0 &&
                    boards
                      .filter((board) => board.isDelete === false)
                      .map((board) => (
                        <div className="col-3 mb-2 board">
                          <BoardTitle
                            key={board.boardId}
                            title={board.boardName}
                            date={board.createTime}
                            managerId={board.managerId}
                            addition={false}
                            settingType={settings}
                            handleBoardClick={() =>
                              handleBoardDelete(board.boardId)
                            }
                          />
                        </div>
                      ))}
                </div>
              ) : (
                <div className="row px-1">
                  {boards.length !== 0 &&
                    boards
                      .filter((board) => board.isDelete === false)
                      .map((board) => (
                        <div className="col-3 mb-2 board">
                          <BoardTitle
                            key={board.boardId}
                            title={board.boardName}
                            date={board.createTime}
                            managerId={board.managerId}
                            addition={false}
                            settingType={settings}
                            bgColors={bgColors.filter(
                              (color) => color.name === board.boardId
                            )}
                            handleBoardClick={() =>
                              (window.location.href = `tasks?id=${board.boardId}`)
                            }
                          />
                        </div>
                      ))}
                  <div className="col-3 mb-2">
                    <BoardTitle
                      title="Tạo thêm bảng"
                      addition={true}
                      handleBoardClick={() => setModalVisible(!modalVisible)}
                    />
                  </div>
                </div>
              )}
              <BoardModal
                action={addBoard}
                closeModal={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
              />
              <DeleteModal
                action={deleteBoard}
                id={deleteId}
                closeModal={() => setModalDeleteVisible(!modalDeleteVisible)}
                visible={modalDeleteVisible}
              />
              <RenameModal
                action={renameBoard}
                id={renameId}
                closeModal={() => setModalRenameVisible(!modalRenameVisible)}
                visible={modalRenameVisible}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default Boards;
