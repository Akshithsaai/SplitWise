import { commonXHRInstance } from "./networkServers";
import { 
  ADD_GROUP_URL, 
  GET_CONTACTS_URL, 
  GET_GROUPS_URL, 
  LOGIN_URL, 
  SIGNUP_URL,
  GET_USER_DETAILS_BY_ID_URL,
  GET_USERS_LIST_URL
} from "../config/apiUrls/user";

export const userAuthLoginRequest = async (data) =>
  commonXHRInstance.post(LOGIN_URL(), data);

export const userAuthSignUpRequest = async (data) =>
  commonXHRInstance.post(SIGNUP_URL(), data);

export const userDetailsByIdRequest = async (id) =>
commonXHRInstance.get(GET_USER_DETAILS_BY_ID_URL()+`/${id}`);

export const getContactsRequest = async () =>
  commonXHRInstance.get(GET_CONTACTS_URL());

export const getGroupsByIdRequest = async (id) =>
  commonXHRInstance.get(GET_GROUPS_URL()+`/${id}`);

export const addGroupRequest = async (data) =>
  commonXHRInstance.post(ADD_GROUP_URL(), data);

  export const getUsersListRequest = async () =>
  commonXHRInstance.get(GET_USERS_LIST_URL());
