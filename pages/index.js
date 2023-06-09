"use client";

import { useState } from "react";
import PopupWindow from "./PopupWindow";
import Graph from "./Graph";
import Weather from "./Weather";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient} from "@supabase/auth-helpers-react";


//test case ******************* remember to delete after uses
// import TestDisplay from "./TestDisplay";
// import Event from "./../server/database/Event"

const Calendar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear] = useState(new Date().getFullYear());
  const [showNote, setShowNote] = useState(false);
  const [createNote, setCreateNote] = useState("");

  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const startingDay = firstDayOfMonth.getDay();
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const renderCalendarCells = () => {
    const calendarCells = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const calendarRow = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          calendarRow.push(
            <td key={`${i}-${j}`} className="empty">
              {" "}
            </td>
          );
        } else if (day > daysInMonth) {
          break;
        } else {
          calendarRow.push(
            <td key={`${i}-${j}`}>
              <button
                onClick={() =>
                  handleNoteClick(i * 7 + j + 1 - startingDay, monthName)
                }
                // onClick={() =>
                //   handleNoteClick(
                //     i * 7 + j + 1 - startingDay,
                //     monthName,
                //     currentYear,
                //     // pass the eventId as an argument
                //     event ? event.id : null
                //   )
                // }
              >
                {day}
              </button>
            </td>
          );
          day++;
        }
      }

      calendarCells.push(<tr key={i}>{calendarRow}</tr>);
    }

    return calendarCells;
  };

  const onPrevButtonClick = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const onNextButtonClick = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleNoteClick = (dayOfMonth, monthName) => {
    if (!dayOfMonth || !monthName) {
      setCreateNote(null);
    } else {
      setCreateNote({
        dayOfMonth: dayOfMonth,
        monthName: monthName,
        currentYear: currentYear,
      });
    }
    setShowNote(true);
  };

  return (

    <div className="">
    <div className="">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        
        <div className="calendar">
        <nav className="fullscreenNavbar">
          <div>
        <Link className="Logo" href="/">
            InviteGo
          </Link> 
          </div>
  
          <div className="insidenavbar">
            <div className="innav">
          <Link className="Logo" href="/about">
            My Account 
          </Link> 
          </div>
            <div className="innav">
          <Link className="Logo" href="/Publicpost">
            PublicPost 
          </Link> 
          </div>
            <div className="innav">
          <Link className="Logo" href="/Videos">
            Videos
          </Link>
          </div>
          </div>
  
        </nav>
        <div className="calendar-header">
          <button onClick={onPrevButtonClick}>{"<"}</button>
          <div className="calendar-month-year">
            {monthName} {year}
          </div>
          <button onClick={onNextButtonClick}>{">"}</button>
        </div>
        <table className="calendar-grid">
          <thead>
            <tr>
              {weekdaysShort.map(weekday => (
                <th key={weekday}>{weekday}</th>
              ))}
            </tr>
          </thead>
          <tbody className="cellbody">{renderCalendarCells()}</tbody>
        </table>
        <div>
          {showNote && (
            <PopupWindow
              dayOfMonth={createNote.dayOfMonth}
              monthName={createNote.monthName}
              currentYear={createNote.currentYear}
              onClose={() => setShowNote(false)}
            />
          )}
        </div>
        <Graph />
        <Weather />
        <footer className="footer">
          <Link className="Logo" href="/about">
            👤
          </Link>
          <Link className="Logo" href="/">
            Go
          </Link>
          <Link className="Logo" href="/Publicpost">
          ❌
          </Link>
          <Link className="Logo" href="/Videos">
          🎥
          </Link>
        </footer>
      </div>
      )}
    
    </div>
  </div>








    
  );
};

export default Calendar;
