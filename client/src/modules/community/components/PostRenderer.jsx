import {
  headingsPlugin,
  imagePlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import PropTypes from "prop-types";

export const PostRenderer = ({ content }) => {
  return (
    <div>
      <MDXEditor
        markdown={content}
        readOnly
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          imagePlugin(),
        ]}
      />
    </div>
  );
};

PostRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};
