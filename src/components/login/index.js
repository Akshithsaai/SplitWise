import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userAuthLoginRequest } from "../../services/user"
import { toast } from "material-react-toastify"

function Login() {
  const [details, setDetails] = useState({
    emailAddress: "",
    password: "",
  })

  const [errorDetails, setErrorDetails]  = useState({
    emailAddress: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setDetails(prev => ({...prev, [name]: value}));
  }

  function handleLogin() {
    const errors = {
      emailAddress: "",
      password: "",
    }
    let isError = false;
    if(!details.emailAddress) { 
      errors.emailAddress = "Please enter Email address"
      isError = true
    } 
    if(!details.password) { 
      errors.password = "Please enter password"
      isError = true;
    }
    if(isError) {
      setErrorDetails(errors)
    } else {
      const data = {
        email: details.emailAddress,
        password: details.password
      }
      setIsLoading(true);
      userAuthLoginRequest(data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.id)
        toast.success("User logged in successfully")
        navigate('/dashboard')
      })
      .catch(error =>{
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false)
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
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box><Typography>SplitWise</Typography></Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="300px"
      >
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
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{my: 1}}
        >
          Login
        </LoadingButton>
        <Typography>
          Not a User? <Link sx={{cursor: "pointer"}} onClick={()=> navigate("/signUp")}>Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login