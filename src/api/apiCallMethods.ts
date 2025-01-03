import environmentVariables from '../utils/environmentVariables';

const getRequest = async <ResponseType>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<ResponseType> => {
  let url = new URL(`${environmentVariables.baseURL}${endpoint}`);
  if (params) {
    const paramKeys = Object.keys(params);
    paramKeys.forEach((paramKey) =>
      url.searchParams.set(paramKey, params[paramKey] as string),
    );
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

export default getRequest;
