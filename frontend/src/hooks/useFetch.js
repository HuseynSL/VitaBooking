import { useEffect, useState } from "react";
import axios from "axios";
import url from "../utils/baseUrl";

const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${endpoint}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer admin-secret-token-123`,
            ...options.headers,
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [endpoint]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}${endpoint}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer admin-secret-token-123`,
          ...options.headers,
        },
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
