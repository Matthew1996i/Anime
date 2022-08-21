/*
  change the api/app variables to:
  Local if using locally and
  Develop if uploading the application.
*/

const urlConfig = {
  enviroment: {
    api: 'local',
    app: 'local',
  },
  local: {
    api: 'http://localhost:3000',
    app: 'http://localhost:3001',
  },
  develop: {
    api: 'https://api.animecontrol.xyz',
    app: 'https://animecontrol.xyz',
  },
};

export default urlConfig;
