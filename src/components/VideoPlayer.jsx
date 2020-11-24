import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  margin: 2rem auto;
  justify-content: center;
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

const List = styled.ul`
  list-style: none;
  margin: 3rem 0;
`;
const ListElement = styled.li`
  ${({isPlaying}) => (
    isPlaying && 'color: #4CAF50'
  )}
`;

const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0 1rem;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  color: white;
  transition-duration: 0.4s;
`;

const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const playlist = useRef(videosList);
  const containerElement = useRef(null);
  // const [playlist, setPlaylist] = useState([]);
  
  const [currentVideo, setCurrentVideo] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

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
        controls: true,
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
      player.current.on('ended', onEnded);
      player.current.ready(() => {
        player.current.play();
      });
      return (() => {
        player.current.off('ended', onEnded);
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
