/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "moment/locale/vi";
import { Card, Col, Row } from "react-bootstrap";
import MyTasksTable from "./MyTasksTable";
const Tasks = () => {
  // const user_info = JSON.parse(localStorage.getItem("user_info"));
  return (
    <Row>
      <Col lg="12">
        <Card className="rounded">
          <Card.Body>
            <Row>
              <Col sm="12">
                <h4 className="mb-2">Công việc của tôi</h4>
              </Col>
            </Row>
            <Row>
              <Col sm="12" className="mt-4">
                <div className="table-responsive-lg">
                  <MyTasksTable />
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col sm="12">
                <MyPostTable />
              </Col>
            </Row> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default Tasks;
