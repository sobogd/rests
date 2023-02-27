import { API_URL } from "shared/config";

export const requestFiles = async (rejectWithValue: any, url: string, method: string, data: FileList) => {
  const token = sessionStorage.getItem("token");

  const formData = new FormData();

  for (let i = 0; i < data.length; i++) {
    formData.append(`files`, data[i]);
  }

  console.log({ formData, data });

  const response = await fetch(API_URL + url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status >= 400) {
    response.status === 401 && sessionStorage.setItem("token", "");
    return rejectWithValue(await response.json());
  }

  return response.json();
};
