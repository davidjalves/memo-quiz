/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Editor } from "./editor";
import { Quiz } from "./quiz";

export const InsertManual = ({ setIsOn, items }) => {
  const [accordionItems, setAccordionItems] = useState(items);
  const [EditQuestionId, setEditQuestionId] = useState("");
  const [question, setQuestion] = useState({ ops: [{ insert: "" }] });
  const [correctAnswer, setCorrectAnswer] = useState({ ops: [{ insert: "" }] });
  const [EditCorrectAnswerId, setEditCorrectAnswerId] = useState("");
  const [quiz, setQuiz] = useState(false);
  useEffect(() => {
    let newArr = [...accordionItems];

    newArr.map((t) => {
      if (t.id === EditQuestionId) {
        t.question = question;
      }
      if (t.id === EditCorrectAnswerId) {
        t.correctAnswer = correctAnswer;
      }
    });
    setAccordionItems(newArr);
  }, [question, correctAnswer]);

  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];
  let s = join(new Date(), a, "-");

  var data = new Blob([JSON.stringify(accordionItems)], { type: "text/json" });
  var URL = window.URL.createObjectURL(data);
  const tempLink = document.createElement("a");
  tempLink.href = URL;
  tempLink.setAttribute("download", `MemoQuiz_questions_answers_${s}.json`);
  return (
    <center>
      {console.log(items)}
      <Accordion>
        {accordionItems.length > 0 &&
          quiz === false &&
          accordionItems.map((item, index) => (
            <div key={index}>
              <Accordion.Item
                eventKey={index}
                onClick={() => {
                  setQuestion(item.question);
                  setCorrectAnswer(item.correctAnswer);
                  setEditQuestionId(item.id);
                  setEditCorrectAnswerId(item.id);
                }}
              >
                <Accordion.Header>
                  <button
                    style={{
                      fontSize: 20,
                      color: "red",
                    }}
                    onClick={() => {
                      setAccordionItems((i) =>
                        i.filter((c) => c.id !== item.id)
                      );
                    }}
                  >
                    ❌
                  </button>
                  <div style={{ paddingRight: "4mm" }}></div>
                  <div
                    style={{
                      fontSize: 20,
                    }}
                    className="font-link"
                  >
                    Container {index + 1}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <h6>Question:</h6>
                  <Editor
                    inactive={false}
                    value={question}
                    id={`q-${index}`}
                    setValue={setQuestion}
                  ></Editor>
                  <br></br>
                  <h6>Correct answer:</h6>
                  <Editor
                    inactive={false}
                    value={correctAnswer}
                    id={`ca-${index}`}
                    setValue={setCorrectAnswer}
                  ></Editor>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
      </Accordion>
      {quiz === false && (
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
          <Button
            onClick={() => {
              setAccordionItems((i) => [
                ...i,
                { id: Math.random(), question: "", correctAnswer: "" },
              ]);
              // setCorrectAnswer({ ops: [{ insert: "" }] });
              //setQuestion({ ops: [{ insert: "" }] });
              setEditQuestionId("");
              setEditCorrectAnswerId("");
            }}
          >
            <div className="font-link"> ADD NEW QUESTION/ANSWER</div>
          </Button>
          <br></br>
        </>
      )}

      {accordionItems.length > 0 &&
        accordionItems[0].question !== "" &&
        accordionItems[0].correctAnswer !== "" &&
        quiz === false && (
          <>
            <Button
              style={{ marginTop: "2mm" }}
              onClick={() => {
                tempLink.click();
              }}
            >
              <div className="font-link">SAVE QUESTIONS/ANSWERS TO FILE</div>
            </Button>
            <br></br>
            <Button
              variant="success"
              style={{ marginTop: "2mm" }}
              onClick={() => {
                setQuiz(true);
              }}
            >
              <div className="font-link">START ANSWERING</div>
            </Button>
          </>
        )}

      {quiz === true && <Quiz items={accordionItems} />}
    </center>
  );
};
