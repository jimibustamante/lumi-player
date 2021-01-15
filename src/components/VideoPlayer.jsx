import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import {
  VideoContainer,
  Video,
  // List,
  // ListElement,
} from '../styles/main';
import Advertisements from './Advertisements';
import Controls from './Controls';
// import Buttons from './Buttons';
import { usePlayer } from '../contexts/player-context';

const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const videoRef = useRef(null);
  const playlist = useRef(videosList);
  const currentVideo = useRef(null);
  const [playerState, dispatch] = usePlayer();
  const { playing, fullscreen, currentVideoId } = playerState;
  const [loaded, setLoaded] = useState(null);
  const next = useRef(null)

  const setRandomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    playlist.current = list.sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_PLAYLIST', payload: videosList});
    if (!currentVideo.current) {
      dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: videosList[0].uri});
      currentVideo.current = videosList[0];
    } 
  }, [videosList, playlist, dispatch]);

  const changeVideo = useCallback(async (newVideo) => {
    const currentId = await player.current.getVideoId();
    if (currentId === getVimeoId(newVideo)) return;
    await player.current.unload();
    await player.current.loadVideo(getVimeoId(newVideo));
  }, [player]);

  next.current = useCallback(async () => {
    const currentIndex = playlist.current.indexOf(playlist.current.find(v => v.uri === currentVideoId));
    let nextVideo = playlist.current[currentIndex + 1]
    if (!nextVideo) {
      nextVideo = playlist.current[0];
    }
    currentVideo.current = nextVideo;
    dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: nextVideo.uri})
    changeVideo(nextVideo);
  }, [playlist, currentVideoId, dispatch, changeVideo, currentVideo]);

  useEffect(() => {
    setRandomPlaylist();
  }, [setRandomPlaylist]);

  useEffect(() => {
    if (player.current && loaded) {
      try {
        if (playing) player.current.play();
      } catch (error) {
        console.error({error});
        dispatch({type: 'PAUSE'});
      }
      if (!playing) player.current.pause();
    }
  }, [playing, loaded, dispatch]);

  useEffect(() => {
    if (currentVideo.current && currentVideo.current.uri) {
      if (!player.current) {
        const options = {
          id: getVimeoId(currentVideo.current),
          autopause: false,
          controls: false,
          width: 900,
          portrait: true,
          autoplay: true,
        }
        player.current = new Vimeo('video', options);
        player.current.on('ended', () => next.current());
        player.current.on('playing', () => loaded && dispatch({type: 'PLAY'}));
        player.current.on('pause', () => loaded && dispatch({type: 'PAUSE'}));
        player.current.on('loaded', () => setLoaded(true));
        player.current.ready().then(() => {
          try {
            player.current.play();
          } catch (error) {
            console.error({error});
            dispatch({type: 'PAUSE'});
          }
        });
      }
    }
  }, [currentVideo, next, dispatch, loaded]);

  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }
  return (
    <>
      <VideoContainer
        fullscreen={fullscreen}
        ref={videoRef}
      >
        <Advertisements />
        <Controls />
        {currentVideo && (
          <Video
            id='video'
            fullscreen={fullscreen}
          />
        )}
      </VideoContainer>
      {/* <Buttons setRandomPlaylist={setRandomPlaylist} next={next.current} />
      {playlist.current && (
        <List>
          {playlist.current.map((video) => {
            return (
              <ListElement key={getVimeoId(video)} isPlaying={currentVideo.current && currentVideo.current.uri === video.uri}>{video.name}</ListElement>
            )
          })}
        </List>
      )} */}
    </>
  )
};

export default VideoPlayer;
