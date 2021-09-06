import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import SweetAlert from "sweetalert-react";
import swal from "sweetalert";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
class Cards extends React.Component {
  constructor() {
    super();
    this.state = {
      id: [],
      show: false,
      showComponent: false,
      tutorials: [],
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/tutorial`).then((res) => {
      this.setState({ tutorials: res.data });
    });
  }
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  deleteList = (tutorial) => {
    swal({
      text: "Are you sure you want to delete",
      buttons: ["No", "Yes"],
      icon: "error",
    })
      .then((willSearch) => {
        if (willSearch) {
          const tut = { id: tutorial._id, name: tutorial.tName };
          console.log(tut);
          axios
            .delete(`http://localhost:8080/tutorial/${tut.id}`, {
              data: tut,
            })
            .then((res) => {
              console.log(res);

              let arr = this.state.tutorials;
              console.log(arr);
              let result = arr.filter((ele) => ele.name !== tutorial.tName);
              this.setState({ tutorials: result });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .then((result) => result.json())
      .then((json) => console.log(json))
      .catch((err) => {
        window.location.reload();
      });
  };
  render() {
    return (
      <>
        <Row xs={1} md={2}>
          {/* <p>{this.state.tutorials.length}</p> */}
          {/* {tutorials.tName} */}
          {this.state.tutorials.map((tutorial, index) => (
            <Card border="dark" style={{ borderRadius: 8 }}>
              <Card.Header>{tutorial.tName}</Card.Header>
              <Card.Body>
                {/* <Card.Title>{tutorial.tDesc}</Card.Title> */}
                <Card.Text>{tutorial.tStatus}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/viewmore/${tutorial._id}`}>
                  <Button variant="dark">
                    <FontAwesomeIcon icon={faInfoCircle} /> View more
                  </Button>
                </Link>{" "}
                <Link to={`/edittutorial/${tutorial._id}`}>
                  <Button id="delBtn" variant="primary">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                </Link>{" "}
                <Button
                  id="delBtn"
                  variant="danger"
                  onClick={() => {
                    this.deleteList(tutorial);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </Row>
      </>
    );
  }
}
export default Cards;
