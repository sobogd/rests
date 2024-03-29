import { API_URL } from "config";

export const request = async (
  rejectWithValue: any,
  url: string,
  method: string,
  data?: object
) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.status >= 400) {
    response.status === 401 && sessionStorage.setItem("token", "");
    return rejectWithValue(await response.json());
  }

  return response.json();
};
