import { useEffect, useState } from 'react';
import { getPageDetails, PageDetailsModel } from '@disclave/client';

type UsePageDetails = {
  pageDetails: PageDetailsModel | null;
  isLoading: boolean;
};

export const usePageDetails = (url: string, initialState: PageDetailsModel | null): UsePageDetails => {
  const [pageDetails, setPageDetails] = useState(initialState);
  const [isLoading, setLoading] = useState(!pageDetails || pageDetails.meta == null);

  const fetchPageDetails = async () => {
    const result = await getPageDetails(url, false);
    setPageDetails(result);
    setLoading(false);
  };

  useEffect(() => {
    if (pageDetails && pageDetails.meta != null) return;

    fetchPageDetails();
  }, []);

  return {
    pageDetails: pageDetails,
    isLoading: isLoading
  };
};
