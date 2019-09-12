import React from 'react';
import logo from './osparclogo.JPG';

import './App.css';
import { MDBContainer,MDBCard, MDBBtn, MDBIcon,MDBBadge, MDBInputGroup, MDBRow, MDBCol } from "mdbreact";
import Dropzone from 'react-dropzone'


class App extends React.Component {

  state = {};
  constructor(props) {
    super(props);
    this.state = {

      codefile: null,

      inputs: [
        {
          number: 1,
          name: "input_1",
          type: "integer",
          IO: "input"
        },
      ],
      outputs: [
        {
          number: 1,
          name: "output_1",
          type: "csv-file",
          IO: "output"
        },
      ]
    };
  }

  handleDelete = ioname => {
    const inputs = this.state.inputs.filter(e=>e.name !== ioname);
    this.setState({ inputs });
    const outputs = this.state.outputs.filter(e=>e.name !== ioname);
    this.setState({ outputs });
  };
  

  addinput = () => {
    var newArray = [...this.state.inputs];
    const thisnumber=newArray.length ? newArray[newArray.length - 1].number + 1 : 1
    const thisname="input_"+thisnumber
    newArray.push({
      number: thisnumber,
      name: thisname,
      type: this.state.type,
      IO: "input"
    });
    this.setState({ inputs: newArray });
    this.setState({
      type: "",
      name: ""
    });
  };


  addoutput = () => {
    var newArray = [...this.state.outputs];
    const thisnumber=newArray.length ? newArray[newArray.length - 1].number + 1 : 1
    const thisname="output_"+thisnumber
    newArray.push({
      number: thisnumber,
      name: thisname,
      type: this.state.type,
      IO: "output"
    });
    this.setState({ outputs: newArray });
    this.setState({
      type: "",
      name: ""
    });
  };
  
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    console.log(acceptedFiles[0].name);
    this.setState({
      codefile: acceptedFiles[0].name
    });
  }
  
  render() {
    return (
      
      <MDBContainer>
        <MDBRow> <h1 className="my-3" >{" "}</h1></MDBRow>

        <img src={logo} alt="logo" />
        <h1  className="text-uppercase my-4 grey-text">
          Create a new service </h1>

        {/* USER INFORMATION */}
        <MDBRow>
          <MDBCol>
            <MDBInputGroup containerClassName="mb-3" hint="First Name" />
          </MDBCol>
          <MDBCol>
            <MDBInputGroup containerClassName="mb-3" hint= "Last Name" />
          </MDBCol>
        </MDBRow>

        <MDBInputGroup containerClassName="mb-3"  hint="e-mail address" />

        <h6> Description of the service </h6>
        <div className="mb-3 input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
                </span>
            </div>
            <textarea className="form-control" id="description"  rows="3"></textarea>
        </div>
      
        <h6> Code Upload </h6>
        <div className="text-center mb-3 grey-text">
          <MDBCard>
            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <p></p><p> {this.state.codefile ? this.state.codefile : "Your Python Code File"} </p>
                </div>
              )}
            </Dropzone>
          </MDBCard>
        </div>
       
        <MDBRow> <h5 className=" my-2" >{" "}</h5></MDBRow>

        {/* SERVICE INPUTS */}
        <div>
          <h5 className="text-uppercase  my-2 orange-text" >Define Inputs and Outputs</h5>
          <hr className="hr-bold my-1" />
          <div number="Inputs">
            <h6 className="text-uppercase my-3">Inputs</h6>
            {this.state.inputs.map(input => (
              <IO
                number={input.number}
                name={input.name}
                type={input.type}
                IO={input.IO}
                onDelete={this.handleDelete}
              />
            ))}
          </div>
          <MDBRow>
            <hr className="hr-bold my-2" />
            <MDBIcon icon="plus-square" size="lg" className="grey-text float-right"
            onClick={() => (this.addinput())}/>
          </MDBRow>
        </div>

        {/* OUTPUTS */}
        <div>
          <hr className="hr-bold my-1" />
          <div number="Outputs">
            <h6 className="text-uppercase my-3">Outputs</h6>
            {this.state.outputs.map(output => (
              <IO
                number={output.number}
                name={output.name}
                type={output.type}
                IO={output.IO}
                onDelete={this.handleDelete}
              />
            ))}
          </div>

          <MDBRow>
            <hr className="hr-bold my-2" />
            <MDBIcon icon="plus-square" size="lg" className="grey-text float-right"
            onClick={() => (this.addoutput())}/>
          </MDBRow>
        </div>

        {/* SUBMIT */}
        <MDBRow className="mb-5">
          <MDBCol xl="3" md="6" className="mx-auto text-center">
            <MDBBtn color="info" rounded >
              Submit
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    );
  }
}

class IO extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [{
        fileID: null,
        file:null
      }],
      loaded: 0
    };
  }

  onChangeHandler=event=>{
    var FileArray = [...this.state.selectedFiles];
    FileArray.push({
      fileID:  "file",
      file: event.target.files[0]
    });
    this.setState({
      selectedFiles: FileArray,
      loaded: 0,
    })

  }

  render() {
    return (
      <MDBContainer>
        <MDBBadge color="danger" className="ml-2 float-right"
          onClick={() => this.props.onDelete(this.props.name)}>
          - 
        </MDBBadge>
        <MDBRow>
          <MDBCol containerClassName="mb-1" md="2" middle> {this.props.IO} {this.props.number} :
          </MDBCol>
          <MDBCol>
            <MDBInputGroup containerClassName="mb-1" prepend="name" hint="varname" />
          </MDBCol>
          <MDBCol>
            <MDBInputGroup containerClassName="mb-1" prepend="type" hint= "integer" />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol containerClassName="mb-2" md="2"> {} </MDBCol>
          <MDBCol containerClassName="mb-2" md="9">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text orange lighten-4 orange-text"  id="inputGroupFileAddon01">
                  upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  onChange={this.onChangeHandler}
                />


                <label className="custom-file-label grey-text" htmlFor="inputGroupFile01">
                  Choose validation data file
                </label>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow> <h5 className=" my-2" >{" "}</h5></MDBRow>
      </MDBContainer>
    );
  }
}

export default App;
