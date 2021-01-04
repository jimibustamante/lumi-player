import React, { useRef, useEffect, useCallback } from 'react';
import { usePlayer } from '../contexts/player-context';
import { FullscreenLogo } from '../styles/main';
import Barbanegra from '../assets/images/logo_barbanegra_yellow.png'
import Barbazul from '../assets/images/logo_barbazul_white.png'
const Fullscreenable = ({ children }) => {
  const fullscreenContent = useRef();
  const [playerState, dispatch] = usePlayer();
  const { fullscreen, storeName } = playerState;
  const src = () => {
    switch (storeName) {
      case 'barbazul':
        return Barbazul;
      case 'barbanegra':
        return Barbanegra;
      default:
        return Barbazul;
    }
  }
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
      {fullscreen && (
        <FullscreenLogo src={src()} alt='' />
      )}
      {children}
    </div>
  )
}

export default Fullscreenable;
