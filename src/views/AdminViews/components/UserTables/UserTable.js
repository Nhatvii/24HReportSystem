import React, { useEffect, useState } from "react";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CSmartTable } from "@coreui/react-pro";
import userApi from "../../../../api/UserApi";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

//
const UserTable = () => {
  const [users, setUsers] = useState();
  async function loadUsers() {
    try {
      const param = {};
      const response = await userApi.getAll(param);
      setUsers(response);
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  //
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const columns = [
    {
      key: "index",
      filter: false,
      sorter: false,
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "email",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "role",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },

    {
      key: "show_details",
      label: "Options",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
      _props: { className: "fw-semibold" },
    },
  ];

  const toggleDetails = async (email) => {
    setVisibleModal(!visibleModal);
    try {
      const param = { email: email };
      const response = await userApi.getByEmail(param);
      setDetails(response);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {});
  return (
    <>
      <Modal
        isOpen={visibleModal}
        toggle={() => (setVisibleModal(false), setDetails(null))}
        className=""
        size="lg"
        style={{ maxWidth: "500px", width: "50%" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (setVisibleModal(false), setDetails(null))}
        >
          Chi tiết người dùng
        </ModalHeader>
        {details !== null ? (
          <>
            <ModalBody>
              <b>Email: </b>
              {details.email}
              <br />
              <b>Password: </b>
              {details.password}
              <br />
              <b>Role: </b>
              {details.role.roleName}
            </ModalBody>
          </>
        ) : (
          <Row className="d-flex justify-content-center">
            <div class="spinner-border text-primary mb-5 mt-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </Row>
        )}
      </Modal>
      {users !== null && (
        <CSmartTable
          noItemsLabel="Không có dữ liệu..."
          draggable
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          items={users}
          itemsPerPageSelect
          itemsPerPage={10}
          pagination
          scopedColumns={{
            index: (item) => {
              return <td className="py-2">{item._id + 1}</td>;
            },

            role: (item) => {
              switch (item.role.roleName) {
                case "User":
                  return (
                    <td className="py-2">
                      <span className="badge badge-primary">User</span>
                    </td>
                  );
                case "Staff":
                  return (
                    <td className="py-2">
                      <span className="badge badge-secondary">Staff</span>
                    </td>
                  );
                case "Editor":
                  return (
                    <td className="py-2">
                      <span className="badge badge-danger">Editor</span>
                    </td>
                  );
                case "Editor Manager":
                  return (
                    <td className="py-2">
                      <span className="badge badge-info">Editor Manager</span>
                    </td>
                  );
                case "Admin":
                  return (
                    <td className="py-2">
                      <span className="badge badge-warning">Admin</span>
                    </td>
                  );
                default:
                  return (
                    <td className="py-2">
                      <span className="badge badge-light">Not found</span>
                    </td>
                  );
              }
            },
            show_details: (item) => {
              return (
                <td className="py-2">
                  <Button onClick={() => toggleDetails(item.email)}>
                    Chi tiết
                  </Button>
                </td>
              );
            },
          }}
          tableFilter
          tableProps={{
            hover: true,
          }}
        />
      )}
    </>
  );
};

export default UserTable;
