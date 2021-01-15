const ACCESS_TOKEN = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;
const USER_ID = process.env.REACT_APP_VIMEO_USER_ID;
const ADV_FOLDER_ID = process.env.REACT_APP_ADV_FOLDER_ID;

export default class LumiApi {
  constructor() {
    this.accessToken = ACCESS_TOKEN;
    this.page = 1;
    this.per_page = 5;
  }

  resetPage = () => {
    this.page = 1;
  }

  getFolderVideos = async (folderId) => {
    folderId = folderId || '3257320';
    try {
      let response = await window.fetch(
        `https://api.vimeo.com/users/${USER_ID}/projects/${folderId}/videos?page=${this.page}&per_page=${this.per_page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`,
          },
        },
      );
      response = await response.json();
      console.log({videos: response});
      this.page += 1;
      return response;
    } catch (error) {
      console.error(error);
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
      console.log(error);
    }
  }
}
