import environmentVariables from '../utils/environmentVariables';

const getRequest = async <ResponseType>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<ResponseType> => {
  const url = new URL(`${environmentVariables.baseURL}${endpoint}`);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

export default getRequest;
