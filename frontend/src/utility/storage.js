const token_name = 'exercise_log_token'
const log_name = 'exercise_log_log'
const page_name = 'exercise_log_page'

//User token
/**
 * Get the users token
 * @returns {string} the users jwt token
 */
export function getToken(){
    return localStorage.getItem(token_name);
}

/**
 * Set the users token 
 * @param {string} token - token to be the new users token
 */
export function setToken(token){
    localStorage.setItem(token_name,token);
}

/**
 * Remove the users token
 */
export function removeToken(){
    localStorage.removeItem(token_name);
}


/**
 * Get the users most recent workout log (mongo id)
 * @returns {string} - the most recent workout id
 */
export function getLog(){
    return localStorage.getItem(log_name)
}

/**
 * Set the most recent workout id
 * @param {string} log_id - workout log id to be placed as the new workout id 
 */
export function setLog(log_id){
    
    localStorage.setItem(log_name, log_id);
}

/**
 * Remove the most recent workout log
 */
export function removeLog(){
    localStorage.removeItem(log_name);
}

/**
 * Get the most recent user page
 * @returns {number} A number representing the last page the user was on
 */
export function getPage(){
    const p = localStorage.getItem(page_name)
    return p
}

/**
 * Set the users most recent page
 * @param {number} page - Page to be set as most recent  
 */
export function setPage(page){
    console.log(`Setting new Page : ${page}`)
    localStorage.setItem(page_name,page)
}

/**
 * Remove the most recent page
 */
export function removePage(){
    localStorage.removeItem(page_name)
}

/**
 * Function to remove all 
 */
export function clean(){
    removeLog();
    removePage();
    removeToken();
}

