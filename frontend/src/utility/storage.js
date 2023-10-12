const token_name = 'exercise_log_token'


export function getToken(){
    return localStorage.getItem('exercise_log_token');
}

export function setToken(token){
    localStorage.setItem('exercise_log_token',token);
}


