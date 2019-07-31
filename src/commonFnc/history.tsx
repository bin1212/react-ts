
import { createBrowserHistory } from "history";
// 创建一个history
let history = createBrowserHistory();
// 导出
export default history;
export function goto(name:string){
    history.push(name)
}