import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  FormText,
  Row,
} from "reactstrap";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "quill/dist/quill.snow.css";
//react-select
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import reportApi from "../../../api/reportApi";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import moment from "moment";
import categoryApi from "../../../api/categoryApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";
//testing
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import sendNotifyAPI from "../../../api/SendNotificationAPI";
import ReCAPTCHA from "react-google-recaptcha";

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
const SendReport = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  // if (user_info === null) {
  //   window.location.href = "/login";
  // }
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setIsCheck] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [time, setTime] = useState(moment());
  const [preview, setPreview] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState([]);
  const [imgNumber, setImgNumber] = useState(0);
  const [videoNumber, setVideonumber] = useState(0);
  const [imgUrl, setImgUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [selected, setSelected] = useState();
  const captchaRef = useRef(null);
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const handleToken = (e) => {
    setToken(e);
  };
  // Text box
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
  async function loadCategory() {
    try {
      const params = {};
      const response = await categoryApi.getAllSub(params);
      response
        .filter((e) => e.rootCategory !== null || e.categoryId === 0)
        .map((item) =>
          categoryList.push({ value: item.categoryId, label: item.type })
        );
    } catch (e) {
      toast.error(e.message);
    }
  }
  const shortcuts = {
    Today: moment(),
    Yesterday: moment().subtract(1, "days"),
    Clear: "",
  };
  const handleEditor = (editor) => {
    setText(editor);
  };
  const sendNotify = async () => {
    try {
      const params = {
        data: {
          title: "Thông báo",
          body: "Bạn có 1 báo cáo mới.",
        },
        to: "/topics/staff",
      };
      const response = await sendNotifyAPI.sendNotify(params);
      if (!JSON.stringify(response).includes("error")) {
        if (user_info !== null) {
          if (user_info.role.roleId === 1) {
            window.location.href = "/view-report";
          } else {
            window.location.href = "/view-report";
          }
        } else {
          window.location.href = "/";
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handle_submit = async () => {
    if (token.length > 0) {
      try {
        const params = {
          userID:
            user_info !== null
              ? user_info.role.roleId !== 1
                ? user_info.accountId
                : isAnonymous
                ? null
                : user_info !== null
                ? user_info.accountId
                : null
              : null,
          staffID:
            user_info !== null
              ? user_info.role.roleId !== 1
                ? user_info.accountId
                : null
              : null,
          categoryId:
            user_info !== null
              ? user_info.role.roleId !== 1
                ? selected.value
                : null
              : null,
          location:
            address +
            (state.selectedCity !== null
              ? ", " +
                state.selectedCity.label +
                (state.selectedDistrict !== null
                  ? ", " +
                    state.selectedDistrict.label +
                    (state.selectedWard !== null
                      ? ", " + state.selectedWard.label
                      : "")
                  : "")
              : ""),
          timeFraud: time.format("YYYY-MM-DD HH:mm:ss"),
          description: text,
          video:
            videoUrl.length !== 0 ? videoUrl.map((url) => url.url) : ["null"],
          image: imgUrl.length !== 0 ? imgUrl.map((url) => url.url) : ["null"],
          isAnonymous:
            user_info !== null
              ? user_info.role.roleId !== 1
                ? false
                : isAnonymous
              : true,
        };
        const response = await reportApi.send(params);
        if (response.statusCode === 200) {
          if (user_info !== null) {
            if (user_info.role.roleId === 1) {
              toast.success("Tạo báo cáo thành công");
              sendNotify();
            } else {
              toast.success("Tạo báo cáo thành công");
              sendNotify();
            }
          } else {
            toast.success("Tạo báo cáo thành công");
            sendNotify();
          }
          setCategoryList([]);
          setSelected("");
          setVideo([]);
          setImg([]);
          setImgUrl([]);
          setVideoUrl([]);
          setImgNumber(0);
          setVideonumber(0);
          setSelectedFile([]);
          setText("");
        } else {
          toast.error("Gửi thất bại");
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
  };
  const handleMoment = (moment) => {
    setTime(moment);
  };
  const handleCheck = (event) => {
    setIsCheck(event.target.checked);
  };
  const handleAnonymous = (event) => {
    setIsAnonymous(event.target.checked);
  };
  const handle_address = (event) => {
    setAddress(event.target.value);
  };
  const onSelectFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile([]);
      return;
    }
    setSelectedFile(e.target.files);
    const file = e.target.files;
    if (
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "avif" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "jpg" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "jpeg" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "jfif" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "pjpeg" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "pjp" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "png" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "raw" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "tiff" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "psd" ||
      file[file.length - 1].name.substring(
        file[file.length - 1].name.lastIndexOf(".") + 1
      ) === "webp"
    ) {
      setImg([...img, file[file.length - 1]]);
    } else {
      setVideo([...video, file[file.length - 1]]);
    }
  };
  useEffect(() => {
    if (img.length > imgNumber) {
      // eslint-disable-next-line
      Array.from(img).map((img) => {
        const storageRef = ref(storage, `/img/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const filtered = imgUrl.filter((url) => img.name !== url.name);
              setImgUrl([...filtered, { name: img.name, url: url }]);
              setImgNumber(imgNumber + 1);
            });
          }
        );
      });
    }
    if (video.length > videoNumber) {
      // eslint-disable-next-line
      Array.from(video).map((video) => {
        const storageRef = ref(storage, `/video/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, video);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const filtered = videoUrl.filter(
                (url) => video.name !== url.name
              );
              setVideoUrl([...filtered, { name: video.name, url: url }]);
              setVideonumber(videoNumber + 1);
            });
          }
        );
      });
    }
  }, [videoUrl, imgUrl, video, img]);
  useEffect(() => {
    loadCategory();
    if (selectedFile.length === 0) {
      setPreview([]);
      return;
    }
    // eslint-disable-next-line
    Array.from(selectedFile).map((file) => {
      const objectUrl = URL.createObjectURL(file);
      preview.push({
        type: file.type.includes("image") ? "image" : "video",
        location: objectUrl,
      });
    });
  }, [selectedFile]);
  return (
    <div className="fifth_bg">
      <Card className="ml-5 mr-5 mb-4 pb-2">
        <CardHeader
          className="bg-primary"
          style={{
            background:
              "linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237))",
          }}
        >
          <h5 style={{ color: "#fff" }}>Gửi báo cáo</h5>
        </CardHeader>
        <CardBody>
          <FormGroup row>
            <Col md="1">
              <Label className="font-weight-bold">
                Vị trí:<span className="text-danger">*</span>
              </Label>
            </Col>
            <Col md="8">
              <div className="row pl-3">
                <Input
                  className="mr-5 input-lg col-md-3"
                  type="text"
                  id="address"
                  value={address}
                  onChange={handle_address}
                  placeholder="Vị trí vụ việc..."
                />
                <Select
                  className="pr-5 "
                  name="cityId"
                  isDisabled={cityOptions.length === 0}
                  options={cityOptions}
                  onChange={(option) => onCitySelect(option)}
                  placeholder="Tỉnh/Thành"
                  defaultValue={selectedCity}
                />

                <Select
                  className="pr-5"
                  name="districtId"
                  isDisabled={districtOptions.length === 0}
                  options={districtOptions}
                  onChange={(option) => onDistrictSelect(option)}
                  placeholder="Quận/Huyện"
                  defaultValue={selectedDistrict}
                />
                <Select
                  className="pr-5"
                  name="wardId"
                  isDisabled={wardOptions.length === 0}
                  options={wardOptions}
                  placeholder="Phường/Xã"
                  onChange={(option) => onWardSelect(option)}
                  defaultValue={selectedWard}
                />
              </div>
            </Col>
          </FormGroup>
          {/* date time picker */}
          <FormGroup row>
            <Col md="1">
              <Label for="time" className="font-weight-bold">
                Thời điểm:<span className="text-danger">*</span>
              </Label>
            </Col>
            <Col md="8">
              <DatetimePickerTrigger
                shortcuts={shortcuts}
                moment={time}
                onChange={handleMoment}
                maxDate={moment()}
              >
                <Row>
                  <Col md="6">
                    <input
                      className="pt-1 pb-1"
                      type="text"
                      value={time.format("YYYY-MM-DD HH:mm")}
                      readOnly
                    />
                  </Col>
                  <Col md="6">
                    <i className="fa fa-calendar p-2 ml-2 border" />
                  </Col>
                </Row>
              </DatetimePickerTrigger>
              <FormText>
                Lưu ý: <i>Thời điểm xảy ra vụ việc</i>
              </FormText>
            </Col>
          </FormGroup>
          {/* File Upload */}
          <FormGroup row>
            <Col md="1">
              <Label for="file" className="font-weight-bold">
                File đính kèm:
              </Label>
            </Col>
            <Col>
              <Input
                id="file"
                name="file"
                type="file"
                multiple
                accept="image/*, video/*"
                onChange={(e) => onSelectFile(e)}
              />
              <FormText>
                Lưu ý:{" "}
                <i>Dung lượng hình ảnh không quá 5MB, video không quá 50MB</i>
              </FormText>
            </Col>
          </FormGroup>
          <Row>
            {preview.length !== 0 &&
              img.length !== 0 &&
              preview

                .slice(0, 5)
                .filter((img) => img.type === "image")
                .map((img) => (
                  <FormGroup row>
                    <FormGroup>
                      <UploadContainer>
                        <ImgUpload preview={img.location} />
                      </UploadContainer>
                    </FormGroup>
                  </FormGroup>
                ))}
            {img.length > 5 && (
              <FormGroup row>
                <FormGroup>
                  <UploadContainer>
                    <ImgUpload preview={"5moreImg"} />
                    <div class="centered">5 +</div>
                  </UploadContainer>
                </FormGroup>
              </FormGroup>
            )}
          </Row>
          <Row>
            {preview.length !== 0 &&
              video.length !== 0 &&
              preview
                .slice(0, 5)
                .filter((video) => video.type === "video")
                .map((video) => (
                  <label for="videos">
                    <video
                      width="350"
                      height="150"
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        paddingLeft: "1.5rem",
                      }}
                      autoPlay
                      controls
                      loop
                    >
                      <source src={video.location} />
                    </video>
                  </label>
                ))}
            {video.length > 5 && (
              <FormGroup row>
                <FormGroup>
                  <UploadContainer>
                    <ImgUpload preview={"5moreVideo"} />
                    <div class="top">5 +</div>
                  </UploadContainer>
                </FormGroup>
              </FormGroup>
            )}
          </Row>
          {/* Detail */}
          <FormGroup>
            <Label for="detail" className="font-weight-bold">
              Chi tiết:<span className="text-danger">*</span>
            </Label>
          </FormGroup>
          <FormGroup>
            <ReactQuill
              value={text}
              placeholder="Chi tiết báo cáo"
              onChange={handleEditor}
              modules={modules}
              style={{
                height: "25rem",
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
          {/* Chấp nhập điều khoản && ẩn danh */}
          {user_info !== null && user_info.role.roleId === 1 && (
            <FormGroup check inline style={{ paddingTop: "2rem" }}>
              <Input
                type="checkbox"
                value={isAnonymous}
                onChange={handleAnonymous}
              />
              <Label check>
                <i style={{ color: "red" }}>* </i>
                Tôi muốn gửi ẩn danh
              </Label>
            </FormGroup>
          )}
          <br />
          {user_info !== null && user_info.role.roleId === 1 && (
            <FormGroup
              check
              inline
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
              <Input type="checkbox" value={isChecked} onChange={handleCheck} />
              <Label check>
                <i style={{ color: "red" }}>* </i>
                Tôi hoàn toàn chịu trách nhiệm về thông tin báo báo theo{" "}
                <a href="# " style={{ color: "#2F80ED" }}>
                  điều khoản sử dụng
                </a>
              </Label>
            </FormGroup>
          )}
          {user_info === null && (
            <FormGroup
              check
              inline
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
              <Input type="checkbox" value={isChecked} onChange={handleCheck} />
              <Label check>
                <i style={{ color: "red" }}>* </i>
                Tôi hoàn toàn chịu trách nhiệm về thông tin báo báo theo{" "}
                <a href="# " style={{ color: "#2F80ED" }}>
                  điều khoản sử dụng
                </a>
              </Label>
            </FormGroup>
          )}
          <ReCAPTCHA
            sitekey={"6LfI60wjAAAAALwxQShekr40D0TfqzUAtUEslHeG"}
            ref={captchaRef}
            onChange={(e) => handleToken(e)}
          />
          {token &&
          (isChecked || (user_info !== null && user_info.role.roleId !== 1)) ? (
            <FormGroup inline>
              <Button
                style={{
                  background: "linear-gradient(to right,#56CCF2,#2F80ED)",
                  color: "white",
                  marginTop: "2rem",
                }}
                onClick={() => handle_submit()}
              >
                <b>Gửi báo cáo</b>
              </Button>
            </FormGroup>
          ) : (
            <FormGroup inline>
              <Button
                isDisabled
                style={{
                  color: "white",
                  marginTop: "2rem",
                }}
              >
                <b>Gửi báo cáo</b>
              </Button>
            </FormGroup>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default SendReport;
