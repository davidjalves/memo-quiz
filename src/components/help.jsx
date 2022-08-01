import { Button, Card } from "react-bootstrap";

export const Help = ({ setIsOn }) => {
  return (
    <center className="font-link">
      <Card>
        <Card.Body>
          GENERAL<br></br>
          The purpose of this app is to help you memorize things, for exemple,
          studying for exams, or just exercise your memory. The app also has a
          time counter to help you improve your efficency.
          <br></br> <br></br>
          ADD NEW QUESTIONS/ANSWERS MANUALLY<br></br>
          <h6>
            With this option you can add questions and correct answers one by
            one, then you can start answering them or save them to answer later.
          </h6>
          <br></br>
          IMPORT QUESTIONS/ANSWERS FROM FILE<br></br>
          <h6>
            With this option you can import the questions and answers that you
            previously created and answer them.
          </h6>
          <br></br>
          IMPORT RESULTS FROM FILE<br></br>
          <h6>
            When the quiz ends, you have the option
            to view your result in the quiz, including the comparasion between
            your answer and the correct answer, or save it to a file. Then, with
            this option you can import the results to view them again.
          </h6>
        </Card.Body>
      </Card>
      <Button
        variant="info"
        style={{ margin: "2mm" }}
        onClick={() => {
          setIsOn(false);
        }}
      >
        <div className="font-link">GO BACK</div>
      </Button>
    </center>
  );
};
