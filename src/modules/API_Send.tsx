import { useEffect, useState } from "react";
import to from "await-to-js";
import axios from "axios";

export const API_Send = (APICALL:any, objectParams: any) => {
  const [data, setData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(objectParams).toString();
        const response = await axios.get(`http://localhost:3333/api/${APICALL}?${queryParams}`);
        setData(response.data); 
      } catch (error) {
        alert("Failed to fetch data"); 
      }
    };

    fetchData();
  }, [objectParams]);

  return <div>{data ? data : []}</div>;
};
