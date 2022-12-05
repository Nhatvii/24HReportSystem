import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
export const RenameModal = (props) => {
  const { closeModal, action, visible } = props;
  const [boardTitle, setBoardTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const isEmptyText = (text) => !text || !text.trim();

  const handleCreateBoard = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (isEmptyText(boardTitle)) {
      return;
    }
    await action({
      boardName: boardTitle,
      boardId: props.id,
    });
    setBoardTitle("");
    setLoading(false);
  };

  return (
    <Modal
      isOpen={visible}
      toggle={closeModal}
      className=""
      size="lg"
      style={{ maxWidth: "400px", width: "40%", paddingTop: "15rem" }}
    >
      <ModalHeader className="bg-warning" toggle={closeModal}>
        <h5 style={{ color: "white" }}>Sửa tên bảng</h5>
      </ModalHeader>
      <ModalBody>
        <form className="w-100" onSubmit={(event) => handleCreateBoard(event)}>
          <Input
            className="mb-3"
            placeholder="Tên bảng"
            onChange={(event) => setBoardTitle(event.target.value)}
            value={boardTitle}
          />
          <div className="d-flex justify-content-center">
            <Button
              color="warning"
              onClick={(event) => handleCreateBoard(event)}
              loading={loading}
              disabled={isEmptyText(boardTitle)}
            >
              Sửa
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

RenameModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
