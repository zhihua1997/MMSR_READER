import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
//import Popout from 'react-popout'

class GeneralStarExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
    );
  }
}

export default GeneralStarExample;

/*class HostingComponent extends Component {
    constructor(props) {
      super(props);
      this.popout = this.popout.bind(this);
      this.popoutClosed = this.popoutClosed.bind(this);
      this.state = { isPoppedOut: false };
    }
   
    popout() {
      this.setState({isPoppedOut: true});
    }
   
    popoutClosed() {
      this.setState({isPoppedOut: false});
    }
   
    render() {
      if (this.state.isPoppedOut) {
        return (
          <Popout url='popout.html' title='Window title' onClosing={this.popoutClosed}>
            <div>Popped out content!</div>
          </Popout>
        );
      } else {
        var popout = <span onClick={this.popout} className="buttonGlyphicon glyphicon glyphicon-export"></span>
        return (
          <div>
            <strong>Section {popout}</strong>
            <div>Inline content</div>
          </div>
        );
      }
    }
  }

  export default HostingComponent;*/