import axios from 'axios'

export function getuser(){
let url = `http://localhost:8888/api/private/v1/users`
axios.get(url);
};

export function getuser(page = 1, size = 2) {
    let url = `http://localhost:8888/api/private/v1/users?pagenum=${page}&pagesize=${size}`;
    let token = localStorage.getItem("token");
    axios.get(url, { headers: { Authorization: token } })
  }
