import React from 'react'
import request from '../request'
import {contentTyps} from '../../reducer/types'


export const getUserMsg = ():any=>{return request({url:'/api/userMsg/content',method:'GET'})}
export const saveUserMsg = (data:any):any=>{return request({url:'/api/userMsg/content/update',method:'PUT',data})}

export const change_password = (data:any):any=>{return request({url:'/api/userMsg/user/change_password',method:'PUT',data})}
export const logout = ():any=>{return request({url:'/api/auth/logout',method:'PUT'})}
