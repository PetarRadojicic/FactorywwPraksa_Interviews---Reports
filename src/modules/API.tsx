import axios from "axios";

export const submitInterview = (APICALL: any, body?: any) => {
  return axios.post(`http://localhost:3333/api/${APICALL}`, body, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I.jEifQ.T1gAxZhcDJ49PUD9jnv_7P_SqfC60B6aTCo0KlE5Cys`
    }
  });
}

export const getInterview = (APICALL: any) => {
  return axios.get(`http://localhost:3333/api/${APICALL}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I.jEifQ.T1gAxZhcDJ49PUD9jnv_7P_SqfC60B6aTCo0KlE5Cys`
    }
  });
}

export const deleteInterview = (APICALL: any,ID: any) => {
  return axios.delete(`http://localhost:3333/api/${APICALL}/${ID}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I.jEifQ.T1gAxZhcDJ49PUD9jnv_7P_SqfC60B6aTCo0KlE5Cys`
    }
  });
}

export const postInterview = (Payload:any) => {
  return axios.post(`http://localhost:3333/login`,Payload);
}
