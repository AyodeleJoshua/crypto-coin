import axiosInstance from './axiosInstance';

export const getRequest = async <ResponseType, paramsType>(
  url: string,
  params: paramsType,
): Promise<ResponseType> => {
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};
