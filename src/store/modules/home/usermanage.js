import http from '../../../api/requst'

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
    // 删除单个用户
    removeuser(context,data){   
      return   http({
        url:`http://localhost:8888/api/private/v1/users/${data}`,
        method:'delete'
        })
    },

    // 修改单个用户状态
    putstate(context,data){
        return http({
          url:`http://localhost:8888/api/private/v1/users/${data.id}/state/${data.mg_state}`,
          method:'put'
        })
      },

    //  生成用户列表信息
    getuser(context,data){
        console.log(data,"222"); 
       return http({
           url:`http://localhost:8888/api/private/v1/users`,
           method:'get',
           params:{...data}
       })
    },

    // 修改单个用户资料
    putuser(context,data){
        return http({
            url:`http://localhost:8888/api/private/v1/users/${data.id}`,
            method:'put',
            data:`email=${data.email}&mobile=${data.mobile}`
        })
    }



};