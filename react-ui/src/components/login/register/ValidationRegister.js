const Validation = (formData) => {
  let errors = {};

  if (!formData.firstname.trim()) {
    errors.firstname = "First name is required";
  } else if (!/^[a-zA-Z]+$/.test(formData.firstname)) {
    errors.firstname = "First name is invalid";
  } else if (formData.firstname.length < 3) {
    errors.firstname = "First name must be at least 3 characters long";
  } else if (formData.firstname.length > 50) {
    errors.firstname = "First name must be less than 50 characters long";
  } else if (formData.firstname === formData.confirmfirstname) {
    errors.firstname = "First names do not match";
  }

  if (!formData.lastname.trim()) {
    errors.lastname = "Last name is required";
  } else if (!/^[a-zA-Z]+$/.test(formData.lastname)) {
    errors.lastname = "Last name is invalid";
  } else if (formData.lastname.length < 3) {
    errors.lastname = "Last name must be at least 3 characters long";
  } else if (formData.lastname.length > 50) {
    errors.lastname = "Last name must be less than 50 characters long";
  } else if (formData.lastname === formData.confirmlastname) {
    errors.lastname = "Last names do not match";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
    errors.username = "Username is invalid";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  } else if (formData.username.length > 15) {
    errors.username = "Username must be less than 50 characters long";
  } else if (formData.username === formData.confirmusername) {
    errors.username = "Usernames do not match";
  }

  if (!formData.emailaddress) {
    errors.emailaddress = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.emailaddress)) {
    errors.emailaddress = "Email address is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
};

export default Validation;
