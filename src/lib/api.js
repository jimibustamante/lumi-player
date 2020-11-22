const ACCESS_TOKEN = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;
const USER_ID = process.env.REACT_APP_VIMEO_USER_ID;
export default class LumiApi {
  constructor() {
    this.accessToken = ACCESS_TOKEN;
  }

  getFolderVideos = async (folderName) => {
    folderName = folderName || '2947384';
    try {
      let response = await window.fetch(
        `https://api.vimeo.com/users/${USER_ID}/projects/${folderName}/videos?sort=alphabetical`,
        {
          method: 'GET',
          headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      response = await response.json();
      console.log({data: response.data})
      return response.data;
    } catch (error) {
      alert(error.message);
    }
  }

  getOnDemandSource = async (video) => {
    let { uri } = video;
    uri = uri.replace('videos', 'video');
    const url = `https://player.vimeo.com${uri}/config?access_token=${ACCESS_TOKEN}`;
    try {
      let vod = await window.fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      vod = await vod.json();
      debugger
      const cdn = vod?.request?.files?.hls?.default_cdn;
      const hlsSrc = vod?.request?.files?.hls?.cdns[cdn]?.url;
      console.log({hlsSrc})
      // setHlsSource(hlsSrc);
    } catch (error) {
      console.log({ error });
    }
  }

  // async getVideo({videoId}) {
  //   const cacheVideo = videosCache.find(video => video.id === videoId);
  //   if (cacheVideo) {
  //     return cacheVideo;
  //   }
  //   const url = `${ROOT_PATH}/v1/accounts/${ACCOUNT_ID}/streams/${videoId}`;
  //   try {
  //     const response = await window
  //       .fetch(url, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `bearer ${this.accessToken}`,
  //         },
  //       })
  //       .then(res => res.json());
  //     return response;
  //   } catch (error) {
  //     if (this.accessToken) {
  //       return this.getVideo({videoId});
  //     }
  //   }
  // }

}
