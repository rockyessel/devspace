import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const importPackage = async (packageForm: any) => {
  const { data } = await axios.post(`${baseURL}/v1/api/packages`, {
    language: 'rust',
    name: 'quote',
  },{withCredentials:true});

  return data;
};

export const createUserWithCredentials = async (formData: any) => {
  const { data } = await axios.post(`${baseURL}/v1/api/users`, formData);
  return data;
};
export const createUserWithProvider = async (formData: any) => {
  const { data } = await axios.post(`${baseURL}/v1/api/users`, formData);
  return data;
};

interface FieldProps {
  _id?: string;
  username?: string;
  email?: string;
}

export const fetchUserByField = async (field: FieldProps) => {
  console.log('field: ', {...field});
  try {
    const response = await axios.get(`${baseURL}/v1/api/users/field?email=${field.email}&username=${field.username}&_id=${field._id}`);
    console.log('response', response);
    const data = response.data;
    console.log('data', data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authUser = async (formData: any) => {
  const { data } = await axios.post(`${baseURL}/v1/api/users/verify`);

  return data;
};


export const getPackageByName = async (name:string, language:string) => {
  const { data } = await axios.get(`${baseURL}/v1/packages/${language}/${name}`);
  return data
}