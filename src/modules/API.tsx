import { useEffect, useState } from "react";
import to from "await-to-js";
import axios from "axios";

export const API = (APICALL:any) => {
  const [data, setData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/api/${APICALL}`);
        setData(response.data); 
      } catch (error) {
        alert("Failed to fetch data"); 
      }
    };

    fetchData();
  }, []);

  return <div>{data ? data : []}</div>;
};

