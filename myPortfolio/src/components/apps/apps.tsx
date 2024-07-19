import React, { useState } from 'react';
import './apps.css';
import FinderIcon from "../../assets/finder.png";
import SafariIcon from "../../assets/safari.png"; // Assuming you have these images
import MessagesIcon from "../../assets/messages.png";
import MailIcon from "../../assets/mail.png";
import CalendarIcon from "../../assets/calendar.png";
import PhotosIcon from "../../assets/photos.webp";
import FaceTimeIcon from "../../assets/facetime.png";
import MusicIcon from "../../assets/music.png";
import AppStoreIcon from "../../assets/appstore.png";
import SystemPreferencesIcon from "../../assets/systempreferences.png";
import VSCodeIcon from "../../assets/VSIcon.png";
import TerminalIcon from "../../assets/terminal.png";

interface AppIcon {
  name: string;
  icon: string;
  isRecent?: boolean;
}

const Apps: React.FC = () => {
  const [apps, _setApps] = useState<AppIcon[]>([
    { name: 'Finder', icon: FinderIcon },
    { name: 'Safari', icon: SafariIcon },
    { name: 'Messages', icon: MessagesIcon },
    { name: 'Mail', icon: MailIcon },
    { name: 'Calendar', icon: CalendarIcon },
    { name: 'Photos', icon: PhotosIcon },
    { name: 'FaceTime', icon: FaceTimeIcon },
    { name: 'Music', icon: MusicIcon },
    { name: 'App Store', icon: AppStoreIcon },
    { name: 'System Preferences', icon: SystemPreferencesIcon },
  ]);

  const [recentApps, _setRecentApps] = useState<AppIcon[]>([
    { name: 'Visual Studio Code', icon: VSCodeIcon, isRecent: true },
    { name: 'Terminal', icon: TerminalIcon, isRecent: true },
  ]);

  const [bouncingApp, setBouncingApp] = useState<string | null>(null);

  const handleAppClick = (appName: string) => {
    setBouncingApp(appName);
    setTimeout(() => setBouncingApp(null), 1000);
  };

  return (
    <div className="app-bar">
      {apps.map((app, index) => (
        <div
          key={index}
          className={`app-icon ${bouncingApp === app.name ? 'bounce' : ''}`}
          onClick={() => handleAppClick(app.name)}
        >
          <img src={app.icon} alt={app.name} className="icon" />
          <span className="tooltip">{app.name}</span>
        </div>
      ))}
      {recentApps.length > 0 && <div className="separator"></div>}
      {recentApps.map((app, index) => (
        <div
          key={`recent-${index}`}
          className={`app-icon recent ${bouncingApp === app.name ? 'bounce' : ''}`}
          onClick={() => handleAppClick(app.name)}
        >
          <img src={app.icon} alt={app.name} className="icon" />
          <span className="tooltip">{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Apps;
