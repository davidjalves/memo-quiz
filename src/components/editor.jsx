import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//import EditorToolbar, { modules, formats } from "../components/editorToolBar";
export const Editor = ({ value, setValue, id, inactive }) => {
  const [events, setEvents] = useState([]);
  //const [readOnly, setReadyOnly] = useState(false);
  //const [enabled, setEnabled] = useState(true);
  const [selection, setSelection] = useState("");


  var toolbarOptions = [
    ["bold", "italic", "underline", "strike","image","video","link"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: [false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  // Modules object for setting up the Quill editor
  const modules = {
    toolbar: toolbarOptions,
  };
  const modulesNoToolbar = {
    toolbar: false,
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
      {inactive === false && (
        <>
          {/* <EditorToolbar toolbarId={id} /> */}
          <ReactQuill
            readOnly={false}
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
        </>
      )}
      {inactive === true && (
        <ReactQuill
          readOnly={true}
          theme="snow"
          value={value}
          modules={modulesNoToolbar}
        />
      )}
    </div>
  );
};
