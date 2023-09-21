import axios from "axios";
export const submitUserData = (APICALL: any, body: any,token:any) => {
  return axios.post(`http://localhost:3333/api/${APICALL}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const getUserData = (APICALL: any,token:any) => {
  return axios.get(`http://localhost:3333/api/${APICALL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
export const deleteUserData = (APICALL: any,ID: any,token:any) => {
  return axios.delete(`http://localhost:3333/api/${APICALL}/${ID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const postUserData = (Payload:any) => {
  return axios.post(`http://localhost:3333/login`,Payload);
}
