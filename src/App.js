import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

const App = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  
  const getVideos = async () => {
    const resp = await window.LumiApi.getFolderVideos(playlistId);
    if (resp) {
      setVideos(resp);
    }
  }
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="App">
      <h1>Lumi Player</h1>
      {videos.length &&(
        <VideoPlayer videosList={videos} />
      )}
    </div>
  );
}

export default App;
