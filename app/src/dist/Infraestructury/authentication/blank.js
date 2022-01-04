import axios from 'axios';
import urlConfig from '../../../router/urlConfig';

export default async function verifyToken() {
  const baseURL = urlConfig[urlConfig.enviroment.api].api;

  const localItem = localStorage.getItem('anime-control');

  const objectLocal = JSON.parse(localItem);

  const headers = {
    authorization: `Bearer ${objectLocal.token}`,
  };

  const response = await axios.post(`${baseURL}/user/verifyusertoken`, {}, {
    headers,
  });

  return response.data === 'token valid!';
}
