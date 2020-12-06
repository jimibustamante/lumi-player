import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import {
  VideoContainer,
  Video,
  List,
  ListElement,
} from '../styles/main';
import Advertisements from './Advertisements';
import Controls from './Controls';
import Buttons from './Buttons';
import { usePlayer } from '../contexts/player-context';

const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const videoRef = useRef(null);
  const playlist = useRef(videosList);
  const [playerState, dispatch] = usePlayer();
  const { playing, fullscreen, currentVideoId } = playerState;
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const setRandomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    playlist.current = list.sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_PLAYLIST', payload: playlist.current});
    dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: playlist.current[0].uri});
  }, [videosList, playlist, dispatch]);

  const next = useCallback(async () => {
    console.log('next')
    const currentIndex = playlist.current.indexOf(playlist.current.find(v => v.uri === currentVideoId));
    console.log({currentIndex})
    let nextVideo = playlist.current[currentIndex + 1]
    if (!nextVideo) {
      nextVideo = playlist.current[0];
    }
    dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: nextVideo.uri})
  }, [playlist, currentVideoId, dispatch]);

  const onVideoChange = useCallback((newId) => {
    if (!currentVideo || (currentVideo.uri !== newId)) {
      const newVideo = playlist.current.find(v => v.uri === newId)
      if (newVideo) setCurrentVideo(newVideo);
    }
  }, [currentVideo, playlist]);

  const changeVideo = useCallback(async () => {
    console.log('A', {loaded})
    if (!loaded) return;
    const currentId = await player.current.getVideoId();
    console.log({currentId, currentVideoId: getVimeoId(currentVideo)})
    if (currentId === getVimeoId(currentVideo)) return;
    await player.current.unload();
    await player.current.loadVideo(getVimeoId(currentVideo));    
    // setLoaded(false);
    console.log('B')

  }, [player, currentVideo, loaded]);

  useEffect(() => {
    if (currentVideoId !== currentVideo?.uri) {
      console.log('currentVideoId change', {currentVideoId})
      onVideoChange(currentVideoId);
    }
  }, [onVideoChange, currentVideoId, currentVideo]);

  useEffect(() => {
    setRandomPlaylist();
  }, [setRandomPlaylist]);

  useEffect(() => {
    if (player.current && loaded) {
      if (playing) player.current.play();
      if (!playing) player.current.pause();
    }
  }, [playing, loaded]);

  const onEnded = useCallback((data) => {
    console.log('ended')
    setTimeout(() => {
      next();
    }, 100);
  }, [next]);

  const onPlaying = useCallback(() => {
    if (loaded) {
      dispatch({type: 'PLAY'});
    }
  }, [dispatch, loaded])

  const onPause = useCallback(() => {
    if (loaded) {
      dispatch({type: 'PAUSE'});
    }
  }, [dispatch, loaded]);

  const onLoaded = useCallback(async () => {
    console.log('loaded')
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (currentVideo) {
      if (!player.current) {
        const options = {
          id: getVimeoId(currentVideo),
          autopause: false,
          controls: false,
          width: 900,
          portrait: true,
          autoplay: true,
        }
        player.current = new Vimeo('video', options);
        player.current.on('ended', onEnded);
        player.current.on('playing', onPlaying);
        player.current.on('pause', onPause);
        player.current.on('loaded', onLoaded);
        player.current.ready().then(() => {
          player.current.play();
        });
      } else {
          changeVideo();
        // setTimeout(() => {
        // }, 500);
      }
      return (() => {
        // player.current.off('ended', onEnded);
        // player.current.off('playing', onPlaying);
        // player.current.off('pause', onPause);
        // player.current.off('loaded', onLoaded);
      });
    }
  }, [currentVideo, next, changeVideo, dispatch, onEnded, onPlaying, onPause, onLoaded]);

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
      <Buttons setRandomPlaylist={setRandomPlaylist} next={next} />
      {playlist.current && (
        <List>
          {playlist.current.map((video) => {
            return (
              <ListElement key={getVimeoId(video)} isPlaying={currentVideo && currentVideo.uri === video.uri}>{video.name}</ListElement>
            )
          })}
        </List>
      )}
    </>
  )
};

export default VideoPlayer;
