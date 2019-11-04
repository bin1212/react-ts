export interface storeType {
    initUser:initUser,
    IAction:IAction,
    editData:deepData[]
}
export interface initUser {
    id:string,
    name:string 
}
export interface IAction {
    type:String,
    data:deepData[]
}
export interface deepData {
    id:string,
    content:string,
    children:deepData[]
}
