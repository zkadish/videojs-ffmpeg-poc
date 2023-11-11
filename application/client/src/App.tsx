import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

function App() {

  useEffect(() => {
    axios.get('/health').then((data) => {
      console.log(data);
      debugger;
    }).catch((err) => {
      console.log(err);
      debugger;
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        <VideoPlayer />
      </section>
      <footer className="App-footer">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </footer>
    </div>
  );
}

export default App;
