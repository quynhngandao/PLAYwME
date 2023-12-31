import { useSelector } from "react-redux";
import { useState } from "react";
/***** MUI *****/
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// Disables the hours outside of 9 AM to 6 PM.
const shouldDisableTime = (value, view) => {
  if (view === "minutes") {
    const minutes = value.minute();
    return minutes !== 0 && minutes !== 30;
  }
  if (view === "hours") {
    const hour = value.hour();
    return hour < 9 || (hour >= 18 && hour !== 18);
  }
  return false;
};
// Weekend
const isWeekend = (date) => {
  const day = date.day();
  return day === 0 || day === 6;
};
// Range of allowed days
const lastMonday = dayjs().startOf("week");
const nextSunday = dayjs().endOf("week").startOf("day");
/***** FUNCTION *****/
/***** THIS IS BEING USED BY MODAL POPOVER COMPONENT *****/
export default function CustomDateTimePicker(props) {
  // useSelector
  const requests = useSelector((store) => store.requests);
  // useState
  const [selectedDateTime, setSelectedDateTime] = useState();

  // handleDateTimeChange
  const handleDateTimeChange = (dateTime) => {
    const formattedDateTime = dateTime.format("MMMM D, YYYY h:mm A");
    console.log("Selected Date:", formattedDateTime);
    props.handleDateTimeChange(formattedDateTime);
  };

/***** RENDER ******/
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem label="Select a time">
          <DateTimePicker
            // Only Monday to Friday , null is for time selected by user
            defaultValue={[lastMonday, nextSunday, selectedDateTime]}
            // No after standard bussiness hour of 9 AM to 6 PM
            shouldDisableTime={shouldDisableTime}
            // No weekend
            shouldDisableDate={isWeekend}
            // No past date
            disablePast
            views={["year", "month", "day", "hours", "minutes"]}
            onChange={handleDateTimeChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
