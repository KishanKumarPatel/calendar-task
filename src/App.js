import React, { useState } from "react";
import Calendar from "./components/Calendar";
const App = () => {
  const defaulteDate = "22/06/2000"; // Pass your desired date here
  const [date, setSelectedDate] = useState(null);

  // handle call when user select date and then set to this selected date as current date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
      <div className="container mx-auto bg-blue-500">
        <Calendar date={defaulteDate} onDateSelect={handleDateSelect} title={true} />
    </div>
  );
};
export default App;

