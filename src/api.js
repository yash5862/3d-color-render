import axios from "axios";
var url = "http://localhost:5000/api";

export const getAllElementData = async () => {
  try {
    let response = await axios.get(`${url}/3dobjects`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getElementData = async (id) => {
  console.log("Api iD", id);
  try {
    let response = await axios.get(`${url}/3dobjects/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const uploadElement = async (data) => {
  try {
    let response = await axios.post(`${url}/3dobjects`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
