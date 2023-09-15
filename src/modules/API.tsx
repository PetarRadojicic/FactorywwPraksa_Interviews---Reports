import axios from "axios";
export const submitInterview = (APICALL: any, body: any,token:any) => {
  return axios.post(`http://localhost:3333/api/${APICALL}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const getInterview = (APICALL: any,token:any) => {
  return axios.get(`http://localhost:3333/api/${APICALL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
export const deleteInterview = (APICALL: any,ID: any,token:any) => {
  return axios.delete(`http://localhost:3333/api/${APICALL}/${ID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const postInterview = (Payload:any) => {
  return axios.post(`http://localhost:3333/login`,Payload);
}
