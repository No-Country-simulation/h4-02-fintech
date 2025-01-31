import { useCallback, useEffect, useState } from "react";
import { fetchPosts, publishPost } from "../services/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const handleGetPosts = useCallback((pageToFetch = 0) => {
    const size = 5;
    return fetchPosts(pageToFetch, size)
      .then((posts) => {
        // If fewer posts are returned, there are no more to load
        if (posts.length < size) {
          setHasMorePosts(false);
        }
        return posts;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    handleGetPosts().then((posts) => {
      setPosts(posts);
    });
  }, [handleGetPosts]);

  const loadMorePosts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoadingMore(true);
    handleGetPosts(nextPage)
      .then((posts) => {
        setPosts((prev) => {
          /**
           * This is to prevent duplicated posts.
           *
           * If the user creates a post and then loads more posts
           * for the feed, the last post in the previous feed will
           * be duplicated
           *
           * */
          const mergedPosts = [...prev, ...posts];
          const uniquePosts = Array.from(
            new Map(mergedPosts.map((post) => [post.id, post])).values()
          );
          return uniquePosts;
        });
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handlePublishPost = async (content) => {
    setPublishing(true);
    const newPost = await publishPost(content);
    setPosts((prev) => [newPost, ...prev]);
    setPublishing(false);
  };

  return {
    posts,
    handlePublishPost,
    loading,
    publishing,
    loadMorePosts,
    loadingMore,
    hasMorePosts,
  };
};
