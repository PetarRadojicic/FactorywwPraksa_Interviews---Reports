import { postUserData } from './API'

export const getToken = async (set: string, payload: {}) => {
  postUserData(payload).then(response => {
    sessionStorage.setItem(set, response.data.accessToken);
  });
}; 