/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Editor } from "./editor";

export const Quiz = ({ items }) => {
  const totalLength = items.length;
  const [questionNumber, setQuestionNumber] = useState(0);
  const [finalItems, setFinalItems] = useState(items);
  const [userAnswer, setUserAnswer] = useState({ ops: [{ insert: "" }] });
  const [EditUserAnswerId, setEditUserAnswerId] = useState("");
  const time_seconds = 60;

  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let newArr = [...finalItems];
    console.log(EditUserAnswerId);
    newArr.map((t) => {
      if (t.id === EditUserAnswerId) {
        t.userAnswer = userAnswer;
      }
    });
    setFinalItems(newArr);
  }, [userAnswer]);
  useEffect(() => {
    if (seconds >= 0) {
      setTimeout(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      //end
    }
  }, [seconds]);

  useEffect(() => {
    console.log(finalItems);
  }, [finalItems]);
  useEffect(() => {
    if (!finalItems[questionNumber].userAnswer) {
      setUserAnswer({ ops: [{ insert: "" }] });
    }
    if (finalItems[questionNumber].userAnswer) {
      setUserAnswer({
        ops: finalItems[questionNumber].userAnswer.ops,
      });
    }
  }, [questionNumber]);
  return (
    <>
      <center className="font-link">{`${Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")}:${(seconds % 60)
        .toString()
        .padStart(2, "0")}`}</center>
      <br></br>
      <Card>
        <Card.Header>
          <center className="font-link">QUESTION #{questionNumber + 1}</center>
          <Editor
            inactive={true}
            value={items[questionNumber].question.ops}
          ></Editor>
        </Card.Header>
        <Card.Body>
          <center className="font-link">YOUR ANSWER</center>
          <div
            onClick={() => {
              setEditUserAnswerId(items[questionNumber].id);
            }}
          >
            <Editor
              inactive={false}
              value={userAnswer}
              id={`userA-${questionNumber}`}
              setValue={setUserAnswer}
            ></Editor>
          </div>
        </Card.Body>
        <Card.Footer>
          <center>
            {questionNumber > 0 && (
              <Button
                style={{ margin: "2mm" }}
                onClick={() => {
                  setEditUserAnswerId(items[questionNumber - 1].id);
                  setQuestionNumber((questionNumber) => questionNumber - 1);
                }}
              >
                <div className="font-link">PREVIOUS QUESTION</div>
              </Button>
            )}
            {questionNumber !== totalLength - 1 && (
              <Button
                style={{ margin: "2mm" }}
                onClick={() => {
                  setEditUserAnswerId(items[questionNumber + 1].id);
                  setQuestionNumber((questionNumber) => questionNumber + 1);
                }}
              >
                <div className="font-link">NEXT QUESTION</div>
              </Button>
            )}
            {questionNumber === totalLength - 1 && (
              <Button
                style={{ margin: "2mm" }}
                variant="success"
                onClick={() => {
                  let newArr = [...finalItems];
                  newArr.push({ id: "time", seconds: seconds });
                  setFinalItems(newArr);
                }}
              >
                <div className="font-link">SUBMIT ANSWERS</div>
              </Button>
            )}
          </center>
        </Card.Footer>
      </Card>
    </>
  );
};
