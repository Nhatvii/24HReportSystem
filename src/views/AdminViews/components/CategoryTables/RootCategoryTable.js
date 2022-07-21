import React, { useEffect, useState } from "react";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CSmartTable } from "@coreui/react-pro";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import categoryApi from "../../../../api/categoryApi";

//
const RootCategoryTable = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [isTypeUpdate, setIsTypeUpdate] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const handleTypeChange = (e) => {
    setUpdateType(e.target.value);
  };
  async function updateCategory(id, type) {
    setIsLoading2(true);
    try {
      const param = {
        id: id,
        rootType: updateType === null ? type : updateType,
      };
      const response = await categoryApi.updateRoot(param);
      if (response.statusCode === 200) {
        setIsLoading2(false);
        setVisibleModal(false);
        setUpdateType("");
      }
    } catch (e) {
      alert(e.message);
    }
  }
  async function loadCategories() {
    try {
      const param = {};
      const response = await categoryApi.getAllRoot(param);
      setCategories(response);
    } catch (e) {
      alert(e.message);
    }
  }
  async function deleteCategory(id) {
    setIsLoading(true);
    try {
      const params = { id: id };
      const response = await categoryApi.deleteRoot(params);
      if (response.statusCode === 200) {
        setIsLoading(false);
        setModal(!modal);
        setDeletedCategory("");
      }
    } catch (e) {
      alert(e.message);
    }
  }
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  //
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const columns = [
    {
      key: "rootCategoryId",
      label: "ID",
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "type",
      label: "Tên danh mục",
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

  const toggleDetails = async (id) => {
    setVisibleModal(!visibleModal);
    try {
      const param = { rootCategoryId: id };
      const response = await categoryApi.getByIdRoot(param);
      setDetails(response);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {});
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={() => toggle()}
        className=""
        size="lg"
        style={{ maxWidth: "800px", width: "80%", paddingTop: "15rem" }}
      >
        <ModalHeader className="bg-danger" toggle={() => toggle()}>
          Bạn chắc không?
        </ModalHeader>
        <ModalBody>Xóa danh mục ID: {deletedCategory} này?</ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Button color="primary">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Đang Xóa
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={() => deleteCategory(deletedCategory)}
            >
              Xóa
            </Button>
          )}
          <Button color="secondary" onClick={() => toggle()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={visibleModal}
        toggle={() => (
          setVisibleModal(false), setDetails(null), setIsTypeUpdate(false)
        )}
        className=""
        size="lg"
        style={{ maxWidth: "800px", width: "80%" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (setVisibleModal(false), setDetails(null))}
        >
          Chi tiết danh mục gốc
        </ModalHeader>
        {details !== null ? (
          <>
            <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label for="location">
                    <b>ID: </b>{" "}
                  </Label>
                </Col>
                <Col md="9">{details.rootCategoryId}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="location">
                    <b>Tên danh mục: </b>
                  </Label>
                </Col>
                <Col md="8">
                  {isTypeUpdate ? (
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      placeholder="Tên danh mục gốc mới"
                      onChange={(e) => handleTypeChange(e)}
                    ></Input>
                  ) : (
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      disabled
                      value={details.type}
                    ></Input>
                  )}
                </Col>
                <Col md="1">
                  <Button onClick={() => setIsTypeUpdate(!isTypeUpdate)}>
                    <i class="fa fa-edit"></i>
                  </Button>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {isLoading2 ? (
                <Button variant="primary" size="sm">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Đang Cập nhật
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    updateCategory(details.rootCategoryId, details.type)
                  }
                >
                  Cập nhật
                </Button>
              )}
            </ModalFooter>
          </>
        ) : (
          <Row className="d-flex justify-content-center">
            <div class="spinner-border text-primary mb-5 mt-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </Row>
        )}
      </Modal>
      {categories !== null && (
        <CSmartTable
          noItemsLabel="Không có dữ liệu..."
          draggable
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          items={categories}
          itemsPerPageSelect
          itemsPerPage={10}
          pagination
          scopedColumns={{
            rootCategoryId: (item) => {
              return <td className="py-2">{item.rootCategoryId}</td>;
            },
            show_details: (item) => {
              return (
                <td className="py-2">
                  <Row>
                    <Button onClick={() => toggleDetails(item.rootCategoryId)}>
                      Chi tiết
                    </Button>
                    <Button
                      onClick={() => (
                        toggle(), setDeletedCategory(item.rootCategoryId)
                      )}
                      color="danger"
                      className="ml-1"
                    >
                      <icon className="fa fa-trash" />
                    </Button>
                  </Row>
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

export default RootCategoryTable;
