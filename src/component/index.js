import React, {Component} from 'react'
// import {
//   Switch,
//   Router,
//   Link
// } from "react-router-dom";
// import Routes from './routes.js';

const Index = () => {
    return(
      <>
      <header>
        <img id="logo" src={require("../img/logo.png")} width="200px" />
        {/* <Router>
          <Routes/>
        </Router> */}
      </header>

      <section>
        <h1>Featured Posts</h1>
        <div id="article-list">
          <div>
            <a href=""><h3>Lorem Post 1</h3></a>
            <p>
              Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
            </p>
          </div>
          <div>
            <a href=""><h3>Lorem Post 2</h3></a>
            <p>
              Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
            </p>
          </div>
          <div>
            <a href=""><h3>Lorem Post 3</h3></a>
            <p>
              Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
            </p>
          </div>
          <div>
            <a href=""><h3>Lorem Post 4</h3></a>
            <p>
              Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
            </p>
          </div>
          <div>
            <a href=""><h3>Lorem Post 5</h3></a>
            <p>
              Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
            </p>
          </div>
          <div>
              <a href=""><h3>Lorem Post 5</h3></a>
              <p>
                Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
              </p>
            </div>
            <div>
              <a href=""><h3>Lorem Post 5</h3></a>
              <p>
                Lorem Ipsum Dolor Sit Amet, mea te verear signiferumque, per illum labores ne. Blandit omnesque scripserit pri ex, et pri dicant eirmod deserunt. Aeque perpetua ea nec. Sit erant patrioque delicatissimi ut. Et sea quem sint, nam in minim voluptatibus. Etiam placerat eam in.
              </p>
            </div>
        </div>
      </section>

      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
    )
}

export default Index