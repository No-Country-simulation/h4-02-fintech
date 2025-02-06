import "@mdxeditor/editor/style.css";

import { Post } from "../components/Post";
import { PostEditor } from "../components/PostEditor";
import { usePosts } from "../hooks/usePosts";
import { Navbar } from "../../../core/dashboard/components/dashboard/investor/Navbar";

export const ForumPage = () => {
  const {
    posts,
    handlePublishPost,
    loading,
    publishing,
    loadMorePosts,
    loadingMore,
    hasMorePosts,
  } = usePosts();

  return (
    <>
      <Navbar title={"La comunidad Habla"} />
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li>
              <a className="text-neutral-600">Foro</a>
            </li>
            <li>
              <a className="text-primary">Todos los posts</a>
            </li>
          </ul>
        </div>

        <PostEditor
          onPublishPost={handlePublishPost}
          isPublishing={publishing}
        />

        {loading ? (
          <div className="text-center text-neutral-600 my-8">
            <LoadingPostsSkeleton />
          </div>
        ) : (
          <div className="space-y-3 mt-8">
            {posts.length === 0 && !hasMorePosts && (
              <div className="text-center mt-3 p-8 bg-base-200 rounded-lg">
                <p className="text-xl text-secondary mb-2">
                  📭 El foro está vacío
                </p>
                <p className="text-primary">¡Sé el primero en publicar algo!</p>
              </div>
            )}

            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}

            {hasMorePosts && (
              <button
                onClick={loadMorePosts}
                disabled={loading}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                {loadingMore ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {loadingMore ? "Cargando más..." : "Ver más posts"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const LoadingPostsSkeleton = () => {
  return (
    <div className="space-y-6 mt-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border-2 border-base-300 rounded-lg p-6 bg-base-100 animate-pulse"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-base-300"></div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-32"></div>
              <div className="h-3 bg-base-300 rounded w-48"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
