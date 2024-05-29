import logo from './logo.svg';
import './App.css';
import { Fragment, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'material-react-toastify';
import AppRoutes from './routes/AppRoutes';
import "material-react-toastify/dist/ReactToastify.css";
import { CssBaseline, Switch } from '@mui/material';

function App() {
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

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer />
      <AppRoutes />
      {/*<Switch checked={theme} onChange={handleChange} color="default"/>*/}
    </ThemeProvider>
  );
}

export default App;
