import { useState } from 'react';
import './VSIcon.css';
import VS from '../../assets/VSIcon.png'

function VSIcon() {

    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
      setIsSelected(!isSelected);
    };
  
    const handleDoubleClick = () => {
      console.log('Open VS Code');
      // Add logic to open VS Code or perform desired action
    };
  
    return (
      <div 
        className={`vscode-icon-container ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div 
          className="vscode-icon"
          aria-label="Visual Studio Code"
        />
        <img src={VS} id="vsDeskIcon"/>
        <span className="vscode-label">Visual Studio Code</span>
      </div>
    );
}

export default VSIcon
