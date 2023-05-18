import React, { useState, useEffect } from 'react';
import styles from '../Calendar.module.css';

const Calendar = ({ date, onDateSelect, title }) => {
  
  /* If User not passing the date in Calendar Component the it set to Current Date */
  const [updatedDate, setDate] = useState(new Date());

  /**
   * Below Code Set date using useState() hook which date is passed in Calendar Component
   */
  useEffect(() => {
    if (date) {
      const [day, month, year] = date.split('/');
      const newDate = new Date(year, parseInt(month) - 1, day);
      setDate(newDate);
    }
  }, [date]);


  // Get the month and year for display
  const month = updatedDate.toLocaleString('default', { month: 'long' });
  const year = updatedDate.getFullYear();

  // Get the first day of the Month and the number of days in the month
  const firstDayOfMonth = new Date(year, updatedDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, updatedDate.getMonth() + 1, 0).getDate();

  // Handle Click on a date to update the selected date
  const handleDateClick = (day) => {
    const newDate = new Date(year, updatedDate.getMonth(), day);
    setDate(newDate);
  };

  // Handle click on the previous month button
  const handlePrevMonth = () => {
    const newDate = new Date(year, updatedDate.getMonth() - 1, updatedDate.getDate());
    setDate(newDate);
  };

  /**
   *  Handle click on the next month button
   */
  const handleNextMonth = () => {
    const newDate = new Date(year, updatedDate.getMonth() + 1, updatedDate.getDate());
    setDate(newDate);
  };


  /**
   * This below code render the Calendar grid
   *  
   */
  const renderCalendar = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Generate blanks for the days before the first day of the month
    const blanks = Array(firstDayOfMonth).fill(null);

    // Generate an array of the days in the month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Combine the blanks and days arrays and map them to calendar day elements
    const calendarDays = [...blanks, ...days].map((day, index) => {
      const selected = updatedDate.getDate() === day;
      const dayClassName = day ? styles.day : styles.blank;
      const selectedClassName = selected ? styles.selected : '';
      return (
        <div
          key={index}
          onClick={() => handleDateClick(day)}
          className={`cursor-pointer py-2 px-4 text-center border ${dayClassName} ${selectedClassName}`}
        >
          {day}
        </div>
      );
    });

    return (
      <div className={styles.calendar}>
        <div className={`header flex items-center justify-between mb-4 ${styles.header}`}>
          <button className={styles.navButton} onClick={handlePrevMonth}>&lt;</button>
          <div className={`month-year text-xl font-bold ${styles.monthYear}`}>{month} {year}</div>
          <button className={styles.navButton} onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className={`weekdays grid grid-cols-7 gap-2 ${styles.weekdays}`}>
          {weekdays.map((day) => (
            <div key={day} className={`text-center ${styles.weekday}`}>{day}</div>
          ))}
        </div>
        <div className={`days grid grid-cols-7 gap-2 ${styles.days}`}>{calendarDays}</div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className={`bg-white p-8 rounded shadow ${styles.container}`}>
        { title && 
          <h2 className={`text-2xl font-bold mb-4 ${styles.calheader}`}>Calendar</h2>
        }
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
