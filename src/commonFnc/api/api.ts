import React from 'react'
import request from '../request'
import {contentTyps} from '../../reducer/types'

export const getUserMsg = ():any=>{return request({url:'/api/userMsg/content',method:'GET'})}
export const saveUserMsg = (data:any):any=>{return request({url:'/api/userMsg/content/update',method:'PUT',data})}

