export interface storeType {
    initUser:initUser,
    IAction:IAction
}
export interface initUser {
    id:string,
    name:string 
}
export interface IAction {
    type:String,
    payload:any
}