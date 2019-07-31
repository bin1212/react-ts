export interface storeType {
    initTestUser:initTestUser,
    IAction:IAction
}
export interface initTestUser {
    id:string,
    name:string 
}
export interface IAction {
    type:String,
    payload:any
}