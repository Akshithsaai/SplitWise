import React, { useState } from 'react'
import { 
  CONFIRM_PASSWORD_MISSING,
  CONFIRM_PASSWORD_NOT_MATCHING,
  INVALID_EMAIL_ADDRESS,
  INVALID_PASSWORD, 
  LOGIN_EMAIL_FIELD_MISSING, 
  LOGIN_NAME_MISSING, 
  LOGIN_PASSWORD_MISSING
} from '../../config/Constants';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../config/Config';
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { useNavigate } from 'react-router-dom';
import { userAuthSignUpRequest } from '../../services/user';
import { toast } from 'material-react-toastify';


function SignUp() {
  const [details, setDetails] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  })
  
  const [errorDetails, setErrorDetails]  = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate  = useNavigate();
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setDetails(prev => ({...prev, [name]: value}));
  }
  
  function handleSignUp() {
    const errors = {
        fullName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
    }
    let isError = false;
    if(!details.fullName) { 
      errors.fullName = LOGIN_NAME_MISSING
      isError = true
    } 
    if(details.fullName){
      const [firstName, lastName] = details.fullName.split(' ');
      if(!firstName || !lastName){
        errors.fullName = LOGIN_NAME_MISSING
        isError = true
      }
    }
    if(!details.emailAddress) { 
      errors.emailAddress = LOGIN_EMAIL_FIELD_MISSING
      isError = true
    } 
    else if(!details.emailAddress.match(EMAIL_REGEX)) {
      errors.emailAddress = INVALID_EMAIL_ADDRESS
      isError = true
    }
    if(!details.password) { 
      errors.password = LOGIN_PASSWORD_MISSING
      isError = true;
    }
    else if(!details.password.match(PASSWORD_REGEX)) {
      errors.password = INVALID_PASSWORD
      isError = true
    }
    if(!details.confirmPassword) { 
        errors.confirmPassword = CONFIRM_PASSWORD_MISSING   
        isError = true
      } 
      else if(details.confirmPassword!==details.password){
        errors.confirmPassword = CONFIRM_PASSWORD_NOT_MATCHING
        isError = true
      }
    if(isError) {
      setErrorDetails(errors)
    } else {
      const [firstName, lastName] = details.fullName.split(' ');
      const data = {
        email: details.emailAddress,
        password: details.password,
        firstName: firstName,
        lastName: lastName
      }
      setIsLoading(true);
      userAuthSignUpRequest(data)
      .then(res => {
        toast.success("User created successfully");
        navigate("/login")
      })
      .catch(error => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsLoading(false);
      })
      setErrorDetails({
        emailAddress: "",
        password: "",
      })
    }
  }
    
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="300px"
      >
        <TextField
          variant="outlined"
          label="Full Name"
          name="fullName"
          onChange={handleChange}
          error={errorDetails.fullName ? true : false}
          helperText={errorDetails.fullName}
          required
          fullWidth
          sx={{my: 1}}
        />
        <TextField
          variant="outlined"
          label="Email address"
          name="emailAddress"
          onChange={handleChange}
          error={errorDetails.emailAddress ? true : false}
          helperText={errorDetails.emailAddress}
          required
          fullWidth
          sx={{my: 1}}
        />
        <TextField
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          error={errorDetails.password ? true : false}
          helperText={errorDetails.password}
          required
          fullWidth
          sx={{my: 1}}
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          error={errorDetails.confirmPassword ? true : false}
          helperText={errorDetails.confirmPassword}
          required
          fullWidth
          sx={{my: 1}}
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleSignUp}
          fullWidth
          sx={{my: 1}}
        >
          Sign Up
        </LoadingButton>
        <Typography>
          Already a User? <Link sx={{cursor: "pointer"}} onClick={()=> navigate("/login")}>login</Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default SignUp