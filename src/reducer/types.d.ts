export interface storeType {
    initUser:initUser,
    IAction:IAction,
    editData:contentTyps
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
