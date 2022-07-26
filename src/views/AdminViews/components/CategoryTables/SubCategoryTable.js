import React, { useEffect, useState } from "react";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CSmartTable } from "@coreui/react-pro";
import Select from "react-select";
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
const SubCategoryTable = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [deletedCategory, setDeletedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isTypeUpdate, setIsTypeUpdate] = useState(false);
  const [isRootUpdate, setIsRootUpdate] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [updateType, setUpdateType] = useState("");
  //
  async function loadCategory() {
    try {
      const params = {};
      const response = await categoryApi.getAllRoot(params);
      response.map((item) =>
        categoryList.push({
          value: item.rootCategoryId,
          label: item.type,
        })
      );
    } catch (e) {
      alert(e.message);
    }
  }
  const handleTypeChange = (e) => {
    setUpdateType(e.target.value);
  };
  async function updateCategory(id, type, root) {
    setIsLoading2(true);
    console.log(selected);
    try {
      const params = {
        categoryId: id,
        subCategory: updateType === "" ? type : updateType,
        rootCategory: selected === null ? root : selected.value,
      };
      console.log(params);
      const response = await categoryApi.updateSub(params);
      if (response.statusCode === 200) {
        setIsLoading2(false);
        setVisibleModal(false);
        setUpdateType("");
        setIsTypeUpdate(false);
        setIsRootUpdate(false);
        setCategoryList([]);
      }
    } catch (e) {
      alert(e.message);
    }
  }
  const toggle = () => {
    setModal(!modal);
  };
  async function loadCategories() {
    try {
      const param = {};
      const response = await categoryApi.getAllSub(param);
      setCategories(response);
    } catch (e) {
      alert(e.message);
    }
  }
  async function deleteCategory(id) {
    setIsLoading(true);
    try {
      const params = { id: id };
      console.log(id);
      const response = await categoryApi.deleteSub(params);
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
  }, []);
  //
  const [details, setDetails] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const columns = [
    {
      key: "categoryId",
      label: "ID",
      _style: { width: "5%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "subCategory",
      label: "Tên danh mục phụ",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "rootCategoryNavigation",
      label: "Tên danh mục gốc",
      _style: { width: "20%" },
      _props: { className: "fw-semibold" },
    },
    {
      key: "show_details",
      label: "Options",
      _style: { width: "5%" },
      filter: false,
      sorter: false,
      _props: { className: "fw-semibold" },
    },
  ];

  const toggleDetails = async (id) => {
    loadCategory();
    setVisibleModal(!visibleModal);
    try {
      const param = { rootCategoryId: id };
      const response = await categoryApi.getByIdSub(param);
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
          setVisibleModal(false),
          setDetails(null),
          setIsTypeUpdate(false),
          setIsRootUpdate(false),
          setCategoryList([])
        )}
        className=""
        size="lg"
        style={{ maxWidth: "800px", width: "80%" }}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => (setVisibleModal(false), setDetails(null))}
        >
          Chi tiết danh mục phụ
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
                <Col md="9">{details.categoryId}</Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="location">
                    <b>Tên danh mục phụ: </b>
                  </Label>
                </Col>
                <Col md="8">
                  {isTypeUpdate ? (
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      placeholder="Nhập tên danh mục mới"
                      onChange={(e) => handleTypeChange(e)}
                    ></Input>
                  ) : (
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      disabled
                      value={details.subCategory}
                    ></Input>
                  )}
                </Col>
                <Col md="1">
                  <Button onClick={() => setIsTypeUpdate(!isTypeUpdate)}>
                    <i class="fa fa-edit"></i>
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="location">
                    <b>Danh mục gốc: </b>
                  </Label>
                </Col>
                <Col md="8">
                  {isRootUpdate ? (
                    <div className="row pl-3">
                      <Select
                        name="category"
                        isDisabled={categoryList.length === null}
                        options={categoryList}
                        onChange={(option) => setSelected(option)}
                        placeholder="Chọn danh mục gốc"
                        defaultValue={selected}
                      />
                    </div>
                  ) : (
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      disabled
                      value={details.rootCategoryNavigation.type}
                    ></Input>
                  )}
                </Col>
                <Col md="1">
                  <Button onClick={() => setIsRootUpdate(!isRootUpdate)}>
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
                    updateCategory(
                      details.categoryId,
                      details.subCategory,
                      details.rootCategoryNavigation.rootCategoryId
                    )
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
            categoryId: (item) => {
              return <td className="py-2">{item._id + 1}</td>;
            },
            rootCategoryNavigation: (item) => {
              return (
                <td className="py-2">{item.rootCategoryNavigation.type}</td>
              );
            },
            show_details: (item) => {
              return (
                <td className="py-2">
                  <Row>
                    <Button onClick={() => toggleDetails(item.categoryId)}>
                      Chi tiết
                    </Button>
                    <Button
                      onClick={() => (
                        toggle(), setDeletedCategory(item.categoryId)
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

export default SubCategoryTable;
