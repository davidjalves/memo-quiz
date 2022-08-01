/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { InsertManual } from "./insertManual";
import { Quiz } from "./quiz";

export const InsertAuto = ({ isOn, setIsOn }) => {
  const location = useLocation();
  const [filename, setFilename] = useState("");
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [items, setItems] = useState([]);
  const [quiz, setQuiz] = useState(false);
  const [manual, setManual] = useState(false);
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
      setQuiz(true);
    };
  };

  return (
    <center>
      <div className="font-link">IMPORT QUESTIONS FROM FILE</div>
      <br></br>

      {quiz === false && manual === false && (
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
          {/* </a> */}
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

      {error === false &&
        filename !== "" &&
        quiz === false &&
        manual === false && (
          <div>
            <br></br>
            <Button
              style={{ margin: "2mm" }}
              onClick={() => {
                const fileReader = new FileReader();

                fileReader.readAsText(selectedFile, "UTF-8");
                fileReader.onload = (e) => {
                  const content = e.target.result;
                  setItems(JSON.parse(content));
                  setManual(true);
                };
              }}
            >
              <div className="font-link">EDIT QUESTIONS/ANSWERS</div>
            </Button>
            <Button
              variant="success"
              style={{ margin: "2mm" }}
              onClick={handleSubmission}
            >
              <div className="font-link">START ANSWERING</div>
            </Button>
          </div>
        )}
      {quiz === true && <Quiz items={items} />}
      {manual === true && <InsertManual setIsOn={setManual} items={items} />}
    </center>
  );
};
