import { useCallback, useState } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  const clearError = () => {
    setError(null);
  };

  const sendRequest = useCallback(
    async (endpoint, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      let response;
      try {
        if (method === "POST") {
          response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}${endpoint}`,
            body,
            { headers }
          );
        } else if (method === "PATCH") {
          response = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}${endpoint}`,
            body,
            { headers }
          );
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}${endpoint}`
          );
        }
        setIsLoading(false);
        return response;
      } catch (err) {
        setError(err.response);
        setIsLoading(false);
        throw err;
      }
    }
  );

  return { isLoading, error, sendRequest, clearError };
};
