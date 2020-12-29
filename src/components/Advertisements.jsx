import React, { useRef, useEffect, useState, useCallback } from 'react';
import AdvVideo from './AdvPlayer';
import { usePlayer } from '../contexts/player-context';

const ADV_FREQUENCY = 15000;

const Advs = () => {
  const [advsVideos, setAdvsVideos] = useState([]);
  const [playerState, dispatch] = usePlayer();
  const { advListId, currentAdvId, advRunning } = playerState;
  const currentAdv = useRef(null);
  const advTimer = useRef(null);

  const restartTimer = useCallback(() => {
    clearTimeout(advTimer.current);
    advTimer.current = setTimeout(() => {
      dispatch({ type: 'SET_ADV_RUNNING', payload: true});
      clearTimeout(advTimer.current);
    }, ADV_FREQUENCY);
  }, [advTimer, dispatch]);

  useEffect(() => {
    if (advRunning) return;
    restartTimer();
  }, [advRunning, restartTimer]);

  const getAdvs = useCallback(async () => {
    const advs = await window.LumiApi.getAdvsVideos(advListId);
    setAdvsVideos(advs);
  }, [setAdvsVideos, advListId])

  useEffect(() => {
    advsVideos.length && dispatch({ type: 'SET_CURRENT_ADV_ID', payload: advsVideos[0].uri});
  }, [advsVideos, dispatch]);

  useEffect(() => {
    getAdvs();
  }, [getAdvs]);

  useEffect(() => {
    const adv = advsVideos.find(adv => adv.uri === currentAdvId);
    if (adv && currentAdv.current?.uri !== adv.uri) {
      currentAdv.current = adv;
    }
  }, [currentAdvId, advsVideos]);

  const onVideoEnded = () => {
    if (!currentAdv.current) return;
    const currentIndex = advsVideos.indexOf(advsVideos.find(v => v.uri === currentAdv.current.uri));
    let nextAdv = advsVideos[currentIndex + 1]
    if (!nextAdv) {
      nextAdv = advsVideos[0];
    }
    if (nextAdv.uri !== currentAdv.current?.uri) {
      currentAdv.current = nextAdv;
      dispatch({ type: 'SET_CURRENT_ADV_ID', payload: nextAdv.uri});
      restartTimer();
    }
  };

  return ( currentAdv.current ?
    <AdvVideo currentAdvId={currentAdvId} video={currentAdv.current} onEnded={onVideoEnded} />
    : 
    null
  );
}

export default Advs;
