import React from "react";
import "../styles/PostSection.css";
import { connect } from "react-redux";
import fetchposts from "../../Actions/fetch";
import Cards from "../ReUsable components/Cards";

class PostSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchposts();
  };
  render() {
    return (
      <React.Fragment>
        <section className="postSection">
          <h2 className="postSection_heading">POSTS</h2>
          {this.props.post.map((post, index) => {
            return (
              <React.Fragment key={index}>
                <Cards data={post} />
              </React.Fragment>
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStatetoProps, { fetchposts })(PostSection);
