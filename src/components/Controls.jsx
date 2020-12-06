import React, { useEffect, useRef, useCallback } from 'react';
import {
  PlayButton,
  PauseButton,
  Overlay,
} from '../styles/main';
import { usePlayer } from '../contexts/player-context';

const Controls = () => {
  const [playerState, dispatch] = usePlayer();
  const { playing, showOverlay } = playerState;
  const timer = useRef(null);

  useEffect(() => {
    if (!showOverlay) return;
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      dispatch({ type: 'HIDE_VIDEO_OVERLAY'});
    }, [2500]);
    return (() => {
      clearTimeout(timer.current);
    })
  }, [showOverlay, dispatch]);

  const showVideoOverlay = useCallback(() => {
    dispatch({ type: 'SHOW_VIDEO_OVERLAY' })
  }, [dispatch]);

  const hideVideoOverlay = useCallback(() => {
    dispatch({ type: 'HIDE_VIDEO_OVERLAY' })
  }, [dispatch]);

  const toggleFullScreen = useCallback((event) => {
    event.preventDefault()
    dispatch({ type: 'TOGGLE_FULLSCREEN'})
  }, [dispatch]);

  return (
    <Overlay
      onMouseLeave={hideVideoOverlay}
      onMouseMove={showVideoOverlay}
      onDoubleClick={toggleFullScreen}
      style={{opacity: showOverlay ? '1' : '0'}}
      >
      {playing && (
        <PauseButton size='8rem' onClick={() => dispatch({ type: 'PAUSE'})} />
      )}
      {!playing && (
        <PlayButton size='8rem' onClick={() => dispatch({ type: 'PLAY'})} />
      )}
    </Overlay>
  )
}

export default Controls;
