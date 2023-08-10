import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <img src="https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-13436.jpg?w=2000"/>
      </div>
    </div>
  );
}

export default AboutPage;
