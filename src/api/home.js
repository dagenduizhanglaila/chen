import axios from 'axios'
import requst from './requst.js'
import qs from 'qs'
// const token = localStorage.getItem("token");

// 删除单个用户
export function remove(id){
    return requst({
        url:`http://localhost:8888/api/private/v1/users/${id}`,
        method:'delete',
    })
}

// 获取用户
export function getuser(page = 1, size = 2) {
    
    let url = `http://localhost:8888/api/private/v1/users?pagenum=${page}&pagesize=${size}`;
   return requst.get(url)
}


// 修改用户信息
export function putusers (parmas){
    let {email,mobile} = parmas
    let url = `http://localhost:8888/api/private/v1/users/${parmas.id}`;
  return requst({ 
        url,
        method: "put",
        data:{email,mobile},// 用 qs 将js对象转换为字符串 'name=edward&age=25'
      })
}

// 修改用户状态
export function userstate(scope){
  return  requst({
        url:`http://localhost:8888/api/private/v1/users/${scope.row.id}/state/${scope.row.mg_state}`,
        method:"put",
    })
}


// 查找
export function serachId(id){
      return requst({
            url:`http://localhost:8888/api/private/v1/users/${id}`,
            method:'get',
         
        })
}
