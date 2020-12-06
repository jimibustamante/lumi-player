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

  const onTimeUpdate = useCallback(({ seconds }) => {
    console.log({seconds})
    if (seconds >= RUNNING_TIME) {
      player.current.unload();
      dispatch({ type: 'SET_ADV_RUNNING', payload: false});
    }
  }, [dispatch]);

  const onLoaded = () => {
    
  }

  useEffect(() => {
    if (!player.current) {
      const options = {
        id: getVimeoId(video),
        controls: false,
        autopause: false,
        // width: 900,
        muted: true,
        autoplay: false,
      }
      player.current = new Vimeo('adv-video', options);
      player.current.ready(() => {
        console.log('ready');
        player.current.play();
      })
      player.current.on('ended', onEnded);
      player.current.on('timeupdate', onTimeUpdate);
      // player.current.on('pause', onPause);
      player.current.on('loaded', onLoaded);
      return (() => {
        player.current.off('ended');
        // player.current.off('timeupdate');
        // player.current.off('pause', onPause);
        player.current.off('loaded');
      });
    }
  }, [video, onTimeUpdate, onEnded]);

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
