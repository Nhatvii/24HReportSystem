import React, { useEffect, useState } from "react";
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
import makeAnimated from "react-select/animated";
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import reportApi from "../../../api/reportApi";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import * as moment from "moment";
import { ImgUpload, UploadContainer } from "../../AdminViews/Posts/CreatePost";
import categoryApi from "../../../api/categoryApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase/firebaseConfig";
const animatedComponents = makeAnimated();
//testing
//multiple select option mock data

const SendReport = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  // if (user_info === null) {
  //   window.location.href = "/auth#/login";
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
  const [selected, setSelected] = useState();
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

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
      categoryList.push({ value: 1, label: "Khác" });
      response.map((item) =>
        categoryList.push({ value: item.categoryId, label: item.subCategory })
      );
    } catch (e) {
      alert(e.message);
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
  const handle_submit = async () => {
    try {
      const params = {
        userID:
          user_info !== null
            ? user_info.role.roleId !== 1
              ? user_info.email
              : isAnonymous
              ? null
              : user_info !== null
              ? user_info.email
              : null
            : null,
        staffID:
          user_info !== null
            ? user_info.role.roleId !== 1
              ? user_info.email
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
          ", " +
          state.selectedCity.label +
          ", " +
          state.selectedDistrict.label +
          ", " +
          state.selectedWard.label,
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
      console.log(params);
      const response = await reportApi.send(params);
      if (response.statusCode === 200) {
        if (user_info !== null) {
          if (user_info.role.roleId === 1) {
            window.location.href = "/viewReport";
          } else {
            alert("Tạo báo cáo thành công");
          }
        } else {
          alert("Tạo báo cáo thành công");
          window.location.href = "/home";
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
        alert("Gửi thất bại");
      }
    } catch (e) {
      alert(e.message);
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
      // const base64 = await convertBase64(file);
      // setImg(base64);
      setImg([...img, file[file.length - 1]]);
    } else {
      // const base64 = await convertBase64(file);
      // setVideo(base64);
      setVideo([...video, file[file.length - 1]]);
    }
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
  useEffect(() => {
    if (img.length > imgNumber) {
      Array.from(img).map((img) => {
        const storageRef = ref(storage, `/img/${img.name}`);
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
      Array.from(video).map((video) => {
        const storageRef = ref(storage, `/video/${video.name}`);
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
    Array.from(selectedFile).map((file) => {
      const objectUrl = URL.createObjectURL(file);
      preview.push({
        type: file.type.includes("image") ? "image" : "video",
        location: objectUrl,
      });
    });
    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  return (
    <Card className="mt-4 ml-4 mr-4 mb-4 pb-2" style={{ height: "auto" }}>
      <CardHeader>
        <b>Chi tiết báo cáo </b>
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
          <Col md="2">
            <DatetimePickerTrigger
              shortcuts={shortcuts}
              moment={time}
              onChange={handleMoment}
              maxDate={moment()}
            >
              <input
                className="pt-1 pb-1"
                type="text"
                value={time.format("YYYY-MM-DD HH:mm")}
                readOnly
              />
              <i className="icon-calendar p-2 ml-2 border" />
            </DatetimePickerTrigger>
            <FormText>
              Lưu ý: <i>Thời điểm xảy ra vụ việc</i>
            </FormText>
          </Col>
        </FormGroup>
        {user_info !== null && user_info.role.roleId !== 1 && (
          <FormGroup row>
            <Col md="1">
              <Label className="font-weight-bold">
                Chọn phân loại:<span className="text-danger">*</span>
              </Label>
            </Col>
            <Col md="10">
              <div className="row pl-3">
                <Select
                  name="category"
                  isDisabled={categoryList.length === null}
                  options={categoryList}
                  onChange={(option) => setSelected(option)}
                  placeholder="Chọn phân loại"
                  defaultValue={selected}
                />
              </div>
            </Col>
          </FormGroup>
        )}
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
              <a href="#" style={{ color: "#2F80ED" }}>
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
              <a href="#" style={{ color: "#2F80ED" }}>
                điều khoản sử dụng
              </a>
            </Label>
          </FormGroup>
        )}
        {isChecked || (user_info !== null && user_info.role.roleId !== 1) ? (
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
                background: "linear-gradient(to right,#56CCF2,#2F80ED)",
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
  );
};

export default SendReport;
