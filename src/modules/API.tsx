import { useEffect, useState } from "react";
import to from "await-to-js";
import axios from "axios";

export const API = (APICALL: any, method: string, body?: any) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response:any;
        
        if (method === "get") {
          response = await axios.get(`http://localhost:3333/api/${APICALL}`);
        } else if (method === "delete") {
          response = await axios.delete(`http://localhost:3333/api/${APICALL}`);
        } else if (method === "post") {
          response = await axios.post(`http://localhost:3333/api/${APICALL}`, body);
        }
        
        setData(response.data);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, [APICALL, method, body]);

  return <div>{data ? data : []}</div>;
};
