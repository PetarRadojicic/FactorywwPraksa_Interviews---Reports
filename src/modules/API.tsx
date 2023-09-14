import axios from "axios";

export const submitInterview = (APICALL: any, body?: any) => {
  return axios.post(`http://localhost:3333/api/${APICALL}`, body);
}
export const getInterview = (APICALL: any) => {
  return axios.get(`http://localhost:3333/api/${APICALL}`);
}
export const deleteInterview = (APICALL: any) => {
  return axios.delete(`http://localhost:3333/api/${APICALL}`);
}