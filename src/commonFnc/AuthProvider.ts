import React from 'react'
import Cookies from 'js-cookie';

interface loginParams {
    token:string,
    tokenExpireTime:number
}
class AuthProvider {
    // 登录处理
    onLogin(loginParams:loginParams) {
        // const newTime = Date.now();
        // const timeQuantum = tokenExpireTime + newTime;
        // console.log(timeQuantum)
        this.saveToken(loginParams.token, loginParams.tokenExpireTime);
    }
    saveToken(access_token:string, expires_in:number) {
        let exp = new Date();
        exp.setTime(exp.getTime() + expires_in * 1000 - 30000);
        // exp.setTime(exp.getTime() + 10000);
        Cookies.set('access_token', escape(access_token), { expires: exp, });
        // Cookies.set('refresh_token', escape(refresh_token),{ expires: 30, }); //接口没反返回过期时间，暂时设置为1天
    }
}

export default new AuthProvider();