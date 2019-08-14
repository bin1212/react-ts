export interface storeType {
    initUser:initUser,
    IAction:IAction,
    editData:any
}
export interface initUser {
    id:string,
    name:string 
}
export interface IAction {
    type:String,
    payload:any
}
