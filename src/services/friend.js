import { GET_FRIENDS, GET_FRIEND_EXPENSES, GET_FRIEND_NAME, ADD_FRIEND, ADD_EXPENSE } from "../config/apiUrls/friend";
import { commonXHRInstance } from "./networkServers";

export const getFriendsRequest = async (id) =>
  commonXHRInstance.get(GET_FRIENDS()+`/${id}`);
  
export const getFriendNameByIdRequest = async (id) =>
commonXHRInstance.get(GET_FRIEND_NAME()+`/${id}`);

export const getFriendExpensesByIdRequest = async (id) =>
  commonXHRInstance.get(GET_FRIEND_EXPENSES()+`/${id}`);

export const addFriendRequest = async (data) =>
  commonXHRInstance.post(ADD_FRIEND(), data);

export const addExpenseRequest = async (data) =>
  commonXHRInstance.post(ADD_EXPENSE(), data);