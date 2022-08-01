/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */

import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Help } from "../components/help";
import { InsertAuto } from "../components/insertAuto";
import { InsertManual } from "../components/insertManual";
import { InsertResults } from "../components/insertResults";

export const Home = () => {
  const [insertManual, setInsertManual] = useState(false);
  const [insertAuto, setInsertAuto] = useState(false);
  const [insertResults, setInsertResults] = useState(false);
  const [help, setHelp] = useState(false);

  return (
    <>
      <Card style={{borderColor:"transparent"}}>
        <center style={{ fontSize: 40 }} className="font-link">
          <a
            href=""
            style={{
              textDecoration: "none",
              textDecorationColor: "none",
              color: "black",
            }}
          >
            MemoQuiz
          </a>
          {/* veificar isto */}
        </center>
        {insertAuto === false &&
          insertManual === false &&
          insertResults === false &&
          help === false && (
            <center className="font-link">
              Welcome to MemoQuiz<br></br> An app to help you memorize things
              <br></br>
            </center>
          )}

        <br></br>
        {insertAuto === false &&
          insertManual === false &&
          insertResults === false &&
          help === false && (
            <center>
              <Button
                onClick={() => {
                  setInsertManual(true);
                }}
                style={{
                  marginTop: "2mm",
                  width: "60%",
                }}
              >
                <div className="font-link">ADD QUESTIONS MANUALLY</div>{" "}
              </Button>
              <br></br>
              <Button
                style={{
                  marginTop: "2mm",
                  width: "60%",
                }}
                onClick={() => {
                  setInsertAuto(true);
                }}
              >
                <div className="font-link">IMPORT QUESTIONS FROM FILE</div>{" "}
              </Button>{" "}
              <br></br>
              <Button
                style={{
                  marginTop: "2mm",
                  width: "60%",
                }}
                onClick={() => {
                  setInsertResults(true);
                }}
              >
                <div className="font-link">IMPORT RESULTS FROM FILE</div>{" "}
              </Button>{" "}
              <br></br>
              <Button
                variant="info"
                style={{
                  marginTop: "2mm",
                  width: "60%",
                }}
                onClick={() => {
                  setHelp(true);
                }}
              >
                <div className="font-link">HOW IT WORKS?</div>{" "}
              </Button>
            </center>
          )}

        {insertManual && <InsertManual items={[]} setIsOn={setInsertManual} />}
        {insertAuto && <InsertAuto setIsOn={setInsertAuto} />}
        {insertResults && <InsertResults setIsOn={setInsertResults} />}
        {help && <Help setIsOn={setHelp} />}
        {insertAuto === false &&
          insertManual === false &&
          insertResults === false &&
          help === false && (
            <center
              style={{ marginTop: "16vh", marginBottom: "2mm" }}
              className="font-link"
            >
              Made by{" "}
              <a href="https://github.com/davidjalves">David Ressurreição</a>
            </center>
          )}
      </Card>
      <br></br>
    </>
  );
};
