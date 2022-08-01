import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "../components/editorToolBar";
export const Editor = ({ value, setValue, id }) => {
  const [events, setEvents] = useState([]);
  const [readOnly, setReadyOnly] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [selection, setSelection] = useState("");

  // Modules object for setting up the Quill editor
  const modules = {
    toolbar: `#${id}`,
  };

  // Formats objects for setting up the Quill editor
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block",
  ];

  function formatRange(range) {
    return range ? [range.index, range.index + range.length].join(",") : "none";
  }

  const onEditorChange = (value, delta, source, editor) => {
    setValue(editor.getContents());
    setEvents([`[${source}] text-change`, ...events]);
  };

  const onEditorChangeSelection = (range, source) => {
    setSelection(range);
    setEvents([
      `[${source}] selection-change(${formatRange(selection)} -> ${formatRange(
        range
      )})`,
      ...events,
    ]);
  };

  const onEditorFocus = (range, source) => {
    setEvents([`[${source}] focus(${formatRange(range)})`].concat(events));
  };

  const onEditorBlur = (previousRange, source) => {
    setEvents(
      [`[${source}] blur(${formatRange(previousRange)})`].concat(events)
    );
  };
  return (
    <div className="editor">
      <EditorToolbar toolbarId={id} />
      <ReactQuill
        readOnly={readOnly}
        onChangeSelection={onEditorChangeSelection}
        onFocus={onEditorFocus}
        onBlur={onEditorBlur}
        theme="snow"
        placeholder="Insert the text here"
        value={value}
        onChange={onEditorChange}
        //preserveWhitespace={true}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
