const apiUrl = process.env.API_URL as string;

export const countComments = async (url: string): Promise<number> => {
  const queryName = "countComments";

  const request = {
    query: `query ($url: String!) { ${queryName}(url: $url) }`,
    variables: { url: url },
  };
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(request),
  });
  const result = await response.json();
  return Number(result.data[queryName]);
};
