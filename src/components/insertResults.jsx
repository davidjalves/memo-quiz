/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Results } from "./results";

export const InsertResults = ({ setIsOn }) => {
  const [filename, setFilename] = useState("");
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [items, setItems] = useState([]);
  const [results, setResults] = useState(false);

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
      setItems(JSON.parse(content));
      setResults(true);
    };
  };
  return (
    <center>
      {results === false && (
        <>
          <Button
            variant="info"
            style={{ margin: "2mm" }}
            onClick={() => {
              setIsOn(false);
            }}
          >
            <div className="font-link">GO BACK</div>
          </Button>
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

      {error === false && filename !== "" && results === false && (
        <div>
          <br></br>
          <Button
            variant="success"
            style={{ marginTop: "2mm" }}
            onClick={handleSubmission}
          >
            <div className="font-link">SHOW RESULTS</div>
          </Button>
        </div>
      )}
      {results === true && <Results fromHome={true} items={items} />}
    </center>
  );
};
