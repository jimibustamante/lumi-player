const ACCESS_TOKEN = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;
const USER_ID = process.env.REACT_APP_VIMEO_USER_ID;
const ADV_FOLDER_ID = process.env.REACT_APP_ADV_FOLDER_ID;

export default class LumiApi {
  constructor() {
    this.accessToken = ACCESS_TOKEN;
  }

  getFolderVideos = async (folderId) => {
    folderId = folderId || '2947384';
    try {
      let response = await window.fetch(
        `https://api.vimeo.com/users/${USER_ID}/projects/${folderId}/videos`,
        {
          method: 'GET',
          headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      response = await response.json();
      return response.data;
    } catch (error) {
      alert(error.message);
    }
  }

  getAdvsVideos = async (advListId) => {
    advListId = advListId || ADV_FOLDER_ID;
    try {
      let response = await window.fetch(
        `https://api.vimeo.com/users/${USER_ID}/projects/${advListId}/videos`,
        {
          method: 'GET',
          headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      response = await response.json();
      return response.data;
    } catch (error) {
      alert(error.message);
    }
  }
}
