import React, { useEffect, useState } from 'react';
import AdvVideo from './AdvPlayer';
import { usePlayer } from '../contexts/player-context';

const Advs = () => {
  const [advsVideos, setAdvsVideos] = useState([]);
  const [currentAdv, setCurrentAdv] = useState(null);
  const [playerState, dispatch] = usePlayer();
  const { advListId } = playerState;
  const getAdvs = async () => {
    const advs = await window.LumiApi.getAdvsVideos(advListId);
    setAdvsVideos(advs);
  }

  useEffect(() => {
    setCurrentAdv(advsVideos[0]);
  }, [advsVideos]);

  useEffect(() => {
    getAdvs();
  }, []);

  const onVideoEnded = () => {
    if (!currentAdv) return;
    const currentIndex = advsVideos.indexOf(advsVideos.find(v => v.uri === currentAdv.uri));
    let nextAdv = advsVideos[currentIndex + 1]
    if (!nextAdv) {
      nextAdv = advsVideos[0];
    }
    if (nextAdv.uri !== currentAdv.uri) {
      setCurrentAdv(nextAdv);
    }
  };

  return ( currentAdv ?
    <AdvVideo video={currentAdv} onEnded={onVideoEnded} />
    :
    null
  );
}

export default Advs;
