import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: flex;
  width: 70vw;
  height: auto;
`;

const Video = styled.div`
  width: 100%;
`;
const VideoPlayer = ({ videosList }) => {
  const player = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const randomPlaylist = useCallback(() => {
    const list = Object.assign([], videosList);
    return list.sort(() => Math.random() - 0.5);
  }, [videosList]);

  const next = useCallback(() => {
    const currentId = playlist.indexOf(playlist.find(v => v.uri === currentVideo.uri));
    const nextVideo = playlist[currentId + 1]
    if (nextVideo) {
      setCurrentVideo(nextVideo);
    } else {
      setCurrentVideo(playlist[0]);
    }
  }, [playlist, currentVideo]);

  useEffect(() => {
    setPlaylist(randomPlaylist());
  }, [randomPlaylist]);

  useEffect(() => {
    setCurrentVideo(playlist[0]);
  }, [playlist]);

  useEffect(() => {
    if (!player.current && currentVideo) {
      player.current = new Vimeo('video');
      player.current.on('ended', (data) => {
        next();
      });
    }
  }, [currentVideo, next]);

  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }

  return (
    <VideoContainer>
      {currentVideo && (
        <Video id='video' data-vimeo-id={getVimeoId(currentVideo)} />
      )}
    </VideoContainer>
  )
};

export default VideoPlayer;
