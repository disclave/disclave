const apiUrl = process.env.API_URL as string;

export const countComments = async (url: string): Promise<number> => {
  const request = {
    query: "countComments",
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(request),
  });
  const count = response.text();
  return Number(count);
};
