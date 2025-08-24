
import client from "./config";

// Generic GET (list or single)
export const getRequest = async (endPoint, params) => {
  const response = await client.get(endPoint, { params });
  return response.data;
};

// Generic POST (create)
export const postRequest = async (endPoint,body) => {
  const response = await client.post(endPoint, body);
  return response.data;
};

// Generic PUT (update)
export const putRequest = async (endPoint,body) => {
  const response = await client.put(endPoint, body);
  return response.data;
};

// Generic PUT with FormData (for file uploads)
export const putRequestWithFormData = async (endPoint,body) => {
  const response = await client.put(endPoint, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Generic PATCH (update)
export const patchRequest = async (body) => {
  const response = await client.patch(body.endPoint, body.payload);
  return response.data;
};  

// Generic DELETE
export const deleteRequest = async (endPoint) => {
  const response = await client.delete(endPoint);
  return response.data;
};