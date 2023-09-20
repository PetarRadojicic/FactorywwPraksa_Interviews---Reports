import {postInterview} from './API'

export const getToken = async (set:string,payload:{}) => {
    postInterview(payload).then(response => {
        sessionStorage.setItem(set,response.data.accessToken);
      })
}
export const nullToken = async (set:string) => {
        sessionStorage.setItem(set,"");
}