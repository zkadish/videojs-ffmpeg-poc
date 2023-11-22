import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import VideoPlayer from './VideoPlayer';
import ImagePiped from './ImagePiped';
import FfmpegWasm from './FfmpegWasm';
import axios from 'axios';
import logo from './logo.svg';

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/video",
    element: <VideoPlayer />,
  },
  {
    path: "/image",
    element: <ImagePiped />,
  },
  {
    path: "/wasm",
    element: <FfmpegWasm />,
  },
]);

function App() {
  useEffect(() => {
    axios.get('/health-check').then((data) => {
      console.log(data);
      // debugger;
    }).catch((err) => {
      console.log(err);
      debugger;
    });
  }, [])

  // useEffect(() => {
  //   axios.get('/video-proxy').then((data) => {
  //     console.log(data);
  //     debugger;
  //   }).catch((err) => {
  //     console.log(err);
  //     debugger;
  //   });
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        {/* <VideoPlayer /> */}
        <RouterProvider router={router} />
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
