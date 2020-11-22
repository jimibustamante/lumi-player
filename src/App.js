import React, { useState, useEffect } from 'react'
import './App.css';

const App = () => {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    const resp = await window.LumiApi.getFolderVideos();
    if (resp) {
      setVideos(resp);
    }
  }
  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    console.log({videos});
  }, [videos])

  return (
    <div className="App">
      <h1>Lumi Player</h1>
    </div>
  );
}

export default App;
