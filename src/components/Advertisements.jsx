import React, { useEffect, useState } from 'react';

const Advs = () => {
  const [advsVideos, setAdvsVideos] = useState([]);
  const getAdvs = async () => {
    const advs = await window.LumiApi.getAdvsVideos()
    setAdvsVideos(advs);
  }
  useEffect(() => {
    getAdvs();
  }, []);
  return('')
}

export default Advs;
