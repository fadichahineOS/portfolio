import React, { useState } from "react";
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
      const newTab: Tab = { name: fileName, content: `Content of ${fileName}` };
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
        <div className="vscode-window-controls">
          <button className="window-control close" onClick={onClose}></button>
          <button className="window-control minimize" disabled></button>
          <button className="window-control maximize" disabled></button>
        </div>
        <div className="vscode-window-controls">
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
      </div>
      <div className="vscode-main">
        <div className="vscode-sidebar">
          <div className="vscode-sidebar-top">
            <div className="vscode-sidebar-buttons">
              <button className="sidebar-button" disabled>
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
            <div className="vscode-sidebar-options">
              <button className="sidebar-button" disabled>
                <User size={24} />
              </button>
              <button className="sidebar-button" disabled>
                <Settings size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="vscode-sidebar-content">
          <div id="vscode-section">
            <h3>EXPLORER</h3>
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
          <div className="vscode-bottom-sections">
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
          </div>
          <div className="vscode-content">
            {activeTab ? (
              <div>
                <h1># {activeTab}</h1>
                <p>
                  {activeTabs.find((tab) => tab.name === activeTab)?.content}
                </p>
              </div>
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
    </div>
  );
};

export default Editor;
