import React, {Component, useState, useEffect} from 'react';
import Question from '../data/examQuestion.json';
import {Button, Form} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";
import {Snackbar} from "@material-ui/core";
import CustomSnackbarContent from "./CustomSnackBar/CustomSnackbarContent";
let speedRecord = [];
let time = 0;
let wordRecord = 0;


class ExamPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      result: [],
      selected: [],
      activeCategory: null,
      placeToView: null,
      showForm: false,
      isLoading: false,
      categories: ["test1"],
      answer: [],
      old_answer: [],
      time: Date.now(),
      typingSpeed: 0,
      openSnackbar: false,
      pasteTimes: 0,
      speedRecord: [],
      questionNumber: 1,
    }
  }



  componentDidMount() {

    const answer = [];
    const old_answer = [];
    const empty_string = "";

    Question.forEach(()=> {
      answer.push(empty_string);
      old_answer.push(empty_string);
    })

    this.setState({answer : answer, old_answer: old_answer});

    console.log("123");

    this.interval = setInterval(() => {

      const speed = this.state.answer[this.state.questionNumber-1].length - this.state.old_answer[this.state.questionNumber-1].length;
      console.log(this.state.answer[this.state.questionNumber-1].length);
      console.log(this.state.old_answer[this.state.questionNumber-1].length);
      const old_answer = this.state.old_answer;
      old_answer[this.state.questionNumber-1] = answer[this.state.questionNumber-1];
      this.setState({old_answer: old_answer})
      console.log("Typing Speed: " + speed + "characters/per second");
      if(speed != 0) {
          speedRecord.push({x: time, y:speed});
          time++;
      }
    }, 1000);

  }
  componentWillUnmount() {
  }

  showQuestions = (event) => {
    wordRecord += this.state.answer[this.state.questionNumber-1].length - this.state.old_answer[this.state.questionNumber-1].length;
    const old_answer = this.state.old_answer;
    old_answer[this.state.questionNumber-1] = this.state.answer[this.state.questionNumber-1];
    this.setState({old_answer: old_answer})
    this.setState({questionNumber: event.target.value })
  }

  FinishExam = () => {
    console.log(speedRecord);
    this.props.history.push({
      pathname: `/exam/${this.props.match.params.examId}/report`,
      state: { detail: {record: speedRecord, paste: this.state.pasteTimes} },
    })
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({openSnackbar: false});
    this.setState({openSnackbar2: false});
  };

  handleAnswerChange = (event) => {
    let answer = this.state.answer;
    answer[this.state.questionNumber-1] = event.target.value
    this.setState({answer : answer })
  }

  createSelectItems() {
    let items = [];

    Question.forEach((q)=> {
      items.push(<option key={q.index} value={q.index}>Question {q.index}</option>);
    })

    return items;
  }
  pasteBehavior = () => {

  }

  render() {
    return (
      <div className="exam">
        <Form className="question-part">
          <Typography variant="h4" color="primary">
            {this.props.match.params.examId}
          </Typography>
          <Form.Group controlId="userForm">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="email" placeholder="Enter your Name" />
          </Form.Group>

          <Form.Group controlId="questionForm1">
            <Form.Label>Question list</Form.Label>
            <Form.Control
              as="select"
              onChange={this.showQuestions.bind(this)}
            >
              {this.createSelectItems()}
            </Form.Control>
          </Form.Group>

          {/*<Form.Group controlId="questionForm2">*/}
          {/*  <Form.Label>Select following Answer</Form.Label>*/}
          {/*  <Form.Control as="select" multiple>*/}
          {/*    <option>Answer 1</option>*/}
          {/*    <option>Answer 2</option>*/}
          {/*    <option>Answer 3</option>*/}
          {/*    <option>Answer 4</option>*/}
          {/*    <option>Answer 5</option>*/}
          {/*  </Form.Control>*/}
          {/*</Form.Group>*/}
          <Form.Group controlId="answerForm">
            <Form.Label>Question content:</Form.Label>
            <Form.Control
                as="textarea"
                rows="3"
                value={Question[this.state.questionNumber-1].question}
                readOnly
            />
          </Form.Group>
          <Form.Group controlId="answerForm">
            <Form.Label>Type you answer below:</Form.Label>
            <Form.Control
              placeholder="Type your answer"
              as="textarea"
              rows="3"
              value={this.state.answer[this.state.questionNumber-1]}
              onChange={(e)=>this.handleAnswerChange(e) }
              onPaste={(e)=>{
                this.setState({openSnackbar:true});
                this.setState({pasteTimes: this.state.pasteTimes+1});
              }}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.FinishExam.bind(this)}>Submit Answer </Button>
        </Form>
        <br/>

        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.openSnackbar}
            autoHideDuration={10000}
            onClose={this.handleCloseSnackbar}
            // onExited={this.handleExitedSnackbar}
        >
          <CustomSnackbarContent
              onClose={this.handleCloseSnackbar}
              variant="warning"
              message="Copy paste action may considered as potential cheating behavior."
          />
        </Snackbar>

      </div>
    );
  }
}

export default withRouter(ExamPage);