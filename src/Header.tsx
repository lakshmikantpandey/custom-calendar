import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment-timezone";
import DatePicker from "react-datepicker";
import { maxDateValue } from "./constant/constant";

interface ChildComponentProps {
  setApiDate: (date: string) => void;
  setFormData: any;
  formData : any;
}

const Header: React.FC<ChildComponentProps> = ({ setApiDate, setFormData, formData }) => {
  const [currentDate, setCurrentDate] = useState<Moment>(
    moment().tz("Asia/Singapore")
  );
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDate, setActiveDate] = useState(currentDate.date());

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const btnCount = Math.floor(innerWidth / 45) - (innerWidth > 480 ? 0 : 1);

  const handleButtonClick = (date: Moment) => {
    setShowDatePicker(false);
    setActiveDate(date.date());
    const SGTDate = date.format("YYYY-MM-DD");
    setApiDate(SGTDate);
    setFormData({...formData, date : SGTDate})
  };

  const handleDatePickerChange = (date: Date) => {
    const momentDate = moment(date).tz("Asia/Singapore");
    setCurrentDate(momentDate);
    handleButtonClick(momentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const buttons = [];
  for (let i = 0; i < btnCount; i++) {
    const currentIterationDay = moment(currentDate).add(i, "days");

    if (currentIterationDay.isAfter(maxDateValue)) {
      break;
    }

    buttons.push(
      <td key={`day-${i}`} className="text-center">
        <div className="text-white">{currentIterationDay.format("ddd")}</div>
        <button
          className={`btn btn-sm date-btn ${
            activeDate === currentIterationDay.date()
              ? "text-dark active-btn"
              : "text-white"
          } ${i === 0 ? "border-2 border-light text-black" : ""}`}
          style={{ fontSize: "16px" }}
          onClick={() => handleButtonClick(currentIterationDay)}
        >
          {currentIterationDay.date()}
        </button>
      </td>
    );
  }

  buttons.push(
    <td key="date-picker-trigger" className="text-center">
      <button
        className="btn btn-sm rounded-circle"
        type="button"
        onClick={toggleDatePicker}
      >
        <svg
          width="17"
          height="23"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#FFFFFF"
            d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
          />
        </svg>
      </button>
      {showDatePicker && (
        <div style={{ position: "absolute", right: 4, top: "115px" }}>
          <DatePicker
            selected={currentDate.toDate()}
            onChange={handleDatePickerChange}
            inline
            minDate={new Date()}
            maxDate={maxDateValue.toDate()}
          />
        </div>
      )}
    </td>
  );

  return (
    <div
      id="header"
      className="d-flex"
      style={{
        backgroundColor: "#345d9d",
        width: "100vw",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div className="d-flex align-items-end" style={{ width: "100vw" }}>
        <table style={{ width: "100vw" }}>
          <tbody>
            <tr>{buttons}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;
