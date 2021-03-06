import sampleReport from '../data/sampleReport.json';
import React, {useMemo, Component} from 'react';
import {Button, Form} from "react-bootstrap";
import MaterialTable from 'material-table';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import { useLocation } from 'react-router-dom';
import CanvasJSReact from '../assets/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let CanvasJS = CanvasJSReact.CanvasJS;


const ReportPage = () => {

    const location = useLocation();
    const checkBoxColumns = [
        { title: 'Website Accessed', field: 'url' },
        { title: 'Type', field: 'type' },
        { title: 'Risk level', field: 'risklevel' },
        { title: 'Access time', field: 'atime' },
    ]

    const optionsTable = useMemo(() => ({ actionsColumnIndex: -1, search: false, showTitle: false }), []);
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        title:{
            text: "typing speed"
        },
        axisY: {
            title: "Character/sec",
            suffix: ""
        },
        axisX: {
            title: "",
            prefix: "",
            interval: 2
        },
        data: [{
            type: "line",
            // toolTipContent: "Week {x}: {y}%",
            dataPoints: location.state.detail.record
        }]
    }
    return (
      <div className="questionnaire">
        <div>
          <Paper className="report">
              <Typography variant="body1">
                Below is the report of user typing speed:
              </Typography>
              <br/>
              <Typography variant="body1">
                The user have paste behavior {location.state.detail.paste} times.
              </Typography>
              <CanvasJSChart options = {options}
                  /* onRef={ref => this.chart = ref} */
              />
          </Paper>

            <Paper className="report">
                <Typography variant="body1">
                    Below is the urls user viewed and the risk:
                </Typography>
                <br/>
                <MaterialTable
                    columns={checkBoxColumns}
                    options={{ actionsColumnIndex: -1, search: false, showTitle: false }}

                    // options={optionsTable}
                    data={sampleReport}
                />
            </Paper>
        </div>

      </div>
    );
}

export default ReportPage;