import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./Author.css";

function DisplayData({ infos }) {
  const [authorData, setAuthorData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleAuthor = (name) => {
    axios
      .get(`https://openlibrary.org/search/authors.json?q=${name}`)
      .then((res) => {
        setAuthorData(res.data.docs);
        console.log(res.data.docs);
        setShowModal(true);
      });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container my-5">
      <Container fluid>
        <Row>
          {infos.map((ele, idx) => (
            <Col lg={2} md={4} sm={6} xs={12} key={ele?.key}>
              <Card
                style={{
                  minHeight: "590px",
                  width: "200px",
                  marginBottom: "2rem",
                  borderRadius: "1rem",
                }}
                className="text-center"
              >
                {/* <Card.Img
                  variant="top"
                  src={https://covers.openlibrary.org/b/id/${ele.work.cover_id}-L.jpg}
                /> */}

                <Card.Body>
                  <Card.Title className="fw-bold mb-4">{ele?.title}</Card.Title>
                  <Card.Text
                    className="authorName"
                    onClick={() => {
                      handleAuthor(ele?.author_name[0]);
                    }}
                  >
                    By : {ele?.author_name[0]}
                  </Card.Text>
                  <Card.Text> On: {ele?.first_publish_year}</Card.Text>
                  {/* <Card.Text>On : {ele.logged_date}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Author Modal */}
      <Modal show={showModal} onHide={handleCloseModal} className="text-center">
        <Modal.Header closeButton>
          <Modal.Title>{authorData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authorData?.length > 0 && (
            <>
              {/* <img
                src={https://covers.openlibrary.org/b/id/${authorData[0].cover_i}-L.jpg}
                alt="Author Cover"
                style={{ maxWidth: "100%", height: "auto" }}
              /> */}
              <p>
                <b>Name:</b> {authorData[0]?.name}
              </p>
              <p>
                <b>Top Subjects</b>: {authorData[0]?.top_subjects.join(", ")}
              </p>
              <p>
                <b>Top Work</b>: {authorData[0]?.top_work}
              </p>
              <p>
                <b>Work Count</b>: {authorData[0]?.work_count}
              </p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DisplayData;