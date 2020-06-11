import axios from "axios";
import { authHeaders } from "./auth";

// POST
export const _post = async (
  data?: any,
  api?: string,
  another_host?: string,
  headers?: any,
  params?: string
) => {
  let requestURL =
    (another_host ? another_host : process.env.REACT_APP_API_HOST) + api;
  if (headers === null || headers === undefined) {
    headers = authHeaders;
  }
  console.log(requestURL)
  let response = await axios.post(requestURL, data, { headers, params });
  return response.data;
};

//GET
export const _get = async (
  params?: any,
  api?: string,
  another_host?: string,
  headers?: any
) => {
  let requestURL =
    (another_host ? another_host : process.env.REACT_APP_API_HOST) + api;
  if (headers === null || headers === undefined) {
    headers = authHeaders;
  }

  let response = await axios.get(requestURL, { params: params, headers });
  return response.data;
};

// DELETE
export const _delete = async (
  data?: any,
  api?: string,
  another_host?: string,
  headers?: any,
  params?: string
) => {
  let requestURL =
    (another_host ? another_host : process.env.REACT_APP_API_HOST) + api;
  if (headers === null || headers === undefined) {
    headers = authHeaders;
  }

  let response = await axios.delete(requestURL, { data: params, headers });
  return response.data;
};

// PUT
export const _put = async (
  data?: any,
  api?: string,
  another_host?: string,
  headers?: any,
  params?: string
) => {
  let requestURL =
    (another_host ? another_host : process.env.REACT_APP_API_HOST) + api;
  if (headers === null || headers === undefined) {
    headers = authHeaders;
  }

  let response = await axios.put(requestURL, data, { headers, params });
  return response.data;
};
