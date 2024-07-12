import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import {
  MoveLeft,
  MoveRight,
  Search,
  Files,
  Play,
  GitBranch,
  Box,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  FileDown,
  X,
  Bell,
  Split,
  LayoutGrid,
  Monitor,
  PanelLeftClose,
  PanelRightClose,
  MoreVertical,
  AlertCircle,
  AlertTriangle,
  Wifi,
  Ellipsis,
  ChevronsRightLeft,
} from "lucide-react";
import "./editor.css";

interface VSCodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tab {
  name: string;
  content: string;
}

const fileContents: { [key: string]: string } = {
  "About.md": `# About Me

Hello! I'm Fadi Chahine, a passionate and creative software developer with a keen interest in building innovative solutions. With a strong foundation in React.js, Node.js, andExpress.js, I strive to create efficient, scalable, and user-friendly applications.

## My Philosophy

I believe in writing clean, maintainable code and continuously learning new technologies to stay at the forefront of the ever-evolving tech landscape. I also believe in drawing inspiration from the world's disciplines to find solutions.

## Hobbies and Interests

Outside of coding, I enjoy learning and playing the guitar. I also enjoy hitting the gym, reading a book, and going for long walks with friends. A little bit low-tech for a techie, I know, but in today's world checking out is just as important as checking in.`,

  "Education.md": `# Education

## University of Glasgow 
- **Degree:** MSCi in Software Engineering
- **Graduation Year:** 2019-2024

### Key Courses:
- Data Structures and Algorithms
- Web Programming 2
- Functional Programming
- Artificial Intelligence
- Secured Software Engineering

## Award & Achievements
- Honours, Division One, Second Class  - University of Glasgow, 2024
- Dissertation on the impact of COVID-19 on the IETF - University of Glasgow, 2024`,

  "Experience.md": `# Professional Experience

## Glasgow University Software Service - Software Developer - Part-Time - Glasgow
**Duration:** February 2022 - June 2022

- Developed information platforms for investment banks and bots for data
extraction from Slack channels for universities across india.
- Developer an information platform in React for castlebank investment. 

## Glasgow University Software Service - Software Developer - Full-Time - Glasgow
**Duration:** June 2022 - October 2022

- Ported R application that measures chance of remission with psychosis to Python.


## Infracom Communication Systems Installation - Full-Time - Dubai
**Duration:** October 2022 - July 2023

- Created KPI tracking platforms in React for customer service centers for multiple 
private and government entities such as: ADCB(Abu Dhabi Commercial Bank), 
MBRHE(Mohammad Bin Rashid Housing Establishment), FAB(First Abu Dhabi Bank). 
- Implemented custom widgets for clients in Angular.js. 
- Created a custom backend in spring for a new concierge application for MAERSK Jakarta. 
- Carried out on-site network support for multiple of the previously mentioned clients. 

`,

  "Projects.md": `# Projects

## Rangouts
**Link:** Rangouts.com

**Description:** Rangouts was a social media platform meant to solve the feeling of being lost in the big city
by allowing users to post events onto a map for other users to see and join.

**Technologies Used:**
- Frontend: React, SwiftUI
- Backend: Node.js, Express.js
- Database: PostgreSQL

**Key Features:**
- Live map with events visible 
- Ticket
- Picture feed for events.
`
};

const VSCodeStatusBar: React.FC = () => {
  return (
    <div className="vscode-status-bar">
      <div className="status-bar-left">
        <div id="remoteEnv">
          <ChevronsRightLeft size={15}/>
        </div>
        <span className="status-item"><GitBranch size={14} /> main</span>
        <span className="status-item"><AlertCircle size={14} /> 0</span>
        <span className="status-item"><AlertTriangle size={14} /> 0</span>
        <span className="status-item"><Wifi size={14} /> 0</span>
      </div>
      <div className="status-bar-right">
        <span className="status-item">Ln 2, Col 1</span>
        <span className="status-item">Spaces: 4</span>
        <span className="status-item">UTF-8</span>
        <span className="status-item">LF</span>
        <span className="status-item">Markdown</span>
        <span className="status-item">Prettier</span>
      </div>
    </div>
  );
};

