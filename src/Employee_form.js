import { Table, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Common from "./Common";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'


function Employee_form() {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [runOnce, setRunOnce] = useState(false);
  const url = "http://localhost:8001/api/employee.php";

  useEffect(() => {
    if(runOnce){
      return;
  } else {
    Common.callApi(url, ["list"], (result) => {
      setEmployeeInfo(JSON.parse(result));
      console.log(JSON.parse(result));
    })
    setRunOnce(true);
  }
  })

  const addEmployee = (fname, lname, email) => {
       setFname("");
       setLname("");
       setEmail("");
      Common.callApi(url, ["add", fname, lname, email], (result) => {
        setEmployeeInfo(JSON.parse(result));
      })
    };


    const deleteEmployee = (Sr_No) => {
      alert("Are You Sure, You want to delete this Employee!!")
      Common.callApi(url, ["delete", Sr_No], (result) => {
        setEmployeeInfo(JSON.parse(result));
      })
    }




  return (
    <div>
      <Row>
        <Col>&nbsp;</Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3 col-12">
            <Form.Control onChange={(e) => setFname(e.target.value)} value={fname} type="fname" placeholder="Enter first name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 col-12">
            <Form.Control onChange={(e) => setLname(e.target.value)} value={lname} type="lname" placeholder="Enter last name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 col-12">
            <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Button onClick={() => addEmployee(fname, lname, email)}>Add</Button>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Sr_No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        {employeeInfo.map((data) => (
          <tbody>
            <tr>
              <td>{data.Sr_No}</td>
              <td>{data.First_Name}</td>
              <td>{data.Last_name}</td>
              <td>{data.Email}</td>
              <td>{data.date_of_joining}</td>
              <td><FontAwesomeIcon onClick={() => deleteEmployee(data.Sr_No)} style={{cursor: "pointer"}} icon={faTrash} /></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}

export default Employee_form;
