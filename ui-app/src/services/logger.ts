
export const repeat = (str:string, times:number) => (new Array(times + 1)).join(str);

export const pad = (num:number, maxLength:number) => repeat('0', maxLength - num.toString().length) + num;

export const formatTime  = (time:Date) => `${pad(time.getHours(),2)}:${pad(time.getMinutes(),2)}:${pad(time.getSeconds(),2)}:${pad(time.getMilliseconds(),3)}}`

export const timer =(typeof performance !== 'undefined' && performance !== null) && typeof performance.now === 'function' ?  performance :  Date;

interface State {
    getState? :any
}
interface Action {
    type? :string,
    payload? :any
}
interface LogLevel {
    Error? :string,
    Info?: string,
    Warn?: string,
    Fatal?: string,

}
/**
 * Get log level string based on supplied params
 *
 * @param {string | function | object} level - console[level]
 * @param {action} action - selected action
 * @param {array} payload - selected payload
 * @param {string} type - log entry type
 *
 * @returns {string} level
 */
function getLogLevel(level:any,action:Action,payload:any,type:string){

    switch (typeof level) {
        case 'object':
            return typeof level[type] === 'function' ? level[type](...payload) : level[type];
            break;
        case 'function':
            return level(action);
            break;
        default:
            return level;
    }
}

export  function writeToLog(msg:string, dsdsd:string,params:any){
    const logLevel:LogLevel = {
        Warn:'warning',
        Info:'info',
        Error:'error',
        Fatal:'fatal'
    }
    try{
        params = JSON.parse(JSON.stringify(params));
        let value: string = '';
        value =   formatTime(new Date());
        // value += 'Type:%c' + logLevel.Error
    }catch{

    }
}
export default function logger(state:State) {

    return (next:(arg0:any)=>any) => (action:Action) => {

        console.groupCollapsed('Type: '+action.type,"color:red")
        // const [type] = act?
        console.log('%c will dispatch',"color:green;font-weight:bold", action)
        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)
        console.log('%c state after dispatch',"color:yellow", state.getState())
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        console.groupEnd();
        return returnValue
    }
  }
