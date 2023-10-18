const token_name = 'exercise_log_token'
const log_name = 'exercise_log_log'
const page_name = 'exercise_log_page'

//User token
export function getToken(){
    return localStorage.getItem(token_name);
}
export function setToken(token){
    localStorage.setItem(token_name,token);
}
export function removeToken(){
    localStorage.removeItem(token_name);
}


//Recent workout log
export function getLog(){
    return localStorage.getItem(log_name)
}
export function setLog(log_id){
    console.log(`Setting new log to ${log_id}`)
    localStorage.setItem(log_name, log_id);
}
export function removeLog(){
    localStorage.removeItem(log_name);
}

export function getPage(){
    const p = localStorage.getItem(page_name)
    return p
}
export function setPage(page){
    console.log(`Setting new Page : ${page}`)
    localStorage.setItem(page_name,page)
}
export function removePage(){
    localStorage.removeItem(page_name)
}

