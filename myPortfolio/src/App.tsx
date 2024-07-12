import './App.css';
import Bar from './components/bar/Bar';
import VSIcon from './components/vsIcon/VSIcon';
import Apps from './components/apps/apps';
function App() {
  return (
    <>
      <div id="body">
        <Bar />
        <div id="iconBody">
          <VSIcon />
        </div>
        <Apps /> {/* Add this line to include the AppBar component */}
      </div>
    </>
  );
}

export default App;