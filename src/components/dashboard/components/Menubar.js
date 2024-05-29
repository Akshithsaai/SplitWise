import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Menubar(props) {

  const navigate = useNavigate();

  function handleSelectedTab(tabName) {
    props.setSelectedTab(tabName);
  }  
  function handleSignout(){
    // toast.update("SignedOut Successfully")
    localStorage.clear();
    window.location.reload();
  }
  return (  
    <Box
    display="flex"
    alignItems="center"
    flexDirection="column"
    columnGap="20px"
    width="200px"
    height="100vh"
    >
        <Box 
        marginTop="10px" 
        height="5vh" 
        sx={{cursor:"pointer"}}
<<<<<<< HEAD
        onClick={()=>{handleSelectedTab("Home");navigate('/dashboard')}}
        >
        <Typography>EasySplit</Typography>
=======
        onClick={()=>{navigate('/dashboard')}}
        >
        <Typography>SplitWise</Typography>
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
        </Box>
        <IconButton 
            sx={{borderRadius: "0", width: "100%"}}
            onClick={() => {handleSelectedTab("Home")}}
        >
            <HomeIcon color={props.selectedTab === "Home" ? "primary" : ""}/>
            <Typography marginLeft={1} color={props.selectedTab === "Home" ? "primary" : ""}>Home</Typography>
        </IconButton>
        <IconButton 
            sx={{borderRadius: "0", width: "100%"}}
            onClick={() => {handleSelectedTab("Groups")}}
        >
            <PeopleIcon color={props.selectedTab === "Groups" ? "primary" : ""}/>
            <Typography marginLeft={1} color={props.selectedTab === "Groups" ? "primary" : ""}>Groups</Typography>
        </IconButton>
        <IconButton 
            sx={{borderRadius: "0", width: "100%"}}
            onClick={() => {handleSelectedTab("Friends")}}
        >
            <GroupsIcon color={props.selectedTab === "Friends" ? "primary" : ""}/>
            <Typography marginLeft={1} color={props.selectedTab === "Friends" ? "primary" : ""}>Friends</Typography>
        </IconButton>
        {/*<IconButton 
            sx={{borderRadius: "0", width: "100%"}}
            onClick={() => {handleSelectedTab("Invite")}}
        >
            <PersonAddAlt1Icon color={props.selectedTab === "Invite" ? "primary" : ""}/>
            <Typography marginLeft={1} color={props.selectedTab === "Invite" ? "primary" : ""} >Invite</Typography>
        </IconButton>*/
        }
        <Divider orientation='horizontal' flexItem/>
        <IconButton
        sx={{borderRadius: "0", width: "100%"}}
        onClick={()=>handleSignout()}
        >
        <LogoutIcon/>
        <Typography marginLeft={1}>SignOut</Typography></IconButton>
    </Box>
  )
}

export default Menubar