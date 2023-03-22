const RegisterSubmit = (event)=>{
event.preventDefault();
const formData = {
    username,
    name,
    password,
    email

}

axios.post('/api/users/addUsers', formData)
      .then(response => {
        console.log('User created:', response.data);
        // handle success response here
      })
      .catch(error => {
        
        console.error('Error creating user:', error);
        // handle error response here
      });
}
export default RegisterSubmit;