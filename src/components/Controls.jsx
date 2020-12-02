import React from 'react';
import {
  PlayButton,
  PauseButton,
  ToggleContainer,
} from '../styles/main';
import { usePlayer } from '../contexts/player-context';
const Controls = () => {
  const [playerState, dispatch] = usePlayer();
  const { playing } = playerState;
  console.log({playing});
  return (
    <ToggleContainer>
      {playing && (
        <PauseButton size='8rem' onClick={() => dispatch({ type: 'PAUSE'})} />
      )}
      {!playing && (
        <PlayButton size='8rem' onClick={() => dispatch({ type: 'PLAY'})} />
      )}
    </ToggleContainer>
  )
}

export default Controls;
