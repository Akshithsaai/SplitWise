
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateGroup from './CreateGroupDialog'
import { getGroupExpensesByIdRequest } from '../../../services/group';
import { getGroupsByIdRequest } from '../../../services/user';
import { getFriendExpensesByIdRequest, getFriendsRequest } from '../../../services/friend';
import BarChart from '../../charts/BarChart/BarChart';
import { green } from '@mui/material/colors';
function Home()
{
let dataset = [
    {
      expense: 0,
      month: 'Jan',
    },
    {
      expense: 0,
      month: 'Fev',
    },
    {
      expense: 0,
      month: 'Mar',
    },
    {
      expense: 0,
      month: 'Apr',
    },
    {
      expense: 0,
      month: 'May',
    },
    {
      expense: 0,
      month: 'June',
    },
    {
      expense: 0,
      month: 'July',
    },
    {
      expense: 0,
      month: 'Aug',
    },
    {
      expense: 0,
      month: 'Sept',
    },
    {
      expense: 0,
      month: 'Oct',
    },
    {
      expense: 0,
      month: 'Nov',
    },
    {
      expense: 0,
      month: 'Dec',
    },
  ];


function Home() {

  const [createGroupDialog, setCreateGroupDialog] = useState(false)
  const [totalExpenses,setTotalExpenses] = useState(0);
  const [totalGroups,setTotalGroups] = useState(0);
  const [totalFriends,setTotalFriends] = useState(0);
  const [totalLentAmount,setTotalLentAmount] = useState(0);
  const [monthlyData,setMonthlyData] = useState(dataset);
  const currentUserId = localStorage.getItem("id"); 

  useEffect(()=>{
    const promises = [];
    promises.push(getFriendsRequest(currentUserId)
    .then(res =>{
      setTotalFriends(res.data.friends.length);
      return res.data.friends;
    })
    .then(friends =>{
      const Ids = friends.map(friend=> friend.friendExpenseId)
      return Ids;
    })
    .then(Ids =>{
      const promises = Ids.map(Id =>
        getFriendExpensesByIdRequest(Id)
        .then((res) =>{
          let value = 0;
          res.data.expenses.map((expense)=>{
            value+= expense.amount / 2;

            const date = new Date(expense.createdOn);
            const month = date.getMonth()+1;
            dataset[month-1].expense+=(expense.amount / 2);
            setMonthlyData(dataset);
          });
          return value;
        })
        );
        return Promise.all(promises)
        .then((values) =>{
          const totalFriendExpenses = values.reduce((acc,val) => acc+val ,0);
          return totalFriendExpenses;
        })
    }));
    
    promises.push(getGroupsByIdRequest(currentUserId)
    .then(res=>{
      setTotalGroups(res.data.groupIds.length);
      return res.data.groupIds;
    })
    .then((groupIds)=>{
      const promises = groupIds.map((groupId) =>
        getGroupExpensesByIdRequest(groupId).then((res) => {
          let numberOfUsers = res.data.users.length;
          let value = 0;
          res.data.expenses.map((expense) => {
            value += expense.amount / numberOfUsers;

            const date = new Date(expense.createdOn);
            const month = date.getMonth()+1;
            dataset[month-1].expense+=(expense.amount / numberOfUsers);
            setMonthlyData(dataset);
          });
          return value;
        })
      );
      return Promise.all(promises).then((values) => {
        const totalGroupExpenses = values.reduce((acc, val) => acc + val, 0);
        return totalGroupExpenses;
      });
    })
    );
    Promise.all(promises)
    .then((values)=>{
      const totalExpenses = values.reduce((acc,val)=> acc + val ,0);
      setTotalExpenses(totalExpenses);
    })
  },[])

  useEffect(()=>{
    const promises = [];
    promises.push(getFriendsRequest(currentUserId)
    .then(res =>{
      setTotalFriends(res.data.friends.length);
      return res.data.friends;
    })
    .then(friends =>{
      const Ids = friends.map(friend=> friend.friendExpenseId)
      return Ids;
    })
    .then(Ids =>{
      const promises = Ids.map(Id =>
        getFriendExpensesByIdRequest(Id)
        .then((res) =>{
          let value = 0;
          res.data.expenses.map((expense)=>{
            if(expense.paidBy===currentUserId)
            value+= expense.amount / 2;
          });
          return value;
        })
        );
        return Promise.all(promises)
        .then((values) =>{
          const totalFriendExpenses = values.reduce((acc,val) => acc+val ,0);
          return totalFriendExpenses;
        })
    }));
    
    promises.push(getGroupsByIdRequest(currentUserId)
    .then(res=>{
      setTotalGroups(res.data.groupIds.length);
      return res.data.groupIds;
    })
    .then((groupIds)=>{
      const promises = groupIds.map((groupId) =>
        getGroupExpensesByIdRequest(groupId).then((res) => {
          let numberOfUsers = res.data.users.length;
          let value = 0;
          res.data.expenses.map((expense) => {
            if(expense.paidBy === currentUserId)
            value += expense.amount / numberOfUsers;
          });
          return value;
        })
      );
      return Promise.all(promises).then((values) => {
        const totalGroupExpenses = values.reduce((acc, val) => acc + val, 0);
        return totalGroupExpenses;
      });
    })
    );
    Promise.all(promises)
    .then((values)=>{
      const totalLentAmount = values.reduce((acc,val)=> acc + val ,0);
      setTotalLentAmount(totalLentAmount);
    })
  },[])
  console.log(monthlyData);
  return (
    <Box 
    display='flex'
    alignContent='center'
    sx={{m:"20px"}}>
    {/*<Button variant='contained' sx={{m:"10px"}}>
        Create Group
  </Button>*/}
    <div>

      <Card
      sx={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        m:"20px"
      }}
      >
      <CardContent>
        <Typography>Your Total Expenses</Typography>
        <Typography fontWeight="Bold" color="blue">{totalExpenses}</Typography>
      </CardContent>
      </Card>

      <Card
      sx={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        m:"20px"
      }}
      >
      <CardContent>
        <Typography>Your Groups</Typography>
        <Typography fontWeight="Bold">{totalGroups}</Typography>
      </CardContent>
      </Card>

      <Card
      sx={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        m:"20px"
      }}
      >
      <CardContent>
        <Typography>Your Friends</Typography>
        <Typography fontWeight="Bold">{totalFriends}</Typography>
      </CardContent>
      </Card>

      <Card
      sx={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        m:"20px"
      }}
      >
      <CardContent>
        <Typography>You Lent</Typography>
        <Typography fontWeight="Bold" color="green">{totalLentAmount}</Typography>
      </CardContent>
      
      </Card>

      <Card
      sx={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        m:"20px"
      }}
      >
      <CardContent>
        <Typography>You Owe</Typography>
        <Typography fontWeight="Bold" color="red">{totalExpenses-totalLentAmount}</Typography>
      </CardContent>
      
      </Card>

    </div>
      <div >
      <BarChart sx={{display:'flex'}} dataset={monthlyData}/>
      </div>
      
      
    </Box>


    

  )
}
}

export default Home