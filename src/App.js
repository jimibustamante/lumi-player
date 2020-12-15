import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
import Fullscreenable from './components/Fullscreenable';
import { PlayerProvider } from './contexts/player-context';
import { AppContainer } from './styles/main';
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
      <AppContainer className="App">
        <Header />
        <Fullscreenable>
          {videos.length &&(
            <VideoPlayer videosList={videos} />
          )}
        </Fullscreenable>
      </AppContainer>
    </PlayerProvider>
  );
}

export default App;
