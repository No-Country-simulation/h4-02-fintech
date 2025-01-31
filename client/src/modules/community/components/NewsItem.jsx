import PropTypes from "prop-types";

export const NewsItem = ({ link, title, content, pubDate }) => {
  return (
    <div className="border-2 border-base-300 rounded-lg p-6 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-secondary hover:text-primary mb-2 inline-block"
      >
        {new URL(link).hostname}
      </a>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:text-primary transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
      </a>
      <div
        className="prose max-w-none text-base-content mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <p className="text-sm text-neutral-600">
        {new Date(pubDate)
          .toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </div>
  );
};

NewsItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
};
