import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Exam from '../data/examList.json';
import Questionnaire from "./Questionnaire";

const ExamList = () => {
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [course, setCourse] = React.useState({});

  React.useEffect(() => {
    const loadExam = () => {
      const render = [];
      Exam.forEach(exam => {
        render.push(renderExam(exam))
      })
      setItems(render);
    }
    loadExam();
  }, []);

  const openQuestionnaire = (course) => {
    console.log(course)
    setCourse(course);
    setOpen(true);
  }

  const renderExam = (exam) => {
    return(
      <div>
        <Grid container spacing={2} >
          <Grid item className='exam_grid'>
            <Paper>
              <Typography variant="h4" color="primary">
                {exam.course}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {exam.time}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {exam.title}
              </Typography>
              <Button className='exam_button' variant="contained" color="primary"
                      onClick={() => openQuestionnaire(exam)}>
                Start Exam
              </Button>
            </Paper>

          </Grid>

        </Grid>
        <br/>
      </div>
    )
  }

  return (
    <div>
      <Paper className="exam_list">
        {items}

      </Paper>

      <Questionnaire
        open={open}
        exam={course}
      />
    </div>
  );
}

export default ExamList;