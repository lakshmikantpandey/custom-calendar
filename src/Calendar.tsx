import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Modal, Button, Form } from "react-bootstrap";
import { SGT, slots } from "./constant/constant";
import Service from "./services/service";
import { Rooms, Event, User } from "./interfaces/interfaces";
import moment from "moment-timezone";
import { Toastify } from "./helper/toast_helper";

const TimeGrid: React.FC = () => {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    first_name: "",
    last_name: "",
    display_name: "",
    image: "",
    email: "",
    mobile_no: "",
    role: "",
    code: "",
    cluster: {
      _id: "",
      name: "",
    },
    is_active: true,
    is_deleted: false,
    created_at: "",
    updated_at: "",
    is_empty: false,
    last_login: "",
    fcm_token: [],
    points: 0,
    enamecard: null,
    manager_delay_date: 0,
  });
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // const [currdate, setCurrDate] = useState(SGT);
  const currdate = SGT;
  const [apiDate, setApiDate] = useState(SGT);
  const [eventArr, setEventArr] = useState<Event[]>([]);
  const [userColorMap, setUserColorMap] = useState(new Map());
  const [selectedEvent, setSelectedEvent] = useState<Event|null>(null);
  const [reasonDetail, setReasonDetail] = useState('');
  const initialData: Event = {
    check_in: {
      slot: "",
      value: "",
    },
    check_out: {
      slot: "",
      value: "",
    },
    holderName: user.first_name,
    title: "",
    space_id: "",
    user_id : '',
    remainders: [],
    date: currdate,
    _id : ''
  };
  const [formData, setFormData] = useState<Event>(initialData);
  const currTime = moment().tz("Asia/Singapore").valueOf();
  const isExpiredEvent = Boolean(selectedEvent && moment(selectedEvent?.check_in?.value).isBefore(currTime));

  useEffect(() => {
    getRooms();
    getUserDetails();
  }, []);

  useEffect(() => {
    getEventsByDate(apiDate);
  }, [apiDate]);

  const getRooms = () => {
    Service.getRooms().then((res) => {
      setRooms(res.data.data);
    });
  };

  const getUserDetails = () => {
    Service.userDetails().then((res) => {
      setUser(res.data.data);
    });
  };

  const getEventsByDate = (date: string) => {
    Service.getEventsByDate(date).then((res) => {
      const evntArr: any = [];
      Object.values(res.data.data)
        .flat()
        .forEach((event) => {
          evntArr.push(event);
        });
      setEventArr(evntArr);
    });
  };

  const handleClose = () => setShow(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleCellClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsUpdate(false);
    const hourIndex = e.currentTarget.getAttribute("data-hour-index") ?? '0';
    const roomIndex = e.currentTarget.getAttribute("data-resource-index") ?? '0';
    const roomName = rooms[parseInt(roomIndex ?? "0")].space_name;
    setSelectedEvent(null);
    setFormData({
      _id : '',
      space_id : '',
      user_id: '',
      date: formData.date,
      check_in: {
        slot: slots[parseInt(hourIndex)]
          ? `${slots[parseInt(hourIndex)]}`
          : "",
        value: moment().format().split("T")[0],
      },
      check_out: {
        slot: slots[parseInt(hourIndex)]
          ? `${slots[parseInt(hourIndex) + 1]}`
          : "",
        value: moment().format().split("T")[0],
      },
      holderName: user.first_name,
      title: "",
      resource: roomName,
      remainders: [],
    });
    setShow(true);
  };

  const handleEventClick = (event: Event) => {
    setIsUpdate(true);
    const room = rooms.find((r) => r._id === event.space_id);
    setSelectedEvent(event);
    // if (isExpiredEvent) {
    //   setFormData({
    //     ...formData,
    //     check_in: { ...formData.check_in, slot: selectedEvent?.check_in.slot, value: "" },
    //   });
    // }
    setFormData({
      _id: event._id,
      space_id : '',
      user_id : '',
      date: event.check_in?.value.split("T")[0],
      check_in: {
        slot: event.check_in?.slot,
        value: event.check_in?.value,
      },
      check_out: {
        slot: event.check_out?.slot,
        value: event.check_out?.value,
      },
      holderName: event.user_name,
      title: event.title,
      resource: room ? room.space_name : "",
      remainders: event.remainders,
    });
    setShow(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "check_in_slot") {
      setFormData({
        ...formData,
        check_in: { ...formData.check_in, slot: value, value: "" },
      });
    } else if (name === "check_out_slot") {
      setFormData({
        ...formData,
        check_out: { ...formData.check_out, slot: value, value: "" },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const room = rooms.find((r) => r.space_name === formData.resource) as Rooms;
    const inValue =
      formData.date +
      "T" +
      moment(formData.check_in?.slot, ["h:mm A"]).format("HH:mm:ss");
    const outValue =
      formData.date +
      "T" +
      moment(formData.check_out?.slot, ["h:mm A"]).format("HH:mm:ss");

    const checkInValueSGT = moment.tz(inValue, "Asia/Singapore").format();
    const checkOutValueSGT = moment.tz(outValue, "Asia/Singapore").format();

    if (checkInValueSGT >= checkOutValueSGT) {
      Toastify.danger("The start time must be greater than end time!");
      return;
    }

    const formBody = {
      space_id: room?._id,
      title: formData.title,
      check_in: {
        slot: formData.check_in?.slot.toLowerCase(),
        value: checkInValueSGT,
      },
      check_out: {
        slot: formData.check_out?.slot.toLowerCase(),
        value: checkOutValueSGT,
      },
      day: moment(formData.date).format("dddd"),
      remainders:
        room && room?.remainders?.length > 0
          ? room?.remainders.map((reminder) => {
              const reminderUnit = reminder.unit === "hour" ? "hours" : "days";
              return moment(checkInValueSGT)
                .subtract(reminder.value, reminderUnit)
                .format();
            })
          : [],
    };
    if (!isUpdate) {
      Service.addEvent(formBody)
        .then(() => {
          Toastify.success("Event Created Successfully");
          getEventsByDate(currdate);
          setShow(false);
        })
        .catch((error) => {
          Toastify.danger(
            error.response.data.message ?? error.response.message
          );
        });
    } else {
      Service.updateEvent(selectedEvent?._id, formBody)
        .then(() => {
          Toastify.success("Event Updated Successfully");
          getEventsByDate(formData.date);
          setShow(false);
        })
        .catch((error) => {
          Toastify.danger(
            error.response.data.message ?? error.response.message
          );
        });
    }
  };

  const handleDelete = (eventId: string) => {
    Service.deleteEvent(eventId, reasonDetail).then(() => {
      Toastify.success("Event Deleted Successfully");
      setShow(!show);
      setShowDeleteModal(!showDeleteModal)
      getEventsByDate(currdate);
    });
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    let c = color.substring(1);
    let rgb = parseInt(c, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;

    if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
      return color;
    } else {
      getRandomColor();
    }
  };

  const renderTimeSlots = () => {
    return slots.slice(0, -2).map((slot, index) => (
      <div key={index} className="time-slot">
        {index % 2 === 0 ? slot.toUpperCase() : ""}
      </div>
    ));
  };

  const renderResourceHeaders = () => {
    return rooms.map((room, index) => (
      <div
        key={index}
        className="resource-header"
        style={{ width: "150px" }}
      >
        {room.space_name}
      </div>
    ));
  };

  const getUserColor = (userId: string) => {
    let color = userColorMap.get(userId);
    if (!color) {
      color = getRandomColor();
      setUserColorMap((prevMap) => new Map(prevMap).set(userId, color));
    }
    return color;
  };

  const renderGridCells = () => {
    return slots.slice(0, -1).map((_slot, hourIndex) => (
      <div key={hourIndex} className="time-row">
        {rooms.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className="grid-cell"
            data-hour-index={hourIndex}
            data-resource-index={roomIndex}
            onClick={handleCellClick}
            style={{ width: "150px" }}
          >
            {eventArr.map((event, index) => {
              if (event.space_id === room._id) {
                const eventStart = slots.indexOf(event?.check_in?.slot);
                const eventEnd = slots.indexOf(event?.check_out?.slot);

                if (hourIndex >= eventStart && hourIndex < eventEnd) {
                  const bgColor = getUserColor(event.user_id);
                  return (
                    <div
                      key={index}
                      className="event"
                      data-hour-index={hourIndex}
                      style={{
                        backgroundColor: bgColor,
                        cursor: "pointer",
                        height: "25px",
                        color: "black",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                      {eventStart === hourIndex && (
                        <>
                          {/* {isExpired && (
                            <Badge
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                              bg="danger"
                            >
                              Expired
                            </Badge>
                          )} */}
                          <p className="eventDetail">
                            {event.user_name} - {event.title}
                          </p>
                        </>
                      )}
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        ))}
      </div>
    ));
  };

  const filteredSlotsData = slots.filter((slot) => {
    const slotTime = moment.tz(slot, "h:mm A", "Asia/Singapore");
    if (formData.date > currdate) {
      return slotTime;
    } else {
      return (
        slotTime.isSameOrAfter(moment.tz("Asia/Singapore")) &&
        slotTime.isSame(currdate, "day")
      );
    }
  });

  return (
    <div className="parent-container">
      <Header setFormData={setFormData} formData={formData} setApiDate={setApiDate} />
      <div
        style={{ width: "100vw", overflow: "scroll" }}
        className="wrapper-new"
      >
        {/* <div className="d-flex"> */}
          <div className="blank-div"></div>
          <div className="sub-header">{renderResourceHeaders()}</div>
        {/* </div> */}
        <div className="time-grid">
          <div className="time-body">
            <div className="time-column">
              <div>{renderTimeSlots()}</div>
            </div>
            <div className="grid">{renderGridCells()}</div>
          </div>
        </div>
        <Button
          className="btn rounded-circle add_button"
          onClick={() => {
            setShow(!show);
            setFormData(initialData);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </Button>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            style={{ backgroundColor: "#345d9d", color: "white" }}
            closeButton
          >
            <svg
              width="20"
              className="svg-inline--fa fa-calendar-plus"
              data-prefix="fal"
              data-icon="calendar-plus"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M320 336C320 344.8 312.8 352 304 352H240V416C240 424.8 232.8 432 224 432C215.2 432 208 424.8 208 416V352H144C135.2 352 128 344.8 128 336C128 327.2 135.2 320 144 320H208V256C208 247.2 215.2 240 224 240C232.8 240 240 247.2 240 256V320H304C312.8 320 320 327.2 320 336zM112 0C120.8 0 128 7.164 128 16V64H320V16C320 7.164 327.2 0 336 0C344.8 0 352 7.164 352 16V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H96V16C96 7.164 103.2 0 112 0zM416 192H32V448C32 465.7 46.33 480 64 480H384C401.7 480 416 465.7 416 448V192zM384 96H64C46.33 96 32 110.3 32 128V160H416V128C416 110.3 401.7 96 384 96z"
              ></path>
            </svg>
            <Modal.Title className="mx-2">
              {selectedEvent ? "EDIT BOOKING" : "NEW BOOKING"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>
                  DATE & TIME <span className="mandatory">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={SGT}
                  max={moment()
                    .tz("Asia/Singapore")
                    .add(2, "months")
                    .endOf("month")
                    .format("YYYY-MM-DD")}
                  disabled={isExpiredEvent}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-1 w-50">
                  <Form.Control
                    as="select"
                    name="check_in_slot"
                    value={formData?.check_in?.slot}
                    onChange={handleChange}
                    disabled={isExpiredEvent}
                    required
                  >
                    <option value="">Choose...</option>
                    {selectedEvent?.check_in.slot && !filteredSlotsData.includes(selectedEvent.check_in.slot) && (
                      <option key="selected-slot" value={selectedEvent.check_in.slot}>
                        {selectedEvent.check_in.slot}
                      </option>
                    )}
                    {filteredSlotsData.slice(0, -1).map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-1 w-50">
                  <Form.Control
                    as="select"
                    name="check_out_slot"
                    value={formData?.check_out?.slot}
                    onChange={handleChange}
                    disabled={isExpiredEvent}
                    required
                  >
                   <option value="">Choose...</option>
                    {selectedEvent?.check_out.slot && !filteredSlotsData.includes(selectedEvent.check_out.slot) && (
                      <option key="selected-slot" value={selectedEvent.check_out.slot}>
                        {selectedEvent.check_out.slot}
                      </option>
                    )}
                    {filteredSlotsData.slice(1).map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <Form.Group className="mb-1">
                <Form.Label>
                  ROOMS <span className="mandatory">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="resource"
                  value={formData.resource}
                  onChange={handleChange}
                  disabled={isExpiredEvent}
                  required
                >
                  <option value="">Choose...</option>
                  {rooms.map((room, index) => (
                    <option key={index} value={room.space_name}>
                      {room.space_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>HOLDER</Form.Label>
                <Form.Control
                  type="text"
                  name="holderName"
                  value={
                    formData.holderName ? formData.holderName : user.first_name
                  }
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>
                  BOOKING TITLE <span className="mandatory">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={isExpiredEvent}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {selectedEvent &&
              moment(selectedEvent?.check_in?.value).valueOf() >= currTime &&
              selectedEvent.user_id === user._id ? (
                <Button
                  variant="danger"
                  onClick={() => {setShowDeleteModal(true)}}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
              {selectedEvent &&
              moment(selectedEvent?.check_in?.value).valueOf() >= currTime &&
              selectedEvent.user_id === user._id ? (
                <Button variant="success" type="submit">
                  Update
                </Button>
              ) : (
                <>
                  {!selectedEvent && (
                    <Button variant="success" type="submit">
                      Confirm
                    </Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header
            className="bg-danger"
            style={{ color: "white" }}
            closeButton
          >
            <Modal.Title className="mx-2">
            <span>
            <svg width="20" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
              &nbsp;Are you sure, you want to delete this event?
            </span>
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>REASON OF CANCELLATION</Form.Label>
                <Form.Control as="textarea" rows={3} name="reason" value={reasonDetail} onChange={(e) => setReasonDetail(e.target.value)} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                No
              </Button>
              <Button variant="danger"  onClick={() => {
                    if(selectedEvent?._id) handleDelete(selectedEvent?._id);
                  }}>
                Yes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TimeGrid;
