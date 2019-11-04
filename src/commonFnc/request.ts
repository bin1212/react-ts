import React from 'react'
import axios from 'axios'


const instance = axios.create({
    baseURL:window.origin.includes('localhost')?'http://localhost:3000':window.location.origin,
    headers: { 'content-type': 'application/json' }
})
instance.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err)
})


export default instance