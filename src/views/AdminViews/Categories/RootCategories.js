import React, { useState } from "react";
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
import RootCategoryTable from "../components/CategoryTables/RootCategoryTable";

const RootCategories = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rootCategoryType, setRootCategoryType] = useState("");
  const toggle = () => {
    setModal(!modal);
  };
  const handleInputChange = (e) => {
    setRootCategoryType(e.target.value);
  };
  const createRootCategory = async () => {
    setIsLoading(true);
    try {
      const params = { rootType: rootCategoryType };
      const response = await categoryApi.addRoot(params);
      if (response.statusCode === 200) {
        setIsLoading(false);
        setModal(!modal);
      }
    } catch (e) {
      alert(e.message);
    }
  };

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
                <b>Tên danh mục gốc </b>{" "}
              </Label>
            </Col>
            <Col md="9">
              <Input
                type="text"
                name="type"
                id="type"
                value={rootCategoryType}
                onChange={(e) => handleInputChange(e)}
                placeholder="Tên danh mục"
              ></Input>
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
            <Button color="primary" onClick={() => createRootCategory()}>
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
        <b>Tạo danh mục gốc</b>
      </Button>
      <RootCategoryTable />
    </div>
  );
};

export default RootCategories;
