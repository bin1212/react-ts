import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {goto} from './history'

type TypeMethod = "get" | "post" | "put" | "delete"

const instance = axios.create({
    baseURL:window.origin.includes('localhost')?'http://localhost:3000':window.location.origin,
    headers: { 'content-type': 'application/json' }
})

instance.interceptors.request.use(function(config:any){
    const access_token = Cookies.get('access_token')
    if (access_token) {
        config.headers.Authorization ='bearer '+ access_token
    }else{
        goto('/login')
    }
    return config
},function(err){
    return Promise.reject(err)
})
instance.interceptors.response.use(
    (response: any) => {
        // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
        const res = response.data;
        if (response.status !== 200) {
            if (response.status === 401) {
                // console.log(111)
                console.warn('no auth')
                goto('/login')
            }
            return Promise.reject('error');
        } else {
            return Promise.resolve(res);
        }
    },
    (error: any) => {
        // 异常处理
        const res = error.response
        if (res.status === 401) {
            console.warn('no auth')
            goto('/login')
        }
        console.log(error)
        return Promise.reject(error);
    },
);


export default instance