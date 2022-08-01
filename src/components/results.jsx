/* eslint-disable array-callback-return */
import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Editor } from "./editor";
import { Quiz } from "./quiz";
export const Results = ({ items, fromHome }) => {
  const [restartItems, setRestartItems] = useState([]);
  const [restart, setRestart] = useState(false);
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  let s = join(new Date(), a, "-");

  var data = new Blob([JSON.stringify(items)], { type: "text/json" });
  var URL = window.URL.createObjectURL(data);
  const tempLink = document.createElement("a");
  tempLink.href = URL;
  tempLink.setAttribute("download", `MemoQuiz_results_${s}.json`);
  return (
    <>
      {restart === false && (
        <>
          {" "}
          <center className="font-link">
            Duration:{"  "}
            {`${Math.floor(items[items.length - 1].seconds / 60)
              .toString()
              .padStart(2, "0")}:${(items[items.length - 1].seconds % 60)
              .toString()
              .padStart(2, "0")}`}
          </center>
          <br></br>{" "}
          <Accordion>
            {items.length > 0 &&
              items.map((item, index) => (
                <>
                  {item.id !== "time" && (
                    <div key={index}>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          Container {index + 1}
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6>Question:</h6>
                          <Editor
                            inactive={true}
                            value={item.question.ops}
                          ></Editor>
                          <br></br>
                          <h6>Your answer:</h6>
                          <Editor
                            inactive={true}
                            value={item.userAnswer.ops}
                          ></Editor>
                          <h6>Correct answer:</h6>
                          <Editor
                            inactive={true}
                            value={item.correctAnswer.ops}
                          ></Editor>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  )}
                </>
              ))}
          </Accordion>
          {fromHome !== true && (
            <Button
              style={{ margin: "2mm" }}
              onClick={() => {
                tempLink.click();
              }}
            >
              <div className="font-link">SAVE RESULTS TO FILE</div>
            </Button>
          )}
          <Button
            style={{ margin: "2mm" }}
            onClick={() => {
              let newArr = [...items];
              newArr.map((item, index) => {
                if (item.id !== "time") {
                  delete item.userAnswer;
                }
                if (item.id === "time") {
                  newArr.splice(index, 1);
                }
              });
              setRestartItems(newArr);
              setRestart(true);
            }}
          >
            <div className="font-link">RESTART WITH SAME QUESTIONS</div>
          </Button>
        </>
      )}
      {restart === true && <Quiz items={restartItems} />}
    </>
  );
};
