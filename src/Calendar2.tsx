import React, { useState } from "react";
import "./TimeGrid.css";
import Header from "./Header";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

interface Event {
  date: string;
  startTime: string;
  endTime: string;
  holderName: string;
  title: string;
}

const TimeGrid: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const resources = [
    "Room1",
    "Room2",
    "Room3",
    "Room4",
    "Room5",
    "Room6",
    "Room7",
    "Room8",
    "Room9",
    "Room6",
    "Room7",
    "Room8",
    "Room9",
  ];

  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Event>({
    date: "",
    startTime: "",
    endTime: "",
    holderName: "",
    title: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);

  const handleCellClick = () => {
    setShow(!show);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, formData]);
    setIsModalOpen(false);
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      holderName: "",
      title: "",
    });
  };

  const renderTimeSlots = () => {
    return hours.map((hour, index) => (
      <div key={index} className="time-slot ">
        {hour}
      </div>
    ));
  };

  const renderResourceHeaders = () => {
    return resources.map((resource, index) => (
      <div
        key={index}
        className="resource-header"
        style={{ width: "10rem", zIndex: "999" }}
      >
        {resource}
      </div>
    ));
  };

  const renderGridCells = () => {
    return hours.map((hour, hourIndex) => (
      <div key={hourIndex} className="time-row">
        {resources.map((resource, resourceIndex) => (
          <div
            key={resourceIndex}
            className="grid-cell"
            onClick={handleCellClick}
          >
            {events
              .filter((event) => {
                const eventStartHour = parseInt(
                  event.startTime.split(":")[0],
                  10
                );
                const eventEndHour = parseInt(event.endTime.split(":")[0], 10);
                const eventStartMinutes = parseInt(
                  event.startTime.split(":")[1],
                  10
                );
                const eventEndMinutes = parseInt(
                  event.endTime.split(":")[1],
                  10
                );
                return (
                  eventStartHour <= hourIndex &&
                  eventEndHour > hourIndex &&
                  event.holderName === resource
                );
              })
              .map((event, index) => (
                <div
                  key={index}
                  className="event"
                  style={{
                    top: `${
                      (parseInt(event.startTime.split(":")[1], 10) / 60) * 100
                    }%`,
                    height: `${
                      (((parseInt(event.endTime.split(":")[0], 10) -
                        parseInt(event.startTime.split(":")[0], 10)) *
                        60 +
                        (parseInt(event.endTime.split(":")[1], 10) -
                          parseInt(event.startTime.split(":")[1], 10))) /
                        60) *
                      100
                    }%`,
                  }}
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div
        className="header"
        style={{ position: "sticky", top: "4.5rem", marginLeft: "3.8rem" }}
      >
        {renderResourceHeaders()}
      </div>
      <div className="time-grid">
        <div className="time-column-header"></div>
        <div className="body">
          <div className="time-column bg-secondary">
            <div>{renderTimeSlots()}</div>
          </div>
          <div className="grid">{renderGridCells()}</div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>NEW BOOKING</Modal.Title>
            </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>DATE & TIME <span className="mandatory">*</span></Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-1 w-50">
                  <Form.Select aria-label="Default select example">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1 w-50">
                  <Form.Select aria-label="Default select example">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <Form.Group className="mb-1">
                <Form.Label>ROOMS <span className="mandatory">*</span></Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>HOLDER</Form.Label>
                <Form.Control type="text" disabled />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>BOOKING TITLE <span className="mandatory">*</span></Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleClose}>
                Confirm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default TimeGrid;
