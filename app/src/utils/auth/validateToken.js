import api from '../../services/api';

export default async function validateToken() {
  const { token } = JSON.parse(localStorage.getItem('@anime-control'));

  const headers = {
    authorization: `Bearer ${token}`,
  };

  const request = await api.post('auth/verify', {}, { headers })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  return request;
}
