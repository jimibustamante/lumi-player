import React, { useRef, useEffect, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import { AdvVideo } from '../styles/main';
import { usePlayer } from '../contexts/player-context';

const RUNNING_TIME = 10; // seconds

const AdvPlayer = ({ video, onEnded }) => {
  const player = useRef(null);
  const videoRef = useRef(null);
  const [playerState, dispatch] = usePlayer();
  const { advRunning } = playerState;
  function getVimeoId({uri}) {
    return uri.split('/videos/')[1];
  }

  const onAdvEnded = useCallback(() => {
    onEnded();
    player.current.unload();
    dispatch({ type: 'SET_ADV_RUNNING', payload: false});
  }, [onEnded, dispatch]);

  // const onTimeUpdate = useCallback(({ seconds }) => {
  //   if (seconds >= RUNNING_TIME) {
  //     onEnded();
  //     player.current.unload();
  //     dispatch({ type: 'SET_ADV_RUNNING', payload: false});
  //   }
  // }, [dispatch, onEnded]);

  useEffect(() => {
    if (!player.current) return; 
    player.current.loadVideo(getVimeoId(video));
  }, [video]);

  const onLoaded = () => {
    
  }

  useEffect(() => {
    if (!player.current) {
      const options = {
        id: getVimeoId(video),
        controls: false,
        autopause: false,
        muted: true,
        autoplay: false,
      }
      player.current = new Vimeo('adv-video', options);
      player.current.ready(() => {
        player.current.play();
      })
      player.current.on('ended', onAdvEnded);
      // player.current.on('timeupdate', onTimeUpdate);
      player.current.on('loaded', onLoaded);
    }
  }, [video, onAdvEnded]);

  useEffect(() => {
    if (advRunning) {
      player.current.play()
    }
  }, [advRunning]);

  return (video && (
      <AdvVideo id='adv-video' advRunning={advRunning} ref={videoRef} />
    )
  )
};

export default AdvPlayer;
