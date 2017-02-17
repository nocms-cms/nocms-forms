import React, { Component } from 'react';
import { Form, Input } from 'nocms-forms';

export default class EmptyStep extends Component {
  constructor(){
    super();
    this.handleNextClick = this.handleNextClick.bind(this);
    this.state = {
      errorText: null,
    };
  }

  handleNextClick(e){
    e.preventDefault();
    this.props.goNext({});
  }

  render(){
    return (
      <div>
        <h1>Empty step</h1>
        {this.props.backButton}
        <button onClick={this.handleNextClick}>Next</button>
      </div>
    );
  }
}
