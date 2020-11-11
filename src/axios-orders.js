import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d86b9.firebaseio.com/'
});

export default instance; 