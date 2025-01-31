import PropTypes from "prop-types";
import { useState } from "react";
import { PostRenderer } from "./PostRenderer";

export const Post = ({ user, content, createdAt }) => {
  return (
    <div className="border-2 border-base-300 rounded-lg p-6 bg-base-100 shadow-sm min-h-[200px] relative">
      <PostOptions />

      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.pictureUrl}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="font-semibold text-primary">{user.name}</h3>
          <p className="text-sm text-neutral-600">
            {new Date(createdAt)
              .toLocaleDateString("es-AR", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>
      </div>

      <div className="prose max-w-none text-base-content">
        <PostRenderer content={content} />
      </div>

      <PostActionBar />
    </div>
  );
};

const PostOptions = () => {
  return (
    <div className="absolute top-4 right-4">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 border border-base-300"
        >
          <li>
            <button className="text-sm hover:bg-base-200">Compartir</button>
          </li>
          <li>
            <button className="text-sm hover:bg-base-200">Editar</button>
          </li>
          <li>
            <button className="text-sm text-error hover:bg-base-200">
              Eliminar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const PostActionBar = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-base-300">
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="btn btn-ghost btn-sm gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            isLiked
              ? "text-error fill-error"
              : "stroke-primary fill-transparent"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span className={isLiked ? "text-error" : "text-primary"}>{10}</span>
      </button>

      <div className="dropdown dropdown-top dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48 border border-base-300"
        >
          <li>
            <button className="text-sm hover:bg-base-200">Copiar enlace</button>
          </li>
          <li>
            <button className="text-sm hover:bg-base-200">Twitter</button>
          </li>
          <li>
            <button className="text-sm hover:bg-base-200">LinkedIn</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
