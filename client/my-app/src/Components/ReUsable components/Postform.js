import React from 'react';
import '../styles/Postform.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form_file: '',
      alert: false,
    };
  }

  delete_file = () => {
    this.setState({
      ...this.state,
      form_file: '',
    });
  };

  fileupload = () => {
    const reader = new FileReader();
    reader.readAsDataURL(this.state.form_file);
    reader.onload = () => {
      const Base64 = reader.result;
      console.log(Base64);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };
  render() {
    return (
      <React.Fragment>
        <section className="post_form">
          <Paper elevation={3} className="post_paper">
            {this.state.alert && (
              <Alert severity="error">PLEASE FILL ALL FIELDS</Alert>
            )}
            <h2 className="post_form_heading">CREATE POST</h2>
            <TextField label="Caption" multiline rows={3} variant="outlined" />
            <div className="form_upload">
              <input
                className="form_input"
                type="file"
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    form_file: e.target.files[0],
                  })
                }
              ></input>
              <Button variant="outlined" color="primary">
                {this.state.form_file ? 'SELECTED' : 'SELECT FILE'}
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
            <div>
              <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </div>
          </Paper>
        </section>
      </React.Fragment>
    );
  }
}

export default Form;
