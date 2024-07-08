import { useState, useEffect } from "react";
import { Battery, Wifi, Search } from "lucide-react";
import "./Bar.css";
import apple from "../../assets/Apple.png"

function Bar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "GMT",
  });

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <img src={apple} className="apple-logo"/>
          <div className="menu-items">
            <span className="menu-item">Finder</span>
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">View</span>
            <span className="menu-item">Go</span>
            <span className="menu-item">Window</span>
            <span className="menu-item">Help</span>
          </div>
        </div>
        <div className="topbar-right">
          <div className="status-icons">
            <Wifi />
            <Battery />
            <Search />
          </div>
          <span className="date-time">{formattedDate}</span>
        </div>
      </div>
    </>
  );
}

export default Bar;
