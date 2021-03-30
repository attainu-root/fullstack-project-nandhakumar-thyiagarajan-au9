import React from "react";
import "../styles/Postform.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// import action from redux
import { postApi } from "../../Actions/post";
import { clearUpdate, updated } from "../../Actions/update";
import { connect } from "react-redux";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      form_file: "",
      caption: "",
      alert: false,
    };
  }

  delete_file = () => {
    this.setState({
      ...this.state,
      form_file: null,
      toggle: false,
    });
  };

  fileupload = (file) => {
    if (file[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const Base64 = reader.result;
        this.setState({
          ...this.state,
          form_file: Base64,
          toggle: true,
        });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  formupload = () => {
    if (!this.state.form_file || !this.state.caption) {
      this.setState({
        ...this.state,
        alert: true,
      });
    }
    const postdatas = {
      file: this.state.form_file,
      caption: this.state.caption,
    };
    // dispatch has taken here
    this.props.postApi(postdatas);
    this.setState({
      ...this.state,
      toggle: false,
      form_file: "",
      caption: "",
      alert: false,
    });
  };

  formupdate = () => {
    // start from here
    const formdata = {
      ...this.props.update,
      caption: this.state.caption,
      file: this.state.form_file
        ? this.state.form_file
        : this.props.update.file,
    };

    this.props.updated(formdata);
    this.setState({
      ...this.state,
      caption: "",
    });
    this.props.clearUpdate();
  };

  render() {
    // console.log(this.props.update);
    return (
      <React.Fragment>
        <section className="post_form">
          <Paper elevation={3} className="post_paper">
            {this.state.alert && (
              <Alert severity="error">PLEASE FILL ALL FIELDS</Alert>
            )}
            {this.props.update.caption ? (
              <h2 className="post_form_heading">UPDATE POST</h2>
            ) : (
              <h2 className="post_form_heading">CREATE POST</h2>
            )}

            <TextField
              label="Caption"
              multiline
              rows={3}
              variant="outlined"
              value={this.state.caption}
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  caption: e.target.value,
                })
              }
            />
            <div className="form_upload">
              <input
                className="form_input"
                type="file"
                accept="image/*"
                onChange={(e) => this.fileupload(e.target.files)}
              ></input>
              <Button variant="outlined" color="primary">
                {this.state.form_file ? "SELECTED" : "SELECT FILE"}
              </Button>
            </div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={this.delete_file}
            >
              DELETE
            </Button>
            {this.props.update.caption ? (
              <>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon />}
                  onClick={this.formupdate}
                >
                  UPDATE
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    onClick={this.formupload}
                  >
                    Upload
                  </Button>
                </div>
              </>
            )}
          </Paper>
        </section>
      </React.Fragment>
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.update !== this.props.update) {
      if (this.props.update.caption) {
        this.setState({
          ...this.state,
          caption: this.props.update.caption,
        });
      }
    }
  };
}

const mapStatetoProps = (state) => {
  return {
    update: state.update,
  };
};

export default connect(mapStatetoProps, {
  postApi,
  clearUpdate,
  updated,
})(Form);
