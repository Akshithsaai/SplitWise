import React, {useEffect, useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { userDetailsByIdRequest } from '../../../services/user'
import { addExpenseRequest } from '../../../services/group'
import { toast } from 'material-react-toastify'

function AddExpenseDialog(props) {
  const currentUserId = localStorage.getItem("id");
  const { 
    isExpenseDialogOpen, 
    setIsExpenseDialogOpen, 
    groupDetails,
    setGroupDetails,
    selectedGroup,
    userDetails,
    setUserDetails,
  } = props;
  // const [userDetails, setUserDetails] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState({
    paidBy: '',
    amount: undefined,
    expenseName: "",
  })
  const [errorDetails, setErrorDetails] = useState({
    paidBy: "",
    amount: "",
    expenseName: "",
  })

  useEffect(() => {
    const promises = [];
    groupDetails.users && groupDetails?.users.map(user => {
      promises.push(userDetailsByIdRequest(user))
    })
    Promise.all(promises)
    .then((responses) => {
      const details = responses.map(res => {
        return {
          name: res.data.firstName+" "+res.data.lastName,
          id: res.data.id
        }
      })
      setUserDetails(details);
    })
  },[groupDetails])

  function handleAddExpense() {
    let value = 0;
    const errors = {
      paidBy: "",
      amount: "",
      expenseName: "",
    }
    let isError = false
    
    if(!expenseDetails.expenseName) {
      errors.expenseName = "Please enter expense name"
      isError = true;
      
    }
    if(!expenseDetails.paidBy){
      errors.paidBy = "Please enter Name"
      isError = true;
    }
    if(!expenseDetails.amount){
      errors.amount = "Please enter amount"
      isError = true;
    }
    if(!isError) {
      const borrowers = userDetails.map(user => { 
        if(expenseDetails.paidBy !== user.id) {
          value = expenseDetails.amount/userDetails.length;
          return {
            userId: user.id,
            value: expenseDetails.amount/userDetails.length
          }
        }
        else{
          return {
            userId: user.id,
            value: 0
          } 
        }
      })
      const data = {
        ...expenseDetails,
        borrowers: borrowers,
        groupId: selectedGroup.id,
      }
      addExpenseRequest(data)
      .then(res => {
        toast.success("Expense added successfully");
        let newExpense = {...data};

        const userId = localStorage.getItem("id");
        let amount = 0;
        if(userId===newExpense.paidBy) {
          amount = newExpense.amount - (newExpense.amount/newExpense.borrowers.length)
          newExpense.paidBy = "You lent " + Math.round((amount+Number.EPSILON)*100)/100
        } else {
          amount = newExpense.amount/newExpense.borrowers.length;
          newExpense.paidBy = "You borrowed " + Math.round((amount+Number.EPSILON)*100)/100
        }
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        newExpense.createdOn = day+"-"+month+"-"+year

        const modifiedExpenses = [...groupDetails.expenses];
        modifiedExpenses.unshift(newExpense);

        setGroupDetails(prev => ({
          ...prev,
          expenses: modifiedExpenses,
        }))
        handleClose();
      }) 
    } else {
      setErrorDetails(errors)
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setExpenseDetails(prev => ({...prev, [name]: value}))
  }

  function handleClose() {
    setIsExpenseDialogOpen(false)
  }

  return (
    <Dialog open={isExpenseDialogOpen} onClose={handleClose}>
        <DialogTitle>
            Add Expense
        </DialogTitle>
        <DialogContent>
          <Box>
            <FormControl fullWidth sx={{mt: 2, mb: 1}}>
              <InputLabel id="paidById">Paid by</InputLabel>
              <Select
                labelId="paidById"
                value={expenseDetails.paidBy}
                label="Paid by"
                onChange={handleChange}
                name="paidBy"
                error={errorDetails.paidBy ? true : false}
                helpertext={errorDetails.paidBy}
              >
                {userDetails.map(user => (
                  <MenuItem key={user.id} value={user.id}>{(user.id===currentUserId)?"You":user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="Expense Name"
              name="expenseName"
              value={expenseDetails.expenseName}
              onChange={handleChange}
              error={errorDetails.expenseName ? true : false}
              helperText={errorDetails.expenseName}
              required
              fullWidth
              sx={{my: 1}}
            />
            <TextField
              variant="outlined"
              label="Amount"
              name="amount"
              value={expenseDetails.amount}
              onChange={handleChange}
              error={errorDetails.amount ? true : false}
              helperText={errorDetails.amount}
              required
              fullWidth
              sx={{my: 1}}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{m:2}}>
          <Button variant="contained" onClick={handleAddExpense}>Save Expense</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddExpenseDialog