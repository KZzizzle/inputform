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

      valfilecount: 0,

      valFilelist: [{
        fileID: null,
        file: null,
        filename: "Upload Validation File"
      }],


      inputs: [
        {
          number: 1,
          key: "input_1",
          type: "integer",
          IO: "input",
          onDelete: this.handleDelete,
        },
      ],
      outputs: [
        {
          number: 1,
          key: "output_1",
          type: "csv-file",
          IO: "output",
          onDelete: this.handleDelete,
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
  
  onValDataDrop = (acceptedFiles, thisIOname) => {
    var newArray = [...this.state.valFilelist];
    const thisname=thisIOname+"_validationfile"; 
    if (acceptedFiles!==undefined){
      const thisfile= acceptedFiles[0]
      const thisfilename=acceptedFiles[0].name

      newArray.push({
        fileID: thisname,
        file: thisfile,
        filename: thisfilename
      });

      this.setState({ valFilelist: newArray });
      this.setState(({ valfilecount }) => ({ valfilecount: valfilecount + 1 }));
    }
    console.log( this.state.valFilelist)
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
            <MDBInputGroup className="mb-3" hint="First Name" />
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="mb-3" hint= "Last Name" />
          </MDBCol>
        </MDBRow>

        <MDBInputGroup className="mb-3"  hint="e-mail address" />

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
       
        <h6> Command Line to Run Code </h6>
          <MDBInputGroup className="mb-3" hint="Ex. myfunction(input1)" />

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
                onValDataDrop={this.onValDataDrop}
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
                onValDataDrop={this.onValDataDrop}
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
      filename: "Upload Validation File"
    };
  }

  updateName=acceptedFiles => {
    if(acceptedFiles !== undefined){
      const thisfilename= acceptedFiles[0].name;
      this.setState({filename: thisfilename});
    }
  }

  handlechange = (acceptedFiles) => {
    this.props.onValDataDrop(acceptedFiles, this.props.name);
    this.updateName(acceptedFiles);
  }
  
  render() {
    
    return (
      <MDBContainer>
        <MDBBadge color="danger" className="ml-2 float-right"
          onClick={() => this.props.onDelete(this.props.name)}>
          - 
        </MDBBadge>
        <MDBRow>
          <MDBCol className="md-2" md="2" middle> {this.props.IO} {this.props.number} :
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-2" prepend="name" hint="varname" />
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-2" prepend="type" hint= "integer" />
          </MDBCol>
        </MDBRow>
        <p></p>
        <MDBRow>
          <MDBCol className="mb-1" md="2"> {} </MDBCol>
          <MDBCol className="mb-1" md="9">
          <MDBCard>
            <div style={{backgroundColor: '#eceff1'}} className="text-center orange-text">
            <Dropzone onDrop={this.handlechange}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {this.state.filename} 
                </div>
              )}
            </Dropzone>
            </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow> <h5 className=" my-2" >{" "}</h5></MDBRow>
      </MDBContainer>
    );
  }
}

export default App;
