import { Package, User } from '@/interface';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const importPackage = async (language: string, name: string) => {
  const { data } = await axios.post(
    `${baseURL}/v1/api/packages`,
    {language,name},
    { withCredentials: true }
  );

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
  console.log('field: ', { ...field });
  const email = field.email === undefined ? '' : field.email
  const username = field.username === undefined ? '' : field.username
  const _id = field._id === undefined ? '' : field._id
  try {
    const {data} = await axios.get(`${baseURL}/v1/api/users/field?email=${email}&username=${username}&_id=${_id}`);
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


export const getPackageByName = async (language:string, name:string):Promise<Package> => {
  const { data } = await axios.get(`${baseURL}/v1/api/packages/${language}/${name}`);
  return data
}


interface PkgProps {
  allPackages: Package[] | [],
  length:number
}

export const getPackageChatHistory = async (pageId: string) => {
  const { data } = await axios.get(`${baseURL}/v1/api/packages/chat?pageId=${pageId}`);
  return data
  
}


export const getAllPackages = async (pageNumber:number):Promise<PkgProps> => {
  const { data } = await axios.get(`${baseURL}/v1/api/packages?page=${pageNumber}`);
  return data
}
