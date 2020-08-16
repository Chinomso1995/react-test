import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://react-test-project-811a4.firebaseio.com/'
});

export default instance;