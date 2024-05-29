import React, { Fragment, useEffect, useState } from 'react'
import { getGroupsByIdRequest } from '../../../services/user'
import { getGroupExpensesByIdRequest, getGroupNameByIdRequest } from '../../../services/group';
<<<<<<< HEAD
import { Avatar, Box, Button, Card, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography, capitalize } from '@mui/material';
=======
import { Avatar, Box, Button, Card, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
import CreateGroup from './CreateGroupDialog';
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

function Group(props) {
    const colorArray = props.colors;
    const currentUserId = localStorage.getItem("id");
    
    const [createGroupDialog, setCreateGroupDialog] = useState(false)
    const [groupNames,setGroupNames] = useState([]);
    const [groupDetails,setGroupDetails] = useState({
      expenses: [],
      users: []
    });
    const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [aboutGroup,setAboutGroup] = useState(false);
    const [userDetails,setUserDetails] = useState([]);

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
        getGroupsByIdRequest(id)
        .then(res=>{
            if(res.data.groupIds.length){
                return res.data.groupIds;
            }
            else{
              return [];
            }
        })
        .then(ids => {
            const promises = [];
            ids.map(id=>{
                promises.push(getGroupNameByIdRequest(id))                
            })
            return {promises,ids}
        })
        .then(({promises,ids}) => {
            Promise.all(promises)
            .then(responses => {
                const groups = responses.map((res,i) => {
                    return {
                        name : res.data.name,
                        id : ids[i],
                    }
                    
                })
                setGroupNames(groups)
            })
        })
    },[])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
<<<<<<< HEAD
    
=======

    // function handleAboutGroup(group){
    //   setAboutGroup(true);
    // }

>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
    function getExpenses(group){
      setSelectedGroup(group)
      getGroupExpensesByIdRequest(group.id)
      .then(res =>{
        let expenses = res.data.expenses;
        const userId = localStorage.getItem("id");
          if(!expenses.length){
              toast.error("YOU DONT HAVE ANY EXPENSES")
          }
          else{
            expenses.map(expense => {
              let currentUserExpense = 0;
              let totalAmount = 0;
              expense.borrowers.map(expense => {
                if(expense.userId === userId) {
                  currentUserExpense = expense.value
                } else {
                  totalAmount += expense.value
                }
              })
              if(currentUserExpense === 0) {
                expense.paidBy = "You lent " + Math.round((totalAmount+Number.EPSILON)*100)/100
              } else {
                expense.paidBy = "You borrowed " + Math.round((currentUserExpense+Number.EPSILON)*100)/100
              }
              const date = new Date(expense.createdOn)
              const year = date.getFullYear();
<<<<<<< HEAD
              const month = date.getMonth()+1;
=======
              const month = date.getMonth();
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
              const day = date.getDate();
              expense.createdOn = day+"-"+month+"-"+year
            })
          }
          const details = {
            expenses: expenses,
            users: res.data.users
          }
<<<<<<< HEAD

=======
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
          setGroupDetails(details);
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
            onClick={() => {setCreateGroupDialog(true)}}
            >
                <Avatar 
                sx={{marginRight:"10px",
                    bgcolor:colorArray[0],
                }}>+</Avatar>
                <Typography>Add Group</Typography>
            </Card>
          </Grid>
        {
          groupNames.length!== 0 &&
            groupNames.map(group=>(
                <Grid item key={group.name} xs={3}>
                    <Card 
                    sx={{display:"flex",
                    alignItems:"center",
                    height:"70px",                   
                    borderRadius:"8px",
                    padding: "10px",
                    cursor:"pointer",
                    }}
                    variant="outlined"
                    onClick={()=>getExpenses(group)}
                    >
                        <Avatar 
                        sx={{marginRight:"10px",
                            bgcolor:getColor(),
                        }}>{group.name[0]}</Avatar>
                        <Typography>{group.name} </Typography>
                    </Card>
                </Grid>
            ))
        }
        </Grid>
        {selectedGroup && 
          <Box display="flex" justifyContent="space-between" my={2} mx={4}>
            <Box display="flex" alignItems="center">
            
            <Typography sx={{alignContent:"center"}} variant="h6">{selectedGroup.name}</Typography>
            <Card 
                    sx={{display:"flex",
                    alignItems:"center",
                    height:"50px",
                    borderRadius:"8px",
                    padding: "10px",
                    cursor:"pointer",
                    ml:"10px"
                    }}
                    variant="outlined"
                    onClick={()=>setAboutGroup(true)}
                    >
                       <Typography>About Group </Typography>
                    </Card>
            </Box>
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
          <Dialog sx={{padding:"10px"}} open={aboutGroup} onClose={()=>setAboutGroup(false)}>
            <DialogTitle>
              Group Members
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={1}>
              {userDetails.map((user)=>(
                <Grid item key={user.id} xs={12}>{(user.id===currentUserId)?"You":user.name}</Grid>
              ))
              }
            </Grid>
              
            </DialogContent>
          </Dialog>

        }
        {selectedGroup && <Paper sx={{ width: 'auto', overflow: 'hidden', my:2, mx:4 }}>
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
<<<<<<< HEAD
                      {capitalize(column.label)}
=======
                      {column.label}
>>>>>>> 30e21af59f7b49e7821a51c18477d54bec60bd35
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {groupDetails?.expenses
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
          count={groupDetails.expenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    }
      <AddExpenseDialog
        isExpenseDialogOpen={isExpenseDialogOpen}
        setIsExpenseDialogOpen={setIsExpenseDialogOpen}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        selectedGroup={selectedGroup}
        userDetails={userDetails}
    setUserDetails={setUserDetails}
      />
        <CreateGroup
    setCreateGroupDialog={setCreateGroupDialog} 
    createGroupDialog={createGroupDialog}/>
    </Fragment>
        
    
  )
}

export default Group