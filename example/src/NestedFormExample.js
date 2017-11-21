import React, { Component } from 'react'
import { Form, SubForm, InputList, Field, InputListItem } from 'nocms-forms';

const sectionTypes = ['Choose...', 'Program', 'Heading', 'Details'];

class NestedFormExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialState: {
        meta: {
          title: 'title',
          subtitle: 'subtitle',
        },
        sections: [
          { 
            title: 'subform title',
            type: 'Program',
            activities: [
              {
                title: 'activity 1'
              }
            ]
          },
          {
            title: 'subform2 title',
            type: 'Heading',
            activities: [
              {
                title: 'activity 2'
              },
              {
                title: 'activity 3'
              }
            ]
          }
        ]
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Form
        initialState={{ colors: [{ color: 'blue'}, { color: 'red' }]} }
        submitButtonText="Save"
        submitButtonClassName="btn btn-lg btn-submit"
        store="edit-camp-form"
        submittingText="Saving..."
        onSubmit={this.handleSubmit}
      >
        <InputList
          name="colors"
          of={
            <InputListItem>
              <Field name="color" label="Color" required/>
            </InputListItem>
          }
        />
      </Form>
    )
   // const { onSubmit, camp } = this.props;
   /*
    return (
      <div>
        <h1>Edit {this.state.initialState.title}</h1>
        <Form
          initialState={this.state.initialState}
          submitButtonText="Save"
          submitButtonClassName="btn btn-lg btn-submit"
          store="edit-camp-form"
          submittingText="Saving..."
          onSubmit={this.handleSubmit}
        >
          <SubForm name="meta">
            <div>
              <Field name="title" label="Title" />
              <Field name="subtitle" label="Subtitle" />
              <Field name="menuHeading" label="Menu heading" /> 
            </div>
          </SubForm>
          <div className="row">
              <hr/>
              <h2>Sections</h2>       
              <hr/>
              <InputList
                name="sections"
                addButtonText="New section"
                addButtonClassName="btn"
                removeButtonText="Remove section"
                of={
                    <SubForm>
                      <fieldset className="fieldset-section">
                        <legend>Section</legend>
                        <div className="col-md-6">
                          <Field name="title" label="Title" />              
                          <Field name="type" label="Type" type="select" options={sectionTypes}/>                        
                        </div>
                        <div className="col-md-6 activities-section">
                          <h3>Activities</h3>
                          <InputList
                            name="activities"
                            addButtonText="New activity"
                            addButtonClassName="btn"
                            removeButtonText="Remove"
                            of={
                              <SubForm>
                                <fieldset>
                                  <legend>Activity</legend>
                                  <Field name="title" label="Title" />
                                  <Field name="location" label="Location" />
                                  <Field name="description" label="Description" />
                                  <SubForm name="time">
                                    <div>
                                      <Field name="start" label="Start" type="time"/>
                                      <Field name="end" label="End" type="time"/>
                                    </div>
                                  </SubForm>
                                </fieldset>
                              </SubForm>
                            }
                          />
                        </div>
                      </fieldset>
                    </SubForm>
                  }                
                />
          </div>
          <br/>
        </Form>
      </div>
    ); */
  }

  handleSubmit(formData, cb) {
    console.log(formData);
    cb();
  }
}

export default NestedFormExample;