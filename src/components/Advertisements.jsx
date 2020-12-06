import React, { useEffect, useState } from 'react';
import AdvVideo from './AdvPlayer';

const Advs = () => {
  const [advsVideos, setAdvsVideos] = useState([]);
  const [currentAdv, setCurrentAdv] = useState(null);
  const getAdvs = async () => {
    const advs = await window.LumiApi.getAdvsVideos()
    setAdvsVideos(advs);
  }

  useEffect(() => {
    setCurrentAdv(advsVideos[0]);
  }, [advsVideos]);

  useEffect(() => {
    getAdvs();
  }, []);

  const onVideoEnded = () => {

  };

  // console.log({advsVideos, currentAdv});
  return ( currentAdv ?
    <AdvVideo video={currentAdv} onEnded={onVideoEnded} />
    :
    null
  );
}

export default Advs;
