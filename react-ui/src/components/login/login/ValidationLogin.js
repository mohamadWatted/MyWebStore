const ValidationLogin = (formData) => {
  let errors = {};
  
  if (!formData.emailaddress) {
      errors.emailaddress = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.emailaddress)) {
      errors.emailaddress = "Email address is invalid";
  } 
  
  if (!formData.password) {
      errors.password = "Password is required";
  } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
  } else if (formData.password.length > 50) {
      errors.password = "Password must be less than 50 characters long";
  } 
  
  return errors;
};

export default ValidationLogin;
