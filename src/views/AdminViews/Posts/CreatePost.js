import { CFormTextarea } from "@coreui/react-pro";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import styled from "styled-components";
import categoryApi from "../../../api/categoryApi";
import postApi from "../../../api/postApi";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase/firebaseConfig";
import BreadCrumb from "../../../components/BreadCrumb";
import FontAwesome from "../../../components/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import moment from "moment";
import { Comments } from "../../UserViews/Post/components/Comments";
import { Markup } from "interweave";
export const ImgUpload = styled.div`
  flex-direction: row;
  text-align: center;
  margin: 10px;
  background-image: ${(props) =>
    props.preview === "5moreVideo"
      ? "url(https://img.freepik.com/premium-vector/video-media-film-production-line-art-vector-icon-multimedia-movie-directing_654297-125.jpg?w=2000)"
      : props.preview === "5moreImg"
      ? "url(http://cdn.onlinewebfonts.com/svg/img_562621.png)"
      : props.preview
      ? `url(${props.preview})`
      : "url(https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg)"};
  min-height: 200px;
  min-width: 200px;
  border-radius: 5px;
  background-repeat: repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 5px;
  margin-left: 1.5rem;
`;
export const UploadContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const CreatePost = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [visiblePreviewModal, setVisiblePreviewModal] = useState(false);
  //upload
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [img, setImg] = useState(null);
  const [errorImgMessage, setErrorImgMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorSubTitle, setErrorSubTitle] = useState("");
  const [errorSelectedCategory, setErrorSelectedCategory] = useState("");

  //
  // const user_info = localStorage.getItem("user_info");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link"],
      ["image"],
      ["video"], // remove formatting button
    ],
  };
  const handleEditor = (editor) => {
    console.log("background", editor);
    console.log(editor);
    setText(editor);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubTitleChange = (event) => {
    setSubTitle(event.target.value);
  };
  const fetchCategoryList = async () => {
    try {
      const params = {};
      await categoryApi.getAllSub(params).then((list) =>
        list.map((category) =>
          categoryList.push({
            value: category.categoryId,
            label: category.subCategory,
          })
        )
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  //file upload
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    // setImg(base64);
    setImg(file);
  };
  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  //Gửi post
  const handleSubmit = async () => {
    var valid = true;
    if (title === "") {
      setErrorTitle("Chưa có tiêu đề");
      valid = false;
    }
    if (subTitle === "") {
      setErrorSubTitle("Chưa có tóm tắt");
      valid = false;
    }
    if (selectedCategory === "") {
      setErrorSelectedCategory("Chưa có thể loại");
      valid = false;
    }
    if (text === "") {
      setErrorText("Chưa có nội dung");
      valid = false;
    }
    if (img === null) {
      setErrorImgMessage("Không có ảnh bìa");
      valid = false;
    }
    if (valid === true) {
      const storageRef = ref(storage, `/img/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //
        },
        (err) => console.log(err),
        async () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            try {
              const userID = localStorage.getItem("user_info");
              const params = {
                userID: JSON.parse(userID).email,
                title: title,
                subTitle: subTitle,
                categoryId: selectedCategory.value,
                description: text,
                image: url,
                video: "string",
              };
              const response = await postApi.create(params);
              if (response.statusCode === 200) {
                toast.success("Tạo thành công");
              } else {
                toast.error(response.message);
              }
            } catch (e) {
              toast.error(e.message);
            }
          });
        }
      );
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      <Modal
        size="lg"
        style={{
          minWidth: "100vw",
          width: "100%",
          marginTop: 0,
        }}
        fullScreen
        isOpen={visiblePreviewModal}
        toggle={() => setVisiblePreviewModal(false)}
        onClosed={() => setVisiblePreviewModal(false)}
      >
        <ModalHeader
          className="bg-primary"
          toggle={() => setVisiblePreviewModal(false)}
        >
          Bản xem thử
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#F7F7F7" }}>
          {/* Nội dung xem trước */}
          <div className="archives post post1">
            <Fragment>
              <BreadCrumb className="shadow5" title="Bài viết" />
              <span className="space-30" />
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-8 m-auto">
                    <div className="row">
                      <div className="col-6 align-self-center">
                        <div className="page_category">
                          <h4>{selectedCategory.label}</h4>
                        </div>
                      </div>
                      <div className="col-6 text-right">
                        <div className="page_comments">
                          <ul className="inline">
                            <li>
                              <FontAwesome name="thumbs-up" />1
                            </li>
                            <li>
                              <FontAwesome name="comment" />1
                            </li>
                            <li>
                              <FontAwesome name="share" />1
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="space-30" />
                    <div className="single_post_heading">
                      <h1>{title}</h1>
                      <div className="space-10" />
                      <p>{subTitle}</p>
                    </div>
                    <div className="space-40" />
                    <img
                      src={preview}
                      alt="thumb"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        display: "inline-block",
                      }}
                      class="img-responsive"
                    />
                    <div className="space-20" />
                    <div className="row">
                      <div className="col-lg-6 align-self-center">
                        <div className="author">
                          <div className="author_img">
                            <div className="author_img_wrap">
                              <img
                                src="https://picsum.photos/50/50"
                                alt="author"
                              />
                            </div>
                          </div>
                          <Link to="#">
                            {
                              JSON.parse(localStorage.getItem("user_info"))
                                .accountInfo.username
                            }
                          </Link>
                          <ul>
                            <li>
                              <Link to="#">
                                {moment().format("DD ,D MM YYYY")}
                              </Link>
                            </li>
                            <li>
                              {"cập nhật lần cuối " +
                                moment()
                                  .format("dddd, Do MM YYYY")
                                  .toLocaleUpperCase()}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="space-20" />
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      <Markup content={text} />
                    </div>
                    <div className="space-40" />
                    <div className="border_black" />
                    {/* Comment like share */}
                    <Comments className="comments" />
                    <div className="space-60" />
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </ModalBody>
      </Modal>
      <div className="animated fadeIn pl-3 pr-3 pt-2 pb-3">
        <Row className="ml-2 mr-2">
          <Col md={5}>
            <Card
              className="mt-1 ml-1 mr-1 pt-1 pr-1 pl-1 pb-1"
              style={{ height: "55rem" }}
            >
              <CardTitle className="ml-3 pt-2 mt-2 pr-1 pl-1">
                <span className="font-weight-bold h5">Thông tin bài viết</span>{" "}
              </CardTitle>
              <CardBody>
                <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                  <Col md="2">
                    <Label>
                      Tiêu đề:<span className="text-danger">*</span>
                    </Label>
                  </Col>
                  <Col md="10">
                    <Input
                      className="input-lg col-md-12"
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Tiêu đề bài viết..."
                    />
                    <span className="text-danger h6">{errorTitle}</span>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                  <Col md="2">
                    <Label>
                      Tóm tắt:<span className="text-danger">*</span>
                    </Label>
                  </Col>
                  <Col md="10">
                    <CFormTextarea
                      rows="3"
                      className="input-lg col-md-12"
                      type="text"
                      id="subTitle"
                      value={subTitle}
                      onChange={handleSubTitleChange}
                      placeholder="Tóm tắt bài viết..."
                    />
                    <span className="text-danger h6">{errorSubTitle}</span>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                  <Col md="2">
                    <Label>
                      Thể loại:<span className="text-danger">*</span>
                    </Label>
                  </Col>
                  <Col md="10">
                    <Select
                      className="mw-100"
                      name="categoryId"
                      // isDisabled={categoryList.length === 0}
                      options={categoryList}
                      placeholder="Chọn thể loại"
                      onChange={(option) => setSelectedCategory(option)}
                    />
                    <span className="text-danger h6">
                      {errorSelectedCategory}
                    </span>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-2 mb-2 pt-3 pb-3">
                  <Col md="2">
                    <Label>
                      Ảnh cover:<span className="text-danger">*</span>
                    </Label>
                  </Col>
                  <Col md="10">
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      multiple="false"
                      onChange={(e) => onSelectFile(e)}
                    />
                    <span className="text-danger h6">{errorImgMessage}</span>
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-1 mb-1 pt-1 pb-1">
                  <div class="center">
                    {preview !== null && (
                      <FormGroup>
                        <UploadContainer>
                          <ImgUpload preview={preview} />
                        </UploadContainer>
                      </FormGroup>
                    )}
                  </div>
                </FormGroup>

                <Row className="float-right mr-1">
                  <Button
                    style={{
                      background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                      color: "white",
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Tạo post
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={7}>
            <Card
              className="mt-1 ml-1 mr-1 pt-1 pr-1 pl-1 pb-1"
              style={{ height: "55rem" }}
            >
              <CardTitle className="ml-3 pt-2 mt-2 pr-1 pl-1">
                <b>
                  <span className="h5"> Nội dung bài viết</span>{" "}
                  <span className="text-danger">*</span>{" "}
                  <span className="text-danger h6">{errorText}</span>
                </b>
                <Button
                  className="float-right mr-4"
                  style={{
                    background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                    color: "white",
                  }}
                  onClick={() => setVisiblePreviewModal(true)}
                >
                  Xem trước
                </Button>
              </CardTitle>
              <CardBody>
                <FormGroup>
                  <ReactQuill
                    value={text}
                    onChange={handleEditor}
                    modules={modules}
                    style={{
                      height: "43rem",
                      marginBottom:
                        window.innerWidth < 505
                          ? "7rem"
                          : 505 < window.innerWidth && window.innerWidth < 650
                          ? "6rem"
                          : 650 < window.innerWidth && window.innerWidth < 1250
                          ? "4rem"
                          : "2rem",
                    }}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreatePost;
