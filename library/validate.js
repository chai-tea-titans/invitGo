export default function login_validate (values) {

const errors={};
 
// validation for username
if (!values.username) {
    errors.username = 'Required';
}


// validation for password
 if(!values.password){
    errors.password = "Required";
 
 }else if(values.password.length <8 || values.password.lenght>20){
    errors.password = "Must be greater than 8 and less than 20 characters long";
 }else if(values.password.includes(" ")){
errors.password ="Invalid Password";
 }

 return errors;
}



export function resgisterValidate(values){
    const errors ={};

    // validation for username
    if(!values.username){
        errors.username = "Required"

    }  else if(values.username.includes(" ")){
        errors.username = "Invalid Username"

    }
        // validation for password
    if(!values.password){
        errors.password = "Required";
    
        }else if(values.password.length <8 || values.password.lenght>20){
            errors.password = "Must be greater than 8 and less than 20 characters long";
        }else if(values.password.includes(" ")){
        errors.password ="Invalid Password";
        }
    
        // validation for email
        if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          // validation for name
          if(!values.name){
            errors.name = "Required"
    
        }  
        return errors;

}
