// eslint-disable-next-line @typescript-eslint/no-require-imports
export const AxiosURLConstruction = (baseUrl: string, params: any) => {
  const searchParams = new URLSearchParams(params);
  return `${baseUrl}${baseUrl.includes('&') ? '&' : '?'}${searchParams.toString()}`;
};
