import React, { useCallback } from 'react';
import { Button } from '../styles/main';
import { usePlayer } from '../contexts/player-context';

const Buttons = ({setRandomPlaylist, next}) => {
  const [playerState, dispatch] = usePlayer();

  const goFullscreen = useCallback(() => {
    dispatch({ type: 'SET_FULLSCREEN', payload: true})
  }, [dispatch]);

  const runAdv = useCallback(() => {
    dispatch({ type: 'SET_ADV_RUNNING', payload: true})
  }, [dispatch]);
  return (
    <>
      <Button onClick={goFullscreen}>Fullscreen!</Button>
      <Button onClick={next}>Next</Button>
      <Button onClick={setRandomPlaylist}>Random</Button>
      <Button onClick={runAdv}>Run adv</Button>
    </>
  )
};

export default Buttons;
