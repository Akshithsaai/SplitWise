import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddExpenseDialog from "./AddExpenseDialog"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addFriendRequest, getFriendExpensesByIdRequest, getFriendNameByIdRequest, getFriendsRequest } from '../../../services/friend';
import { getUsersListRequest, userDetailsByIdRequest } from '../../../services/user';
import AddFriendExpenseDialog from './AddFriendExpenseDialog';

function Friend(props) {
    const colorArray = props.colors;

    const [expenses,setExpenses] = useState([]);
    const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    
    const [userDetails,setUserDetails] = useState([]);
    const [friendDetails,setFriendDetails] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addFriendDialog,setAddFriendDialog] =useState(false);

    const columns = [
        { id: 'expenseName', label: 'Name', minWidth: 170 },
        { id: 'paidBy', label: 'Paidby', minWidth: 100 },
        {
          id: 'amount',
          label: 'Total Amount',
          minWidth: 50,
          align: 'right',
        },
        {
          id: 'createdOn',
          label: 'Date',
          minWidth: 70,
          align: 'right',
        },
      ];

    useEffect(()=>{
        const id = localStorage.getItem("id");
        getFriendsRequest(id)
        .then(res=>{
            if(res.data.friends.length){
                setFriendDetails(res.data.friends);
            } 
            return res.data.friends;
        }) 
        .then(friends =>{
          getUsersListRequest()
          .then(res =>{
              if(res.data.length){
                  const userId = localStorage.getItem('id')
                  const details =  JSON.stringify(friends);
                  const userList = res.data.filter(user =>{
                      return !details.includes(user.id) && user.id !== userId
                  })
                  setUserDetails(userList);
              }
          })
        })
        
        
    },[])
    // console.log(userDetails);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    // function handleAboutGroup(group){
    //   setAboutGroup(true);
    // }

    function addFriend(friend){
      userDetailsByIdRequest(localStorage.getItem('id'))
      .then(res => {
        const data = {
          friendDetails: {
            name: friend.name,
            id: friend.id
          },
          currentUserDetails: {
            name: res.data.firstName+" "+res.data.lastName,
            id: res.data.id
          }
        }
        console.log("data", data)
        addFriendRequest(data)
        .then(res => {
          toast.success("Friend added successfully");
          const newFriend = {
            friendName: friend.name,
            friendId: friend.id,
            friendExpenseId: res.data.id
          }
          setFriendDetails(prev => ([...prev, newFriend]))
        })
      })
    }

    function getExpenses(friend){
      setSelectedFriend(friend)
      getFriendExpensesByIdRequest(friend.friendExpenseId)
      .then(res =>{
        let expenses = res.data.expenses;
        const userId = localStorage.getItem("id");
          if(!expenses.length){
              toast.error("YOU DONT HAVE ANY EXPENSES")
          }
          else{
            expenses.map(expense => {
                if(expense.paidBy === userId){
                    expense.paidBy = "You lent " + (expense.amount)/2;
                }
                else{
                    expense.paidBy = "You borrowed " + (expense.amount)/2;
                }
                const date = new Date(expense.createdOn);
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                expense.createdOn = day+"-"+month+"-"+year;
            })
          }
          setExpenses(expenses);
      })
    }
    
    let count = 0;
    function getColor() {
      ++count;
      return colorArray[count];
    }
    
    return (
    <Fragment>
    <Grid container spacing={2} px={4} py={2} maxWidth="100%">
    <Grid item xs={3}>
              <Card 
              sx={{display:"flex",
              alignItems:"center",
              height:"70px",                   
              borderRadius:"8px",
              padding: "10px",
              cursor:"pointer",
              }}
              variant="outlined"
              onClick={()=>setAddFriendDialog(true)}
              > 
                  <Avatar 
                  sx={{marginRight:"10px",
                      bgcolor:getColor(),
                  }}>+</Avatar>
                  <Typography>Add Friend</Typography>
              </Card>
          </Grid>
  {
    
      friendDetails.map(friend=>(
          <Grid item key={friend.friendId} xs={3}>
              <Card 
              sx={{display:"flex",
              alignItems:"center",
              height:"70px",                   
              borderRadius:"8px",
              padding: "10px",
              cursor:"pointer",
              }}
              variant="outlined"
              onClick={()=>getExpenses(friend)}
              > 
                  <Avatar 
                  sx={{marginRight:"10px",
                      bgcolor:getColor(),
                  }}>{friend.friendName[0]}</Avatar>
                  <Typography>{friend.friendName} </Typography>
              </Card>
          </Grid>
      ))
  }
  </Grid>
  {selectedFriend && 
    <Box display="flex" justifyContent="space-between" my={2} mx={4}>
      <Typography sx={{alignContent:"center"}} variant="h6">{selectedFriend.friendName}</Typography>
      <Button 
        variant="contained"
        onClick={() => setIsExpenseDialogOpen(true)}
        startIcon={<AddCircleIcon />}
      >
        Add Expense
      </Button>
    </Box>
  }
  {
    selectedFriend && 
    <Paper sx={{ width: 'auto', overflow: 'hidden', my:2, mx:4 }}>
          <TableContainer sx={{ maxHeight: 440,}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                { expenses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          
                          let color="#000000";
                          if(column.id==="paidBy"){
                           
                            if(value.includes('borrowed')){
                               color = "#FF0000";
                               
                            }
                            else{
                              color = "#008000";
                            }
                          }
                          return (
                            <TableCell 
                              key={column.id} 
                              align={column.align}
                              sx={{color:{color}}} 
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={expenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  }

  <Dialog sx={{padding:"10px"}} open={addFriendDialog} onClose={()=>setAddFriendDialog(false)}>
  <DialogTitle>
    Contacts
  </DialogTitle>
  <DialogContent>
  <Grid container spacing={1}>
    {userDetails.map((user)=>(
      <Grid sx={{cursor: "pointer"}} item key={user.id} xs={12} onClick={()=>addFriend(user)}>{user.name}</Grid>
    ))
    }
    {
      userDetails.length===0 && <Typography mt={2}>No New Contacts</Typography>
    }
  </Grid>
    
  </DialogContent>
</Dialog>

     {selectedFriend &&  
        <AddFriendExpenseDialog
          isExpenseDialogOpen={isExpenseDialogOpen}
          setIsExpenseDialogOpen={setIsExpenseDialogOpen}
          expenses ={expenses}
          setExpenses = {setExpenses}
          selectedFriend = {selectedFriend}
       />
     } 
    </Fragment>
        
    
  )
}

export default Friend