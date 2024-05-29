import { ADD_EXPENSE, CREATE_GROUP, GET_GROUP_EXPENSES, GET_GROUP_NAME } from "../config/apiUrls/group";
import { commonXHRInstance } from "./networkServers";

export const createGroupRequest = async (data) =>
  commonXHRInstance.post(CREATE_GROUP(),data);

export const getGroupNameByIdRequest = async (id) =>
  commonXHRInstance.get(GET_GROUP_NAME()+`/${id}`);

export const getGroupExpensesByIdRequest = async (id) =>
  commonXHRInstance.get(GET_GROUP_EXPENSES()+`/${id}`);

export const addExpenseRequest = async (data) =>
  commonXHRInstance.post(ADD_EXPENSE(),data);


  