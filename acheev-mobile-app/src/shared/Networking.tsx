import axios from 'axios';
import { isSimulator } from './Utilities';

let url = 'https://api.acheevdev.com/api/'

if (isSimulator()) {
  url = 'http://localhost:4060/api/'
  console.log("[Networking] Running on localhost");
}

const AppApi = axios.create({
  baseURL: url,
  timeout: 15 * 1000
});

AppApi.defaults.headers.common['Accept'] = 'application/json';
AppApi.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
AppApi.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


AppApi.interceptors.response.use((response) => response, (error) => {
  console.log('[Networking] Request error');
  return Promise.reject(error);
});

function setAuthToken(token: String) {
  console.log('[Networking] Setting auth token to: ' + token);
  axios.defaults.headers.common['token'] = `Bearer ${token}`;
}

export { AppApi, setAuthToken };