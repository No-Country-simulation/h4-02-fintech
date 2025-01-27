import { useCallback, useEffect, useState } from "react";
import { fetchNews } from "../services/news";

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetNews = useCallback(() => {
    setLoading(true);
    fetchNews()
      .then((news) => {
        setNews(news);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleGetNews();
  }, [handleGetNews]);

  return { news, loading };
};
