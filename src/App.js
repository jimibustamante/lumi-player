import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const totalLength = useRef(-1);
  const fetching = useRef(null);
  const hasMoreVideos = useRef(true);

  const getVideos = useCallback(async () => {
    const resp = await window.LumiApi.getFolderVideos(playlistId);
    const { data, total, paging } = resp;
    console.log({ resp, paging })
    totalLength.current = total;
    hasMoreVideos.current = paging.next;
    if (data) {
      setVideos(videos => videos.concat(data).sort(() => Math.random() - 0.5));
    }
    fetching.current = false;
  }, [setVideos, playlistId, totalLength, fetching]);

  useEffect(() => {
    if (hasMoreVideos.current) {
      fetching.current = true;
      getVideos();
    }
  }, [getVideos, videos]);

  
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
