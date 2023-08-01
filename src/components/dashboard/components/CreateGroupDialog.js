import { Box, IconButton, Typography ,Dialog, Autocomplete, TextField, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import React, { useEffect, useState } from 'react'
import { addGroupRequest, getContactsRequest } from '../../../services/user';
import { createGroupRequest } from '../../../services/group';
import { toast } from 'material-react-toastify';

function CreateGroup(props) {
  const [contactDetails, setContactDetails] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName,setGroupName] = useState("");

  useEffect(() => {
    getContactsRequest()
    .then(res => {
      const data = res.data.length && res.data.map(user => {
        user.label = user?.firstName+" "+user?.lastName
        return user
      })
      setContactDetails(data)
    })
  },[])

  function handleClose(){
    setSelectedContacts([])
    props.setCreateGroupDialog(false)
  }

  function addContacts(contact){
    setSelectedContacts([...contact])
  }
  
  
  function handleGroup(){
    const currentUserId = localStorage.getItem("id");
    const contactIds = selectedContacts.map(user => user.id)
    const filteredContactIds = contactIds.filter((id) => (id!==currentUserId) ) 
    filteredContactIds.push(currentUserId);
    createGroupRequest({name:groupName, users: filteredContactIds})
    .then(res=>{
      if(res.data.id){
        const data = {
          userDetails: filteredContactIds,
          groupId: res.data.id
        }
        addGroupRequest(data)
        .then(res=>{
          toast.success("Group created successfully")
          handleClose()
        })
      }
    })
  }
  return (
    <Dialog 
      onClose={handleClose} 
      open={props.createGroupDialog}
      PaperProps={{style:{width:"500px"}}}
      sx={{minWidth: "500px"}}
    >
    <DialogTitle>
      Create Group 
    </DialogTitle>
    <DialogContent>
      <Box>
      <TextField
      variant="outlined"
      label="Group Name"
      name="groupName"
      onChange={(event)=> setGroupName(event.target.value)}
      error={!groupName ? true : false}
      helperText="Please enter group name"
      required
      fullWidth
      sx={{my: 1}}
    />
    <Autocomplete
        multiple
        id="tags-outlined"
        options={contactDetails}
        // defaultValue={[top100Films[13]]}
        onChange={(e,newContact)=>(
          addContacts(newContact)
        )}
        value={selectedContacts}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            error={selectedContacts.length==0 ? true : false}
            helperText="Please select contacts"
            label="Select contacts"
          />
        )}
      />
      </Box>
    </DialogContent>
    <DialogActions
        sx={{m:2}}
    >
      <Button variant='contained' onClick={handleGroup}>Create Group</Button>
    </DialogActions>
    </Dialog>
    
  )
}

export default CreateGroup