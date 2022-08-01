import { useState } from "react";
import { Button } from "react-bootstrap";
import { Quiz } from "./quiz";

export const InsertAuto = () => {
  const [filename, setFilename] = useState("");
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [items, setItems] = useState([]);
  const [quiz, setQuiz] = useState(false);
  const changeHandler = (event) => {
    if (event.target.files[0].type !== "application/json") {
      setError(true);
    }
    if (event.target.files[0].type === "application/json") {
      setError(false);
    }
    setFilename(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const fileReader = new FileReader();

    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = (e) => {
      const content = e.target.result;
      console.log(JSON.parse(content));
      //setFileContent(JSON.parse(content));
      setItems(JSON.parse(content));
      setQuiz(true);
    };
  };
  return (
    <center>
      {quiz === false && (
        <>
          {" "}
          <Button as={"label"} htmlFor="upload-file">
            <div className="font-link">CHOOSE FILE</div>
          </Button>{" "}
          <br></br>
          {error ? (
            <center style={{ color: "red" }}>ERROR UPLOADING FILE</center>
          ) : (
            <center>{filename}</center>
          )}
          <input
            id="upload-file"
            type="file"
            onChange={changeHandler}
            style={{ visibility: "hidden" }}
          />
        </>
      )}

      {error === false && filename !== "" && quiz === false && (
        <div>
          <br></br>
          <Button
            variant="success"
            style={{ marginTop: "2mm" }}
            onClick={handleSubmission}
          >
            <div className="font-link">START ANSWERING</div>
          </Button>
        </div>
      )}
      {quiz === true && <Quiz items={items} />}
    </center>
  );
};
