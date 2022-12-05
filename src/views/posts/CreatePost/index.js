import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
// img
import categoryApi from "../../../api/categoryApi";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Markup } from "interweave";
import postApi from "../../../api/postApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase/firebaseConfig";
import { v4 as uuid } from "uuid";
import MyTasksTable from "../../tasks/MyTasksTable";
import taskApi from "../../../api/TaskApi";
import sendNotifyAPI from "../../../api/SendNotificationAPI";
const CreatePost = (props) => {
  const search = props.location.search;
  const urlParams = new URLSearchParams(search);
  const taskId = urlParams.get("taskId");
  const [selectedTask, setSelectedTask] = useState(taskId);
  const [show, AccountShow] = useState("Info");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState();
  const [previewVideo, setPreviewVideo] = useState();
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
  const loadCategory = async () => {
    try {
      const params = {};
      const response = await categoryApi
        .getAllSub(params)
        .then((list) =>
          list.filter((e) => e.rootCategory !== null && e.categoryId !== 0)
        );
      setCategories(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubTitleChange = (e) => {
    setSubTitle(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEditor = (editor) => {
    setText(editor);
  };
  const onSelectFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (
      file.name.substring(file.name.lastIndexOf(".") + 1) === "avif" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "jpg" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "jpeg" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "jfif" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "pjpeg" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "pjp" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "png" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "raw" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "tiff" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "psd" ||
      file.name.substring(file.name.lastIndexOf(".") + 1) === "webp"
    ) {
      setImg(file);
    } else {
      setVideo(file);
    }
  };
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const sendNotify = async () => {
    try {
      const params = {
        data: {
          title: "Thông báo",
          body: "Có 1 bài viết cần xem xét.",
        },
        to: "/topics/editor_manager",
      };
      await sendNotifyAPI.sendNotify(params);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleSubmit = async () => {
    const storageRef = ref(storage, `/img/${uuid()}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    const storageRef2 = ref(storage, `/video/${uuid()}`);
    const uploadTask2 = uploadBytesResumable(storageRef2, video);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
      },
      (err) => console.log(err),
      async () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          uploadTask2.on(
            "state_changed",
            (snapshot) => {
              //
            },
            (err) => console.log(err),
            async () =>
              getDownloadURL(uploadTask2.snapshot.ref).then(
                async (urlVideo) => {
                  try {
                    const params = {
                      userID: user_info.accountId,
                      title: title,
                      subTitle: subTitle,
                      categoryId: category,
                      description: text,
                      image: url,
                      video: video ? urlVideo : "null",
                    };
                    // console.log(params);
                    const response = await postApi.create(params);
                    if (!JSON.stringify(response).includes("error")) {
                      // Thành công thì đổi status task -> review
                      const params = {
                        taskId: selectedTask,
                        status: 3,
                        postId: response,
                      };
                      const response2 = await taskApi.updateStatus(params);
                      if (!JSON.stringify(response2).includes("error")) {
                        toast.success("Tạo thành công");
                        window.location.href = "/admin/my-posts";
                        sendNotify();
                      } else {
                        toast.error(response2.message);
                      }
                    }
                  } catch (e) {
                    toast.error(e.message);
                  }
                }
              )
          );
        });
      }
    );
  };
  useEffect(() => {
    if (!categories.length > 0) {
      loadCategory();
    }
  });
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    if (
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "avif" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "jpg" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "jpeg" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "jfif" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "pjpeg" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "pjp" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "png" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "raw" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "tiff" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "psd" ||
      selectedFile.name.substring(selectedFile.name.lastIndexOf(".") + 1) ===
        "webp"
    ) {
      setPreview(objectUrl);
    } else {
      setPreviewVideo(objectUrl);
    }
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  useEffect(() => {
    selectedTask !== null ? AccountShow("Account") : AccountShow("Info");
  }, [selectedTask]);
  return (
    <>
      <div>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Tạo bài viết</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form id="form-wizard1" className="mt-3">
                  <ul id="top-tab-list" className="p-0 row list-inline">
                    <li
                      className={` ${show === "Image" ? " active done" : ""} ${
                        show === "Personal" ? " active done" : ""
                      } ${show === "Account" ? " active done" : ""} ${
                        show === "Info" ? "active" : ""
                      }${
                        selectedTask !== null ? " active done" : ""
                      } col-lg-3 col-md-6 text-start mb-2 active`}
                      id="account"
                    >
                      <Link to="#">
                        <div className="iq-icon me-3">
                          <svg
                            className="svg-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span>Chọn công việc</span>
                      </Link>
                    </li>
                    <li
                      id="personal"
                      className={`${
                        show === "Personal" ? " active done" : ""
                      } ${show === "Image" ? " active done" : ""} ${
                        show === "Account" ? "active " : ""
                      } col-lg-3 col-md-6 mb-2 text-start`}
                    >
                      <Link to="#">
                        <div className="iq-icon me-3">
                          <i className="fa fa-solid fa-pen"></i>
                        </div>
                        <span>Chi tiết bài viết</span>
                      </Link>
                    </li>
                    <li
                      id="payment"
                      className={`${show === "Image" ? " active done" : ""} ${
                        show === "Personal" ? "active" : ""
                      } col-lg-3 col-md-6 mb-2 text-start`}
                    >
                      <Link to="#">
                        <div className="iq-icon me-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <span>Chọn ảnh cover</span>
                      </Link>
                    </li>
                    <li
                      id="confirm"
                      className={`${
                        show === "Image" ? " active " : ""
                      } col-lg-3 col-md-6 mb-2 text-start`}
                    >
                      <Link to="#">
                        <div className="iq-icon me-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span>Xem trước</span>
                      </Link>
                    </li>
                  </ul>
                  <fieldset
                    className={`${show === "Info" ? "d-block" : "d-none"}`}
                  >
                    <div className="form-card text-start">
                      <div className="row">
                        <div className="col-7">
                          <h3 className="mb-4">Chọn công việc</h3>
                        </div>
                      </div>
                    </div>
                    <MyTasksTable
                      isWritePost={true}
                      selectedTaskId={selectedTask}
                      setSelectedTask={setSelectedTask}
                    />
                    {selectedTask ? (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-primary next action-button float-end"
                        value="Next"
                        onClick={() => AccountShow("Account")}
                      >
                        Tiếp theo
                      </button>
                    ) : (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-secondary next action-button float-end"
                        value="Next"
                        disabled
                      >
                        Tiếp theo
                      </button>
                    )}
                  </fieldset>
                  <fieldset
                    className={`${show === "Account" ? "d-block" : "d-none"}`}
                  >
                    <div className="form-card text-start">
                      <div className="row">
                        <div className="col-7">
                          <h3 className="mb-4">Chi tiết bài viết:</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              Tiêu đề: <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              placeholder="Tiêu đề"
                              onChange={(e) => handleTitleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              Phụ đề: <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="subtitle"
                              placeholder="Phụ đề (<300 chữ)"
                              maxLength={300}
                              onChange={(e) => handleSubTitleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              Danh mục: <span className="text-danger">*</span>
                            </label>
                            <Form.Select
                              size="sm"
                              onChange={(e) => handleCategoryChange(e)}
                            >
                              <option>Chọn danh mục</option>
                              {categories.map((category) => (
                                <option value={category.categoryId}>
                                  {category.type}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </div>
                      </div>
                      <Row className="pt-4 mb-4">
                        <ReactQuill
                          value={text}
                          placeholder="Chi tiết báo cáo"
                          onChange={handleEditor}
                          modules={modules}
                          style={{
                            height: "25rem",
                            marginBottom: "3rem",
                          }}
                        />
                      </Row>
                    </div>
                    {title !== "" &&
                    subTitle !== "" &&
                    category !== "" &&
                    category !== "Chọn danh mục" &&
                    text !== "" &&
                    text !== "<p><br></p>" ? (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-primary next action-button float-end"
                        value="Next"
                        onClick={() => AccountShow("Personal")}
                      >
                        Tiếp theo
                      </button>
                    ) : (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-secondary next action-button float-end"
                        value="Next"
                        disabled
                      >
                        Tiếp theo
                      </button>
                    )}
                    <button
                      type="button"
                      name="previous"
                      className="btn btn-danger previous action-button-previous float-end me-1"
                      value="Previous"
                      onClick={() => AccountShow("Info")}
                    >
                      Trở về
                    </button>
                  </fieldset>
                  <fieldset
                    className={`${show === "Personal" ? "d-block" : "d-none"}`}
                  >
                    <div className="form-card text-start">
                      <div className="row">
                        <div className="col-7">
                          <h3 className="mb-4">
                            Chọn ảnh bìa:<b className="text-danger">*</b>
                          </h3>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Chọn ảnh bìa:<b className="text-danger">*</b>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          name="pic"
                          accept="image/*"
                          onChange={(e) => onSelectFile(e)}
                        />
                      </div>
                      {preview && (
                        <img
                          src={preview}
                          alt="preview"
                          width={500}
                          height={300}
                        />
                      )}
                      <div className="row">
                        <div className="col-7">
                          <h3 className="mb-4">Video:</h3>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Đăng video:
                          <span className="text-muted">(Không bắt buộc)</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          name="video"
                          accept="video/*"
                          onChange={(e) => onSelectFile(e)}
                        />
                      </div>

                      {previewVideo && (
                        <iframe
                          title="Preview video"
                          src={previewVideo}
                          alt="previewVideo"
                          width={500}
                          height={300}
                        />
                      )}
                    </div>
                    {preview ? (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-primary next action-button float-end"
                        value="Submit"
                        onClick={() => AccountShow("Image")}
                      >
                        Tiếp theo
                      </button>
                    ) : (
                      <button
                        type="button"
                        name="next"
                        className="btn btn-secondary next action-button float-end"
                        value="Submit"
                        disabled
                      >
                        Tiếp theo
                      </button>
                    )}
                    <button
                      type="button"
                      name="previous"
                      className="btn btn-danger previous action-button-previous float-end me-1"
                      value="Previous"
                      onClick={() => AccountShow("Account")}
                    >
                      Trở về
                    </button>
                  </fieldset>
                  <fieldset
                    className={`${show === "Image" ? "d-block" : "d-none"}`}
                  >
                    <div className="form-card">
                      <p
                        className="mb-4"
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "30px",
                          marginLeft: "25rem",
                          marginRight: "25rem",
                        }}
                      >
                        {title}
                      </p>
                      <p
                        className="mb-4"
                        style={{
                          color: "black",
                          fontSize: "16px",
                          marginLeft: "25rem",
                          marginRight: "25rem",
                        }}
                      >
                        <strong>{subTitle}</strong>
                      </p>

                      <p
                        className="mb-4"
                        style={{
                          color: "black",
                          fontSize: "16px",
                          marginLeft: "25rem",
                          marginRight: "25rem",
                        }}
                      >
                        <Markup content={text} allowAttributes allowElements />
                      </p>
                    </div>
                    <button
                      type="button"
                      name="next"
                      className="btn btn-primary next action-button float-end"
                      value="Submit"
                      onClick={() => handleSubmit()}
                    >
                      Hoàn thành
                    </button>
                    <button
                      type="button"
                      name="previous"
                      className="btn btn-danger previous action-button-previous float-end me-1"
                      value="Previous"
                      onClick={() => AccountShow("Personal")}
                    >
                      Trở về
                    </button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreatePost;
