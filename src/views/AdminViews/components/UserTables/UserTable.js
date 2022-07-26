import React, { useEffect, useState } from "react";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CSmartTable } from "@coreui/react-pro";
import userApi from "../../../../api/UserApi";
import Select from "react-select";
import {
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import categoryApi from "../../../../api/categoryApi";

//
const UserTable = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const [users, setUsers] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  async function loadUsers() {
    try {
      const param = {};
      const response = await userApi.getAll(param);
      setUsers(response);
    } catch (e) {
      alert(e.message);
    }
  }
  const fetchCategoryList = async () => {
    try {
      const params = {};
      await categoryApi.getAllRoot(params).then((list) =>
        list.map((category) =>
          categoryList.push({
            value: category.rootCategoryId,
            label: category.type,
          })
        )
      );
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    fetchCategoryList();
  }, []);
  //
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const columns = [
    {
      key: "index",
      label: "Thứ tự",
      filter: false,
      sorter: false,
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "email",
      label: "Email",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "role",
      label: "Vai trò",
      _style: { width: "10%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "specializeNavigation",
      label: "Chuyên môn",
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },

    {
      key: "show_details",
      label: "Thêm",
      _style: { width: "5%" },
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
  const updateUser = async (email, specialize) => {
    try {
      const params = { email: email, specialize: specialize };
      console.log(params);
      const response = await userApi.update(params);
      if (!JSON.stringify(response).includes("error")) {
        setVisibleModal(false);
        setCategoryList([]);
        setDetails(null);
        setIsUpdate(!isUpdate);
      }
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {});
  return (
    <>
      <Modal
        isOpen={visibleModal}
        toggle={() => (
          setVisibleModal(false), setDetails(null), setCategoryList([])
        )}
        className=""
        size="lg"
        style={{ maxWidth: "500px", width: "50%", paddingTop: "15rem" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (
            setVisibleModal(false), setDetails(null), setCategoryList([])
          )}
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
              {details.role.roleId === 3 &&
                (isUpdate ? (
                  <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                    <Col md="3">
                      <Label>
                        <span className="font-weight-bold">Chuyên môn:</span>
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col md="9">
                      <Select
                        className="mw-100"
                        name="categoryId"
                        // isDisabled={categoryList.length === 0}
                        options={categoryList}
                        placeholder="Chọn chuyên môn"
                        onChange={(option) => setSelectedCategory(option)}
                      />
                      <span className="text-danger h6"></span>
                    </Col>
                  </FormGroup>
                ) : (
                  <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                    <Col md="3">
                      <Label>
                        <span className="font-weight-bold">Chuyên môn:</span>
                        <span className="text-danger">*</span>
                      </Label>
                    </Col>
                    <Col md="9">
                      {details.accountInfo.specializeNavigation
                        ? details.accountInfo.specializeNavigation.type
                        : "Không có"}{" "}
                      <icon
                        className="fa fa-pencil"
                        onClick={() => setIsUpdate(true)}
                      ></icon>
                      <span className="text-danger h6"></span>
                    </Col>
                  </FormGroup>
                ))}
            </ModalBody>
            {details.role.roleId === 3 && (
              <ModalFooter>
                <Button
                  color="info"
                  onClick={() =>
                    updateUser(details.email, selectedCategory.value)
                  }
                >
                  Cập nhật
                </Button>
              </ModalFooter>
            )}
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
          activePage={1}
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
            specializeNavigation: (item) => {
              return item.accountInfo.specializeNavigation ? (
                <td className="py-2">
                  <span className="badge badge-success">
                    {item.accountInfo.specializeNavigation.type}
                  </span>
                </td>
              ) : (
                <td className="">
                  <span></span>
                </td>
              );
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
          // tableProps={{
          //   hover: true,
          // }}
        />
      )}
    </>
  );
};

export default UserTable;
