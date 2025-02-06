import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  listsPlugin,
  markdownShortcutPlugin,
  maxLengthPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const MAX_CONTENT_LENGTH = 800;

function decodeHtmlEntities(input) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = input;
  return tempElement.textContent || tempElement.innerText || "";
}

export const PostEditor = ({
  onPublishPost,
  isPublishing = false,
  placeholder = "¿En qué estáis pensando?",
  buttonLabel = "Publicar post",
}) => {
  const ref = useRef(null);
  const [postContentLength, setPostContentLength] = useState(0);

  const handlePublishPost = async () => {
    const content = ref.current?.getMarkdown();
    if (!content || !isPostContentLengthValid()) {
      return;
    }
    await onPublishPost(content);
    ref.current?.setMarkdown("");
    setPostContentLength(0);
  };

  const isPostContentLengthValid = () => {
    return postContentLength > 0 && postContentLength <= MAX_CONTENT_LENGTH;
  };

  return (
    <div>
      <div className="border-l-2">
        <MDXEditor
          ref={ref}
          markdown={""}
          className="bg-base-100 rounded-lg"
          onChange={(value) => {
            const decodedString = decodeHtmlEntities(value);
            setPostContentLength(decodedString.length);
          }}
          placeholder={placeholder}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            imagePlugin(),
            thematicBreakPlugin(),
            tablePlugin(),
            markdownShortcutPlugin(),
            maxLengthPlugin(MAX_CONTENT_LENGTH),
            toolbarPlugin({
              toolbarClassName: "post-editor-toolbar",
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <InsertTable />
                  <InsertImage />
                </>
              ),
            }),
          ]}
        />
        <div
          className={`flex justify-end mt-2 text-sm font-bold ${
            postContentLength > MAX_CONTENT_LENGTH
              ? "text-error"
              : "text-primary"
          }`}
        >
          {postContentLength} / {MAX_CONTENT_LENGTH}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePublishPost}
            disabled={isPublishing || !isPostContentLengthValid()}
            className="btn btn-primary disabled:opacity-50"
          >
            {isPublishing ? "Publicando..." : buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

PostEditor.propTypes = {
  onPublishPost: PropTypes.func.isRequired,
  isPublishing: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  buttonLabel: PropTypes.string,
};
