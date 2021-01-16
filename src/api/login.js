
import axios from 'axios';
const qs = require('qs')

export function login(userinfo){
    let url = "http://localhost:8888/api/private/v1/login";
    let user = qs.stringify(userinfo)
  return axios.post(url,user)
}
    

