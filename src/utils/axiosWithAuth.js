import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: "https://wunder-list-api.herokuapp.com/"
    })
}

export default axiosWithAuth;