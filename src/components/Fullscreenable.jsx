import React, { useRef, useEffect, useCallback } from 'react';
import { usePlayer } from '../contexts/player-context';

const Fullscreenable = ({ children }) => {
  const fullscreenContent = useRef();
  const [playerState, dispatch] = usePlayer();
  const {fullscreen} = playerState;

  const goFullscreen = useCallback(async () => {
    if (fullscreenContent.current) {
      try {
        await fullscreenContent.current.requestFullscreen();
      } catch (error) {
        console.error({error});
      }
    };
  }, [fullscreenContent]);

  const exitFullscreen = useCallback(() => {
    try {
      if (fullscreenContent.current && document?.fullscreenElement) {
        document.exitFullscreen();
      }
    } catch (error) {
      console.error({error});
    }
  }, [fullscreenContent]);

  const onFullscreenChange = useCallback(() => {
    if (document.fullscreenElement) {
      dispatch({ type: 'SET_FULLSCREEN', payload: true});
    } else {
      dispatch({ type: 'SET_FULLSCREEN', payload: false});
    }
  }, [dispatch]);

  // Fullscreen
  useEffect(() => {
    if (fullscreenContent.current) {
      fullscreenContent.current.addEventListener('fullscreenchange', onFullscreenChange, false);
      return (() => {
        fullscreenContent.current && fullscreenContent.current.removeEventListener('fullscreenchange', onFullscreenChange, false);
      })
    }
  }, [fullscreenContent, dispatch, onFullscreenChange]);

  useEffect(() => {
    if (fullscreen) {
      goFullscreen();
    } else {
      exitFullscreen();
    }
  }, [fullscreen, goFullscreen, exitFullscreen]);

  return (
    <div style={{position: 'relative'}} ref={fullscreenContent}>
      {children}
    </div>
  )
}

export default Fullscreenable;
