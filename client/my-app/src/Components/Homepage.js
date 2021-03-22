import React from 'react';
import Header from './ReUsable components/Header';
import Postform from './ReUsable components/Postform';
import PostSection from './ReUsable components/PostSection';

const Homepage = () => {
  const props = 'Homepage';
  return (
    <>
      <Header props={props} />
      {/* //!inline styling */}
      <section style={{ display: 'flex' }}>
        <Postform />
        <PostSection />
      </section>
    </>
  );
};

export default Homepage;
