import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import sosApi from "../../api/sosApi";
import { Markup } from "interweave";
const sendSOSList = [
  {
    accountId: "01bcb733-26eb-4b4a-b587-f5e282a710cc",
    latitude: 10.77639229987708,
    longitude: 106.70301683584347,
    type: "Khác",
  },
  {
    accountId: "0669a6dc-1fe9-4765-b11e-51824555b8b9",
    latitude: 10.790016177232369,
    longitude: 106.69673259678083,
    type: "Khác",
  },
  {
    accountId: "0a7dd2bd-73c5-43f5-ae2c-f1441fef822c",
    latitude: 10.775681609116857,
    longitude: 106.70394174410335,
    type: "Khác",
  },
  {
    accountId: "0c2291a4-fffa-4777-941a-4ad36ddd4e87",
    latitude: 10.762275894671891,
    longitude: 106.6860884190528,
    type: "Khác",
  },
  {
    accountId: "0e3df550-373f-4a3e-8b80-0fa9fb9bfd35",
    latitude: 10.772056637399139,
    longitude: 106.69106672111498,
    type: "Khác",
  },
];
const Scripts = () => {
  const messagesEndRef = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("Đang chờ lệnh");
  const [result, setResult] = useState([]);
  const [responseSOS, setReponseSOS] = useState([]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });
  const clearConsole = () => {
    setResult([]);
  };
  const sendSOS = async () => {
    setIsLoading(true);
    setReponseSOS([]);
    setTitle("Đang gửi 5 tín hiệu SOS");
    for await (let sos of sendSOSList) {
      setResult((result) => [
        ...result,
        {
          message:
            "Gửi SOS với accountID: <b className='text-black'>" +
            sos.accountId +
            "</b>",
        },
      ]);
      try {
        const params = { sos };
        const response = await sosApi.sendSOS(params);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi SOS thành công với accountID: <b className='text-black'>" +
                sos.accountId +
                "</b>",
            },
          ]);
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi thành công đến <b className='text-black'>" +
                response.officeName +
                "</b> tại địa chỉ <b className='text-black'>" +
                response.district +
                "</b>. Sỹ quan <b className='text-black'>" +
                response.officerName +
                "</b> với số điện thoại <b className='text-black'>" +
                response.officerPhoneNumber +
                "</b> sẽ đảm nhận.",
            },
          ]);
          setReponseSOS((responseSOS) => [
            ...responseSOS,
            {
              notifyId: response.notifyId,
              officerId: response.officerId,
              executeTime: "20 phút",
              sumaryContent: "[Test]",
            },
          ]);
        }
        if (!JSON.stringify(response).includes("notifyId")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Gửi SOS thất bại với accountID: <b className='text-danger'>" +
                sos.accountId +
                "</b>",
            },
          ]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  const completeSOS = async () => {
    setIsLoading(true);
    setTitle("Hoàn thành 5 tín hiệu SOS");
    for await (let sos of responseSOS) {
      setResult((result) => [
        ...result,
        {
          message:
            "Hoàn thành SOS với ID: <b className='text-black'>" +
            sos.notifyId +
            "</b>",
        },
      ]);
      try {
        const params = { sos };
        const response = await sosApi.completeSOS(params);
        if (!JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Hoàn thành SOS thành công với ID: <b className='text-black'>" +
                sos.notifyId +
                "</b>",
            },
          ]);
        }
        if (JSON.stringify(response).includes("error")) {
          setResult((result) => [
            ...result,
            {
              message:
                "Hoàn thành SOS thất bại với ID: <b className='text-danger'>" +
                sos.notifyId +
                "</b>",
            },
          ]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
    setTitle("Hoàn thành.");
    setIsLoading(false);
  };
  return (
    <Row className="">
      <Col lg="12" className="">
        <Card className="rounded" style={{ height: "80vh" }}>
          <Card.Body className="">
            <div>
              <div className="mb-3 font-weight-bold h6 d-flex justify-content-between align-items-center">
                <div>
                  <i className="fa fa-light fa-terminal mr-2" /> Script Demo
                </div>
              </div>
            </div>
            <Row>
              <Col lg="4">
                <Row className="pr-2 mb-2">
                  <Button onClick={sendSOS} disabled={isLoading}>
                    Test gửi SOS
                  </Button>
                </Row>
                <Row className="pr-2 mb-2">
                  <Button
                    onClick={completeSOS}
                    disabled={isLoading || responseSOS.length === 0}
                  >
                    Test hoàn tất SOS
                  </Button>
                </Row>
              </Col>
              <Col lg="8">
                <Card
                  text={"dark"}
                  className="rounded"
                  style={{
                    height: "70vh",
                    backgroundColor: "rgb(227 224 224)",
                  }}
                >
                  <Card.Header
                    className="mb-3 font-weight-bold h5 d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: "rgb(227 224 224)",
                      fontWeight: "bold",
                      padding: "0.5rem 1.5rem",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <span>
                      Trạng thái: <span className="text-success">{title}</span>
                    </span>
                    <Button
                      onClick={clearConsole}
                      style={{ backgroundColor: "red", borderColor: "red" }}
                      disabled={result.length === 0 || isLoading === true}
                    >
                      Dọn sạch
                    </Button>
                  </Card.Header>
                  <Card.Body
                    className=""
                    style={{
                      maxHeight: "calc(100vh - 210px)",
                      overflowY: "auto",
                    }}
                  >
                    {result.length > 0 &&
                      result.map((r) => (
                        <Row>
                          <span>
                            <i className="fa fa-solid fa-check text-success" />{" "}
                            {moment().format("YYYY/MM/DD HH:mm:ss")}{" "}
                            <i className="fa fa-solid fa-caret-right" />{" "}
                            <Markup
                              content={r.message}
                              allowAttributes
                              allowElements
                            />
                          </span>
                        </Row>
                      ))}
                    {isLoading && (
                      <Row>
                        <span>
                          <Spinner
                            animation="border"
                            role="status"
                            size="sm"
                          ></Spinner>{" "}
                          {moment().format("YYYY/MM/DD HH:mm:ss")}{" "}
                          <i className="fa fa-solid fa-caret-right" /> Đang
                          chạy...
                        </span>
                      </Row>
                    )}
                    <div ref={messagesEndRef} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Scripts;
