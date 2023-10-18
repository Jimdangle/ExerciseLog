
/* const inputs = {
        "Email": {
            type: "email",
            value: state['Email'],
            validation: emailValidation,
            error: "Please us a valid email",
            placeholder:"bilbo@swaggins.com"
         },
    } */


export class Inputs{
    constructor(){
        this.inputs = null;
    }

}

export class Input{
    constructor(type='text',value='',validation=(v)=>{return true},error=''){
        this.type=type;
        this.value = value;
        this.validation=validation;
        this.error = error;
    }
}