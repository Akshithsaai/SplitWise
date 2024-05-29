import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'material-react-toastify';
import AppRoutes from './routes/AppRoutes';
import "material-react-toastify/dist/ReactToastify.css";
import { CssBaseline, Switch } from '@mui/material';

<<<<<<< HEAD

function App() {
=======
function App() {

>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
    // const [theme,setTheme] = useState(true);
    // const currentTheme = createTheme({
    //   palette:{
    //     mode:theme?'dark':'light',
    //   }
    // });
    // const handleChange = (event) => {
    //   setTheme(event.target.checked);
    // }
  const theme = createTheme();
  return (
<<<<<<< HEAD
    
=======
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer />
      <AppRoutes />
      {/*<Switch checked={theme} onChange={handleChange} color="default"/>*/}
    </ThemeProvider>
  );
}

export default App;
