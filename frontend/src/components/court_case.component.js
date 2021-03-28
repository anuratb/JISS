import GridLayout from 'react-grid-layout';
import React, { Component,useMemo, useState, useEffect  } from "react";

import Table from "./table.js";
import "./court-case.css";

export default class CourtCase extends Component {
  constructor(props) {
    super(props);
    //Details of the Court Case
    this.state = {
      def_name: "",
      def_addr: "",
      pros_name: "",
      pros_addr: "",
      crime_Type: "",
      crime_date: new Date(),
      crime_loc: "",
      arresting_off_name: "",
      date_arrest: new Date(),
      CIN: "",
      date_hearing: new Date(),
      latest_hearing_date: new Date(),
      case_hearing_details: [{ date: "Date", reason: "Reason" }],
      name_pres_judge: "",
      start_date: new Date(),
      expected_completion_of_trial: new Date()
    }
  }
  render() {
    fetch("/api/account").then(res => res.json()).then(res => { console.log(res); });
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: '1', x: 0, y: 0, w: 5, h: 2, static: true },
      { i: '2', x: 10, y: 0, w: 5, h: 2, static: true },
      { i: '3', x: 2, y: 10, w: 10, h: 2, static: true }
    ];
    const columns = [{
      Header: 'Date',
      accessor: 'date'
    }, {
      Header: 'Reason',
      accessor: 'reason'
    }]
    console.log(columns.length);
    return (
      <div className="CourtCase">
        <GridLayout layout={layout} cols={12} rowHeight={30} width={1200}>
          <div key="1">
            <h1>Case : {this.state.CIN}</h1>
            <b>Defendent Name :</b> {this.state.def_name}
            <br />
            <b>Defendent Address :</b> {this.state.def_addr}
            <br /><br />
            <b>Prosecutor Name :</b> {this.state.def_name}
            <br />
            <b>Prosecutor Address :</b> {this.state.def_addr}
            <br /><br />
            <b>Hearing Date: </b>{this.state.date_hearing.toDateString()}
            <br />
            <b>Latest Hearing Date: </b>{this.state.latest_hearing_date.toDateString()}
          </div>
          <div key="2">
            <b>Crime Type :</b>  {this.state.crime_Type}
            <br />
            <b>Crime Date :</b>  {this.state.crime_date.toDateString()}
            <br />
            <b>Crime Location : </b>{this.state.crime_loc}
            <br />
            <b>Name of Arresting Officer :</b>{this.state.arresting_off_name}
            <br />
            <b>Date of Arrest :</b> {this.state.date_arrest.toDateString()}<br />
            <b>Starting Date of Hearing: </b>{this.state.start_date.toDateString()}<br />
            <b>Expected Completion of Trial: </b>{this.state.expected_completion_of_trial.toDateString()}<br />
          </div>
          <div key="3">
            <h2>Summary of Hearings</h2>
            
            <Table columns = {columns} data={this.state.case_hearing_details}></Table>
            

          </div>
        </GridLayout>
      </div>
    )
  }
}