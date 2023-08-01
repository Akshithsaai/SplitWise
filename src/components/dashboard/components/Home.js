import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import CreateGroup from './CreateGroupDialog'

function Home() {
  const [createGroupDialog, setCreateGroupDialog] = useState(false)
    
  return (
    <Box>
    <Button 
    sx={{m:"20px"}}
    variant='contained' 
    
    >
        Create Group
    </Button>
    
   
    </Box>
  )
}

export default Home