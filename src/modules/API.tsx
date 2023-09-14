import axios from "axios";
let token = sessionStorage.getItem("token");

export const submitInterview = (APICALL: any, body?: any) => {
  return axios.post(`http://localhost:3333/api/${APICALL}`, body, {
    headers: {
      Authorization: token
    }
  });
}

export const getInterview = (APICALL: any) => {
  return axios.get(`http://localhost:3333/api/${APICALL}`, {
    headers: {
      Authorization: token
    }
  });
}

export const deleteInterview = (APICALL: any,ID: any) => {
  console.log(token)
  return axios.delete(`http://localhost:3333/api/${APICALL}/${ID}`, {
    headers: {
      Authorization: token
    }
  });
}

export const postInterview = (Payload:any) => {
  return axios.post(`http://localhost:3333/login`,Payload);
}
