export interface storeType {
    initUser:initUser,
    IAction:IAction,
    editData:contentTyps
}
export interface userInfoStore {
    userInfo:userInfo,
    IAction:userAction,
}
export interface initUser {
    id:string,
    name:string 
}
export interface IAction {
    type:String,
    data:contentTyps
}
export interface deepData {
    id:string,
    content:string,
    children:deepData[]
}
export interface contentTyps {
    title:string
    contentDetail:deepData[]
}

export interface userAction{
    type:String,
    data:userInfo
}
export interface userInfo{
    count:string,
    isRequest:boolean
}