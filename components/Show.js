import React from 'react';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import Router from 'next/router';
import { FaPlay } from 'react-icons/fa';
import Bars from './bars';

<<<<<<< HEAD
export default class Show extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    currentPlaying: PropTypes.string.isRequired,
    currentShow: PropTypes.string.isRequired,
    setCurrentPlaying: PropTypes.func.isRequired,
  };

  changeURL = (e, show) => {
    e.preventDefault();
    const { href } = e.currentTarget;
    Router.push(`/?number=${show.displayNumber}`, href, { shallow: true });
  };

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying } = this.props;
    return (
      <div
        className={`show ${
          currentPlaying === show.displayNumber ? 'show--playing' : ''
        } ${currentShow === show.displayNumber ? 'show--active' : ''}
      `}
      >
        <a
          className="show__link"
          href={`/show/${show.displayNumber}/${slug(show.title)}`}
          onClick={e => this.changeURL(e, show)}
        >
          <p className="show__displayNumber">Episode {show.displayNumber}</p>
          <h3 className="show__title">{show.title}</h3>
        </a>

        <div className="show__playcontrols">
          {currentPlaying === show.displayNumber ? (
            <Bars />
          ) : (
            <button
              type="button"
              onClick={() => setCurrentPlaying(show.displayNumber)}
              className="show__play"
              title="play button"
            >
              <FaPlay />
            </button>
          )}
        </div>
      </div>
    );
  }
}
=======
const Show = ({ show, currentPlaying, currentShow, setCurrentPlaying }) => {
    
  const [isPlaying, isDisplayed] = [currentPlaying, currentShow].map(currentX => show.displayNumber === currentX)
  const showClassName = ['show', isPlaying ? 'show--playing' : '', isDisplayed ? 'show--active' : ''].join(' ')

  const changeURL = (e, show) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    Router.push(`/?number=${show.displayNumber}`, href, { shallow: true })
  }
  const PlayButton = () => <button onClick={() => setCurrentPlaying(show.displayNumber)} className="show__play" title="play button" ><FaPlay/></button>

  return (
    <div className={showClassName}>
      <a className="show__link" href={`/show/${show.displayNumber}/${slug(show.title)}`} onClick={(e) => changeURL(e, show)}>
        <p className="show__displayNumber">Episode {show.displayNumber}</p>
        <h3 className="show__title">{show.title}</h3>
      </a>

      <div className="show__playcontrols">
        {isPlaying ? <Bars/ > :  <PlayButton />}
      </div>
    </div>
  )
};

export default Show;
>>>>>>> 965a4f58707367431b1858cc16d6bab8545d5a52
