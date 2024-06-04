import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [buttons, setButtons] = useState<JSX.Element[]>([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    renderHeader();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentDate, innerWidth]);

  const renderHeader = () => {
    const btnCount = parseInt((innerWidth / 45).toString()) - (innerWidth > 480 ? 0 : 1);
    const newButtons = [];
    for (let i = 0; i < btnCount; i++) {
      const currentIterationDay = moment(currentDate).add(i, 'days');
      newButtons.push(
        <td key={`day-${i}`} className="text-center">
          <span className="text-white">{currentIterationDay.format('ddd')}</span>
          <button
            className={`btn btn-sm date-btn ${i === 0 ? 'border-2 border-light bg-light text-black' : 'text-black'}`}
            style={{ fontSize: '16px' }}
            id={`button-${i}`}
            value={currentIterationDay.format('YYYY-MM-DD')}
            onClick={(e) => handleButtonClick(e, currentIterationDay)}
          >
            {currentIterationDay.date()}
          </button>
        </td>
      );
    }
    newButtons.push(
      <td key="date-picker-trigger" className="text-center">
        <button className="btn btn-sm rounded-circle" type="button" onClick={toggleDatePicker}>
          <svg width="17" height="23" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#FFFFFF"
              d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
            />
          </svg>
        </button>
      </td>
    );
    setButtons(newButtons);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, date: moment.Moment) => {
    const btn = e.currentTarget;
    setCurrentDate(date);
    const buttons = document.getElementsByClassName('date-btn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('bg-light', 'text-black');
      buttons[i].classList.add('text-white');
    }
    btn.classList.add('bg-light', 'text-black');
    btn.classList.remove('text-white');
  };

  const toggleDatePicker = () => {
    const datepickerEl = document.getElementById('date-picker');
    if (datepickerEl) {
      datepickerEl.style.display = datepickerEl.style.display === 'none' ? 'contents' : 'none';
    }
  };

  return (
    <div id="header" className="d-flex" style={{ backgroundColor: '#345d9d', paddingLeft: '1.25rem', position:'fixed',zIndex : '999' }}>
      <div className="d-flex align-items-end">
        <table>
          <tbody>
            <tr>{buttons.map((btn, idx) => (<React.Fragment key={idx}>{btn}</React.Fragment>))}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Header;
