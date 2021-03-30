import React from "react";
import "../styles/Cards.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { updateAction } from "../../Actions/update";
import { postDelete } from "../../Actions/delete";
import { connect } from "react-redux";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "",
      noOflikes: "",
      update: "",
    };
  }

  componentDidMount = () => {
    this.likesCheck();
    this.update();
  };

  update = () => {
    axios
      .get(`http://localhost:8900/post/update/${this.props.data._id}`, {
        withCredentials: true,
      })
      .then((response) =>
        this.setState({
          ...this.state,
          update: response.data.update,
        })
      )
      .catch((error) => console.log(error));
  };

  likesCheck = () => {
    axios
      .post(
        "http://localhost:8900/post/checklikes",
        {
          _id: this.props.data._id,
        },
        { withCredentials: true }
      )
      .then((response) =>
        this.setState({
          ...this.state,
          toggle: response.data.toggle,
          noOflikes: response.data.noOflikes,
        })
      )
      .catch((error) => console.log(error));
  };

  togglelike = () => {
    axios
      .post(
        "http://localhost:8900/post/togglelike",
        {
          _id: this.props.data._id,
          toggle: this.state.toggle,
        },
        { withCredentials: true }
      )
      .then((response) =>
        this.setState({
          ...this.state,
          toggle: response.data.toggle,
          noOflikes: response.data.noOflikes,
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <section className="card">
          <Card>
            <CardActionArea>
              <CardMedia>
                <img
                  src={this.props.data.file}
                  alt="some"
                  className="card_image"
                ></img>
              </CardMedia>
              <CardContent>
                <h3>{this.props.data.caption}</h3>
                {!this.state.update && (
                  <>
                    <h4>CONTACT:{this.props.data.email}</h4>
                  </>
                )}
              </CardContent>
            </CardActionArea>
            <CardActions>
              <h3>{this.state.noOflikes}</h3>
              <Button size="small" color="primary" onClick={this.togglelike}>
                {this.state.toggle}
              </Button>
              {this.state.update && (
                <>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.props.updateAction(this.props.data)}
                  >
                    UPDATE
                  </Button>
                </>
              )}
              {this.state.update && (
                <>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => this.props.postDelete(this.props.data)}
                  >
                    DELETE
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(null, { updateAction, postDelete })(Cards);
