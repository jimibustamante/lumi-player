import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import {
  VideoContainer,
  Video,
  List,
  ListElement,
  Button,
} from '../styles/main';
import Controls from './Controls';
import { usePlayer } from '../contexts/player-context';
const Buttons = ({setRandomPlaylist, next}) => {
  const [playerState, dispatch] = usePlayer();

  const goFullscreen = useCallback(() => {
    dispatch({ type: 'SET_FULLSCREEN', payload: true})
  }, [dispatch]);
  return (
    <>
      <Button onClick={goFullscreen}>Fullscreen!</Button>
      <Button onClick={next}>Next</Button>
      <Button onClick={setRandomPlaylist}>Random</Button>
    </>
  )
}

const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const videoRef = useRef(null);
  const playlist = useRef(videosList);
  const [playerState, dispatch] = usePlayer();
  const { playing, fullscreen, currentVideoId } = playerState;
  const [currentVideo, setCurrentVideo] = useState(null);
  const setRandomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    playlist.current = list.sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_PLAYLIST', payload: playlist.current});
    dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: playlist.current[0].uri});
  }, [videosList, playlist, dispatch]);

  const next = useCallback(async () => {
    console.log('next')
    await player.current.pause();
    const currentIndex = playlist.current.indexOf(playlist.current.find(v => v.uri === currentVideoId));
    console.log({currentIndex})
    let nextVideo = playlist.current[currentIndex + 1]
    console.log({nextVideo: nextVideo.name})
    if (!nextVideo) {
      nextVideo = playlist.current[0];
    }
    dispatch({ type: 'SET_CURRENT_VIDEO_ID', payload: nextVideo.uri})
  }, [playlist, currentVideoId, dispatch]);

  const onVideoChange = useCallback(() => {
    console.log('onVideoChange', currentVideoId)
    if (!currentVideo || (currentVideo.uri !== currentVideoId)) {
      const newVideo = playlist.current.find(v => v.uri === currentVideoId)
      if (newVideo) setCurrentVideo(newVideo);
    }
  }, [currentVideo, currentVideoId, playlist]);

  const changeVideo = useCallback(async () => {
    console.log({changeVideo: currentVideo.name})
    console.log({player: player.current});
    const currentId = await player.current.getVideoId();
    if (currentId === getVimeoId(currentVideo)) return;
    await player.current.pause();
    await player.current.unload();
    await player.current.loadVideo(getVimeoId(currentVideo));    
  }, [player, currentVideo]);

  useEffect(() => {
    onVideoChange();
  }, [onVideoChange, currentVideoId]);

  useEffect(() => {
    setRandomPlaylist();
  }, [setRandomPlaylist]);

  useEffect(() => {
    if (player.current) {
      if (playing) player.current.play();
      if (!playing) player.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (currentVideo) {
      const options = {
        id: getVimeoId(currentVideo),
        controls: false,
        width: 900,
        autoplay: true,
      }
      if (!player.current) {
        player.current = new Vimeo('video', options);
      } else {
        changeVideo();
      }
      const onEnded = (data) => {
        console.log('ended')
        next();
      };
      const onPlaying = () => {
        dispatch({type: 'PLAY'});
      }
      const onPause = () => {
        dispatch({type: 'PAUSE'});
      }
      const onLoaded = () => {
        player.current.play();
      }
      player.current.on('ended', onEnded);
      player.current.on('playing', onPlaying);
      player.current.on('pause', onPause);
      player.current.on('loaded', onLoaded);
      return (() => {
        player.current.off('ended', onEnded);
        player.current.off('playing', onPlaying);
        player.current.off('pause', onPause);
        player.current.off('loaded', onLoaded);
    });
    }
  }, [currentVideo, next, changeVideo, dispatch]);

  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }

  return (
    <>
      <VideoContainer
        fullscreen={fullscreen}
        ref={videoRef}
      >
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
