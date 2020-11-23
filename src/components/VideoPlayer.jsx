import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 70vw;
  background-color: black;
  height: auto;
  iframe {
    width: 100% !important;
    background-color: black;
  }
`;

const Video = styled.div`
  width: 100%;
  iframe {
    width: ${({fullscreen}) => fullscreen ? '100vw !important' : 'inherit'};
    ${({fullscreen}) => fullscreen ? 'height: 100vh !important' : ''};
  }

`;
const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const containerElement = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const randomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    return list.sort(() => Math.random() - 0.5);
  }, [videosList]);

  const next = useCallback(async () => {
    const currentId = playlist.indexOf(playlist.find(v => v.uri === currentVideo.uri));
    let nextVideo = playlist[currentId + 1]
    if (!nextVideo) {
      nextVideo = playlist[0];
    }
    setCurrentVideo(nextVideo);
    if (player.current) {
      player.current.destroy();
      player.current = null;
    }
  }, [playlist, currentVideo, player]);

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
    setPlaylist(randomPlaylist());
  }, [randomPlaylist]);

  useEffect(() => {
    setCurrentVideo(playlist[0]);
  }, [playlist]);

  useEffect(() => {
    if (!player.current && currentVideo) {
      const options = {
        controls: true,
        width: 900,
        autoplay: true,
      }
      player.current = new Vimeo('video', options);
      player.current.on('ended', (data) => {
        next();
      });
    }
  }, [currentVideo, next]);

  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }

  return (
    <>
      <VideoContainer ref={containerElement}>
        {currentVideo && (
          <Video id='video' fullscreen={fullscreen} data-vimeo-id={getVimeoId(currentVideo)} />
        )}
      </VideoContainer>
      <button onClick={goFullscreen}>Fullscreen!</button>
    </>
  )
};

export default VideoPlayer;
