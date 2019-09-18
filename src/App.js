import React from 'react';
import logo from './osparclogo.JPG';

import './App.css';
import { MDBContainer, MDBModal,
  MDBModalBody, MDBModalHeader, MDBModalFooter, 
  MDBCard, MDBBtn, MDBIcon,MDBBadge, 
  MDBInputGroup, MDBRow, MDBCol } from "mdbreact";
import Dropzone from 'react-dropzone'


class App extends React.Component {

  state = {};
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      affiliation: "",

      modal: false,
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
          name: "input_1",
          type: "integer",
          IO: "input",
          onDelete: this.handleDelete,
        },
      ],
      outputs: [
        {
          number: 1,
          name: "output_1",
          type: "csv-file",
          IO: "output",
          onDelete: this.handleDelete,
        },
      ]
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

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
  
  handleTextChange = inputName => value => {
    const nextValue = value;
    this.setState({
      [inputName]: nextValue
    });
  };

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    console.log(acceptedFiles[0].name);
    this.setState({
      codefile: acceptedFiles[0].name
    });
  }
  
  onValDataDrop = (acceptedFiles, thisIOfilename) => {
    // if the input/output already exists, remove the associated file and replace it with the new file.
    const targetfilename = thisIOfilename+"_validationfile";
    const untargetedfiles = this.state.valFilelist.filter(e=>e.fileID !== targetfilename);
    this.setState({ valFilelist: untargetedfiles });
    console.log(targetfilename)

    var newArray = [...this.state.valFilelist];
    const thisname=thisIOfilename+"_validationfile"; 
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
      <React.Fragment>

      <MDBModal centered isOpen={this.state.modal} toggle={this.toggleModal}>
        <MDBModalHeader
          className="text-center"
          titleClass="w-100 font-weight-bold"
          toggle={this.toggleModal}
        >
          Automated Checking and Submission 
        </MDBModalHeader>
        <MDBModalBody>
          <p>Thank you {this.state.firstname + " "}for your submission. We are performing automatic 
          validation and will contact you when your service is integrated into O2S2PARC or 
          if we have any questions. </p>
          <MDBCol xl="3" md="6" className="mx-auto text-center">
            <MDBBtn color="info" rounded onClick={this.toggleModal} >
              OK
            </MDBBtn>
          </MDBCol>
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
        </MDBModalFooter>
      </MDBModal>
      
      
      <MDBContainer>
        <MDBRow> <h1 className="my-3" >{" "}</h1></MDBRow>

        <img src={logo} alt="logo" />
        <h1  className="text-uppercase my-4 grey-text" centered>
          Create a new service </h1>

        {/* USER INFORMATION */}
        <h5 className="text-uppercase  my-3 orange-text" >Contributor Information</h5>
        <hr className="hr-bold my-3" />
        <MDBRow>
          <MDBCol>
            <MDBInputGroup className="mb-2" hint="First Name" getValue={this.handleTextChange("firstname")}/>
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="mb-2" hint= "Last Name" getValue={this.handleTextChange("lastname")}/>
          </MDBCol>
        </MDBRow>
        <MDBInputGroup className="mb-2"  hint="e-mail address" getValue={this.handleTextChange("email")} />
        <MDBInputGroup className="mb-2"  hint="Affiliation" getValue={this.handleTextChange("affiliation")} />

        <h5 className="text-uppercase  my-3 orange-text" >Service Information</h5>
        <hr className="hr-bold my-3" />
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

        <h6> List of dependencies </h6>
          <MDBInputGroup className="mb-3" hint="pandas" />
        <MDBRow> <h5 className=" my-2" >{" "}</h5></MDBRow>

        {/* SERVICE INPUTS */}
        <div>
          <h5 className="text-uppercase  my-2 orange-text" >Define Service Inputs and Outputs</h5>
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
            <MDBBtn color="info" rounded onClick={this.toggleModal} >
              Submit
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </React.Fragment>
    );
  }
}

//========================== Input/Output components ===================================

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

        <MDBRow className="my-1">
          <MDBCol className="md-1" md="1" middle> {this.props.IO} {this.props.number}:
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-1" prepend="name" hint="varname" />
          </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-1" prepend="type" hint= "integer" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-1">
          <MDBCol className="md-1" md="1" middle> {} </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-1" prepend="label" hint="field name in service" />
          </MDBCol>
          {this.props.IO==="input" && (
            <MDBCol>
              <MDBInputGroup className="md-1" prepend="default value" hint= "suggested input value" />
            </MDBCol>
          )}
        </MDBRow >
        <MDBRow className="my-1">
          <MDBCol className="md-1" md="1" middle> {} </MDBCol>
          <MDBCol>
            <MDBInputGroup className="md-1" prepend="description" hint="appears as tooltip" />
          </MDBCol>
        </MDBRow >
        <MDBBadge color="danger" className="ml-2 float-right"
          onClick={() => this.props.onDelete(this.props.name)}>
          - 
        </MDBBadge>
        <MDBRow className="my-1">
          <MDBCol className="mb-1" md="3"> {} </MDBCol>
          <MDBCol className="mb-1" md="8" middle>
          <MDBCard className="header pt-0" >
            <div className="text-center orange-text my-2">
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
