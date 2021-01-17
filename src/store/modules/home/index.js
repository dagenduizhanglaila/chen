import http from '../../../api/requst.js'
import * as usermanage from './usermanage.js'
// 相当于单页面的data（变量）
const state = Object.assign({},
    usermanage.state
    )

// // 相当于单页面的compute(计算属性)
 const getters = Object.assign({},
    usermanage.getters
    )

// // 同步方法
 const mutations = Object.assign({},
    usermanage.mutations
    )

// 异步方法  相当于单
 const actions = Object.assign({},
    usermanage.actions
    )

export default {
    naemspaced:true,
    state,
    getters,
    mutations,
    actions
}