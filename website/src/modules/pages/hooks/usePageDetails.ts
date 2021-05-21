import { useEffect, useState } from 'react';
import { getPageDetails, PageDetailsModel } from '@disclave/client';

type UsePageDetails = {
  pageDetails: PageDetailsModel;
  isLoading: boolean;
};

export const usePageDetails = (initialState: PageDetailsModel): UsePageDetails => {
  const [pageDetails, setPageDetails] = useState(initialState);
  const [isLoading, setLoading] = useState(pageDetails.meta == null);

  const fetchPageDetails = async () => {
    const result = await getPageDetails(pageDetails.url, true, false);
    setPageDetails(result);
    setLoading(false);
  };

  useEffect(() => {
    if (pageDetails.meta != null) return;

    fetchPageDetails();
  }, []);

  return {
    pageDetails: pageDetails,
    isLoading: isLoading
  };
};