const Editor: React.FC<VSCodeEditorProps> = ({ isOpen, onClose }) => {
  const [activeTabs, setActiveTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [folderExpanded, setFolderExpanded] = useState<boolean>(true);

  const files: string[] = [
    "About.md",
    "Education.md",
    "Experience.md",
    "Projects.md",
  ];

  const openTab = (fileName: string) => {
    if (!activeTabs.some((tab) => tab.name === fileName)) {
      const newTab: Tab = { 
        name: fileName, 
        content: fileContents[fileName] || `Content of ${fileName}` 
      };
      setActiveTabs([...activeTabs, newTab]);
    }
    setActiveTab(fileName);
  };

  const closeTab = (fileName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newTabs = activeTabs.filter((tab) => tab.name !== fileName);
    setActiveTabs(newTabs);
    if (activeTab === fileName) {
      setActiveTab(
        newTabs.length > 0 ? newTabs[newTabs.length - 1].name : null
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="vscode-editor">
      <div className="vscode-topbar">
        <div className="vscode-topbar-left">
          <div className="vscode-window-controls">
            <button className="window-control close" onClick={onClose}></button>
            <button className="window-control minimize" disabled></button>
            <button className="window-control maximize" disabled></button>
          </div>
        </div>
        <div className="vscode-topbar-center">
          <div className="vscode-navigation">
            <button className="nav-button" disabled>
              <MoveLeft size={16} />
            </button>
            <button className="nav-button" disabled>
              <MoveRight size={16} />
            </button>
          </div>
          <div className="vscode-search-bar">
            <Search size={14} />
            <span className="search-text">My Portfolio</span>
          </div>
        </div>
        <div className="vscode-topbar-right">
          <div className="vscode-topbar-icons">
            <button className="nav-button" disabled>
              <Bell size={16} />
            </button>
            <button className="nav-button" disabled>
              <Split size={16} />
            </button>
            <button className="nav-button" disabled>
              <LayoutGrid size={16} />
            </button>
            <button className="nav-button" disabled>
              <Monitor size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="vscode-main">
        <div className="vscode-sidebar">
          <div className="vscode-sidebar-top">
            <div className="vscode-sidebar-buttons">
              <button className="filesButton" disabled>
                <Files size={24} />
              </button>
              <button className="sidebar-button" disabled>
                <Search size={24} />
              </button>
              <button className="sidebar-button" disabled>
                <GitBranch size={24} />
              </button>
              <button className="sidebar-button" disabled>
                <Play size={24} />
              </button>
              <button className="sidebar-button" disabled>
                <Box size={24} />
              </button>
            </div>
          </div>
          <div className="vscode-sidebar-bottom">
            <button className="sidebar-button" disabled>
              <User size={24} />
            </button>
            <button className="sidebar-button" disabled>
              <Settings size={24} />
            </button>
          </div>
        </div>
        <div className="vscode-sidebar-content">
          <div className="vscode-sidebar-content-top">
            <div id="vscode-section">
              <div id="vscode-explorer">
              <h3>EXPLORER</h3>
              <Ellipsis size={16} id="explorer-options"/>
              </div>
              <div className="vscode-folder">
                <span onClick={() => setFolderExpanded(!folderExpanded)} className="editors">
                  {folderExpanded ? (
                    <ChevronDown size={16} className="chevron-icon" />
                  ) : (
                    <ChevronRight size={16} className="chevron-icon" />
                  )}
                  MY PORTFOLIO
                </span>
                {folderExpanded &&
                  files.map((file) => (
                    <div
                      key={file}
                      className="vscode-file"
                      onClick={() => openTab(file)}
                    >
                      <FileDown size={16} className="file-icon" />
                      {file}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="vscode-sidebar-content-bottom">
            <div className="vscode-section">
              <h3>
                <ChevronRight size={16} className="chevron-icon" />
                OUTLINE
              </h3>
            </div>
            <div className="vscode-section">
              <h3>
                <ChevronRight size={16} className="chevron-icon" />
                TIMELINE
              </h3>
            </div>
          </div>
        </div>
        <div className="vscode-content-area">
          <div className="vscode-tabs">
            {activeTabs.map((tab) => (
              <div
                key={tab.name}
                className={`vscode-tab ${
                  activeTab === tab.name ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <div className="tab-content">
                  <FileDown size={14} className="tab-icon" />
                  {tab.name}
                </div>
                <X
                  size={14}
                  className="close-tab-icon"
                  onClick={(e) => closeTab(tab.name, e)}
                />
              </div>
            ))}
            <div className="vscode-tab-icons">
              <button className="nav-button" disabled>
                <PanelLeftClose size={16} />
              </button>
              <button className="nav-button" disabled>
                <PanelRightClose size={16} />
              </button>
              <button className="nav-button" disabled>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          <div className="vscode-content">
            {activeTab ? (
              <ReactMarkdown>
                {activeTabs.find((tab) => tab.name === activeTab)?.content || ''}
              </ReactMarkdown>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#012b36",
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <VSCodeStatusBar />
    </div>
  );
};

export default Editor;