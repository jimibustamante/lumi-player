import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import {
  VideoContainer,
  Video,
  List,
  ListElement,
  Button,
  PlayButton,
  PauseButton,
  ToggleContainer,
} from '../styles/main';
const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const playlist = useRef(videosList);
  const containerElement = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const randomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    playlist.current = list.sort(() => Math.random() - 0.5);
    setCurrentVideo(playlist.current[0]);
  }, [videosList, playlist]);

  const next = useCallback(async () => {
    const currentId = playlist.current.indexOf(playlist.current.find(v => v.uri === currentVideo.uri));
    let nextVideo = playlist.current[currentId + 1]
    if (!nextVideo) {
      nextVideo = playlist.current[0];
    }
    setCurrentVideo(nextVideo);
  }, [playlist, currentVideo]);

  const goFullscreen = useCallback(async () => {
    if (containerElement.current) {
      try {
        await containerElement.current.requestFullscreen()
        setFullscreen(true);
      } catch (error) {
        alert("Your browser doesn't support fullscreen :(");
      }
    };
  }, [containerElement]);

  // Fullscreen
  useEffect(() => {
    if (containerElement.current) {
      containerElement.current.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) {
          setFullscreen(true);
        } else {
          setFullscreen(false);
        }
      }, false)
    }
  }, [containerElement])

  useEffect(() => {
    randomPlaylist();
    // setCurrentVideo(playlist.current[0]);
  }, [randomPlaylist]);

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
      }
      player.current.loadVideo(getVimeoId(currentVideo))
      const onEnded = (data) => {
        next();
      };
      const onPlaying = () => {
        setPlaying(true);
      }
      const onPause = () => {
        setPlaying(false);
      }
      player.current.on('ended', onEnded);
      player.current.on('playing', onPlaying);
      player.current.on('pause', onPause);
      player.current.ready(() => {
        player.current.play();
      });
      return (() => {
        player.current.off('ended', onEnded);
        player.current.off('playing', onPlaying);
        player.current.off('pause', onPause);
      });
    }
  }, [currentVideo, next]);

  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }

  return (
    <>
      <VideoContainer ref={containerElement}>
        <ToggleContainer>
          {playing && (
            <PauseButton size='8rem' onClick={() => player.current.pause()} />
          )}
          {!playing && (
            <PlayButton size='8rem' onClick={() => player.current.play()} />
          )}
        </ToggleContainer>
        {currentVideo && (
          <Video id='video' fullscreen={fullscreen} />
        )}
      </VideoContainer>
      <Button onClick={goFullscreen}>Fullscreen!</Button>
      <Button onClick={next}>Next</Button>
      <Button onClick={randomPlaylist}>Random</Button>
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
