import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchContentData } from '../services/api';
import { setLoading, setAllItems, setError } from '../store/slices/contentSlice';

export const useContentData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchContentData();
        dispatch(setAllItems(data));
      } catch (error) {
        dispatch(setError('Failed to load content'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadData();
  }, [dispatch]);
};

