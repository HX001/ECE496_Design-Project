import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import Question from '../data/sampleQuestion.json';
import Grid from "@material-ui/core/Grid";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Dialog } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import Draggable from 'react-draggable';
import Checkbox from '@material-ui/core/Checkbox';
import CustomSnackbarContent from "./CustomSnackBar/CustomSnackbarContent";
import Typography from "@material-ui/core/Typography";
import controller from "../controller/controller";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

class Questionnaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions : Question,
            answers: new Array(Question.length),
            openSnackbar: false,
            correct: 0,
            // color: new Array.repeat("primary", Question.length)
            openSnackbar2: false,
        }
    }

    PaperComponent(props) {
        return (
          <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
              <Paper {...props} />
          </Draggable>
        );
    }

    saveAnswer = () => {
        console.log(this.props);
       // if (this.state.correct == Question.length) {

            let examInfo = {
                course_code : this.props.exam.course,
                course_type : this.props.exam.type,
                user_id : "carr",
                start_time: "111",
            }
            controller.createExam(examInfo)
                .then(response => {

                })

            this.props.history.push({
                pathname: `/exam/${this.props.exam.course}`,
                state: { detail: {info: examInfo} },
            })
        // }
        // else {
        //     this.setState({openSnackbar2 : true})
        // }

    }

    renderAnswer(ans, i , handleSelect) {
        return (
          <div>
              <FormControlLabel
                control={<Checkbox color="secondary" name={ans} onChange={() => handleSelect(ans, i)} checked={ans == this.state.answers[i]}/>}
                label= {ans}
              />
          </div>
        )
    }


    renderQuestion(question, i) {
        const items = [];
        const handleSelect = (ans, i) => {
            console.log(ans)
            const answers = this.state.answers;
            if(answers[i] == question.correct ){
                this.setState({correct: this.state.correct-1});
            }
            answers[i] = ans;
            this.setState(answers);
            if (question.correct !== ans) {
                const answers = this.state.answers;
                answers[i] = ans;
                this.setState(answers);
                this.setState({openSnackbar: true});
            }
            else
                this.setState({correct: this.state.correct+1});
        }

        question.answer.forEach((ans) => {
            items.push(this.renderAnswer(ans, i, handleSelect))
        })

        return(
          <div>
              <Grid container spacing={2} >
                  <Grid item className='questionaire_grid'>
                      <Paper>
                          <FormControl required component="fieldset">
                              <FormLabel component="legend">
                                  {question.question}
                              </FormLabel>
                              <FormGroup>
                                  {items}
                              </FormGroup>
                          </FormControl>
                      </Paper>
                  </Grid>
              </Grid>
              <br/>
          </div>
        )
    }

    handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({openSnackbar: false});
      this.setState({openSnackbar2: false});
    };

    render() {
        const items = [];
        this.state.questions.map((question, i) => {
            items.push(this.renderQuestion(question, i))
        })
        return (
            <div>
                <Dialog
                  open={this.props.open}
                  PaperComponent={this.PaperComponent}
                  aria-labelledby={'Assign groups'}
                  fullWidth={true}
                >
                    <Paper className="questionaire">
                        <Typography variant="h4">
                          Ethic Test
                        </Typography>
                        <br/>
                        <br/>
                        {items}
                        <Button variant="contained" color="primary" onClick={this.saveAnswer.bind(this)}> Save Answer </Button>
                    </Paper>
                </Dialog>

                <Snackbar
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                  }}
                  open={this.state.openSnackbar}
                  autoHideDuration={5000}
                  onClose={this.handleCloseSnackbar}
                  // onExited={this.handleExitedSnackbar}
                >
                    <CustomSnackbarContent
                      onClose={this.handleCloseSnackbar}
                      variant="warning"
                      message="The answer is incorrect, please check academic code."
                    />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openSnackbar2}
                    autoHideDuration={5000}
                    onClose={this.handleCloseSnackbar}
                    // onExited={this.handleExitedSnackbar}
                >
                    <CustomSnackbarContent
                        onClose={this.handleCloseSnackbar}
                        variant="error"
                        message="You can't start exam without finish all the questions."
                    />
                </Snackbar>
            </div>
        );
    }
}

export default withRouter(Questionnaire);