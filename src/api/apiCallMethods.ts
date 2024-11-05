import environmentVariables from '../utils/environmentVariables';

const getRequest = async <ResponseType>(
  url: string,
  params: { start: number; limit: number },
): Promise<ResponseType> => {
  const response = await fetch(
    `${environmentVariables.baseURL}${url}/?start=${params.start}&limit=${params.limit}`,
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

export default getRequest;
