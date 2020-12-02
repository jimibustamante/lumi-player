import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Fullscreenable from './components/Fullscreenable';
import Advertisements from './components/Advertisements';
import { PlayerProvider } from './contexts/player-context';
import './App.css';

const App = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  
  const getVideos = useCallback(async () => {
    const resp = await window.LumiApi.getFolderVideos(playlistId);
    if (resp) {
      setVideos(resp);
    }
  }, [setVideos, playlistId]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <PlayerProvider>
      <div className="App">
        <h1>Lumi Player</h1>
        <Fullscreenable>
          <Advertisements />
          {videos.length &&(
            <VideoPlayer videosList={videos} />
          )}
        </Fullscreenable>
      </div>
    </PlayerProvider>
  );
}

export default App;
