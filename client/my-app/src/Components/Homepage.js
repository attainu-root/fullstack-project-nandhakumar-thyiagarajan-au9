import React from "react";
import Header from "./ReUsable components/Header";
import Postform from "./ReUsable components/Postform";
import PostSection from "./ReUsable components/PostSection";
import "../Components/styles/Homepage.css";
const Homepage = (props) => {
  return (
    <>
      <Header props={props} />
      <section className="homepage">
        <Postform />
        <PostSection />
      </section>
    </>
  );
};

export default Homepage;
