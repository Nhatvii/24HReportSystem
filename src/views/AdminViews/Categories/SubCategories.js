import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import categoryApi from "../../../api/categoryApi";
import SubCategoryTable from "../components/CategoryTables/SubCategoryTable";

const SubCategories = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategoryType, setSubCategoryType] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selected, setSelected] = useState();
  const toggle = () => {
    setModal(!modal);
  };
  const handleInputChange = (e) => {
    setSubCategoryType(e.target.value);
  };
  const createSubCategory = async () => {
    setIsLoading(true);
    try {
      const params = {
        subCategory: subCategoryType,
        rootCategoryID: selected.value,
      };
      const response = await categoryApi.addSub(params);
      if (response.statusCode === 200) {
        setIsLoading(false);
        setModal(!modal);
      }
    } catch (e) {
      alert(e.message);
    }
  };
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
  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div className="animated fadeIn pl-3 pr-3 pt-2">
      <Modal
        isOpen={modal}
        toggle={() => toggle()}
        className=""
        size="lg"
        style={{ maxWidth: "800px", width: "80%", paddingTop: "15rem" }}
      >
        <ModalHeader className="bg-primary" toggle={() => toggle()}>
          Tạo danh mục gốc mới
        </ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md="3">
              <Label for="location">
                <b>Tên danh mục phụ </b>{" "}
              </Label>
            </Col>
            <Col md="9">
              <Input
                type="text"
                name="type"
                id="type"
                value={subCategoryType}
                onChange={(e) => handleInputChange(e)}
                placeholder="Tên danh mục phụ"
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>
                <b>Chọn danh mục gốc:</b>
              </Label>
            </Col>
            <Col md="9">
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
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Button color="primary">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Đang Tạo
            </Button>
          ) : (
            <Button color="primary" onClick={() => createSubCategory()}>
              Tạo
            </Button>
          )}
          <Button color="secondary" onClick={() => toggle()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      <Button onClick={() => toggle()} color="primary" className="mb-3">
        <i className="icon-plus"> </i>
        <b>Tạo danh mục phụ</b>
      </Button>
      <SubCategoryTable />
    </div>
  );
};

export default SubCategories;
