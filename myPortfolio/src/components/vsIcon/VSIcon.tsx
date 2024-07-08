import { useState } from 'react';
import './VSIcon.css';
import VS from '../../assets/VSIcon.png'
import Editor from '../editor/editor';

function VSIcon() {

  const [isSelected, setIsSelected] = useState(false);
  const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleDoubleClick = () => {
    setIsVSCodeOpen(true);
  };

  const handleCloseVSCode = () => {
    setIsVSCodeOpen(false);
  };

  return (
    <>
      <div
        className={`vscode-icon-container ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className="vscode-icon" aria-label="Visual Studio Code" />
        <img src={VS} id="vsDeskIcon" alt="VS Code Icon" />
        <span className="vscode-label">Visual Studio Code</span>
      </div>
      <Editor isOpen={isVSCodeOpen} onClose={handleCloseVSCode} />
      </>
  )
}

export default VSIcon
