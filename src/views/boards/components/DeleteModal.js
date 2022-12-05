import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
export const DeleteModal = (props) => {
  const { closeModal, action, visible, id } = props;
  const [loading, setLoading] = useState(false);

  const handleDeleteBoard = async (event) => {
    setLoading(true);
    event.preventDefault();
    await action({
      boardId: id,
    });
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
      <ModalHeader className="bg-danger" toggle={closeModal}>
        <h5 style={{ color: "white" }}>Xóa bảng công việc</h5>
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">Bạn có chắc muốn xóa bảng này?</div>
        <form className="w-100" onSubmit={(event) => handleDeleteBoard(event)}>
          <div className="d-flex justify-content-center">
            {!loading ? (
              <Button
                color="danger"
                onClick={(event) => handleDeleteBoard(event)}
                loading={loading}
              >
                Xóa
              </Button>
            ) : (
              <Button color="danger" disabled>
                Đang xóa ...
              </Button>
            )}
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
