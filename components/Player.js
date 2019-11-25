import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import formatTime from '../lib/formatTime';
import VolumeBars from './VolumeBars';
import Progressbar from './Progressbar';
import ls from '../lib/localstorage-object'
import upgradeLocalStorage from '../lib/upgrade-localstorage'

export default class Player extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    onPlayPause: PropTypes.func,
    enableLocalStorage: PropTypes.bool,
  };

  static defaultProps = {
    enableLocalStorage: true,
  }

  constructor(props) {
    super(props);

    const initialState = {
      playing: false,
      duration: 0,
      currentTime: 0,
      currentVolume: 1,
      playbackRate: 1,
      timeWasLoaded: false,
    }

    // for Server Side Rendering
    if (typeof window !== 'undefined' && this.props.enableLocalStorage) {

      upgradeLocalStorage()

      const { show } = this.props;
      const currentTimeLabel = `currentTime${show.number}`
      
      if (ls.currentVolume) initialState.currentVolume = ls.currentVolume
      if (ls.playbackRate) initialState.playbackRate = ls.playbackRate
      if (ls[currentTimeLabel]) initialState.currentTime = ls[currentTimeLabel]

    }

    initialState.timeWasLoaded = initialState.lastPlayed !== 0,
    this.state = initialState
  } // END Constructor

  componentWillUpdate(nextProps, nextState) { //eslint-disable-line
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.enableLocalStorage) return

    const { show } = this.props;
    const currentTimeLabel = `currentTime${show.number}`
    if (show.number !== prevProps.show.number) { //show changed
      const currentTime = ls[currentTimeLabel]
      this.audio.currentTime = currentTime
      this.setState({currentTime})
      this.audio.play();
    }
    else {
      ls[currentTimeLabel] = this.state.currentTime
      ls.currentVolume = this.state.currentVolume
      ls.playbackRate = this.state.playbackRate
    }
  }

  timeUpdate = e => {
    // console.log('Updating Time');
    const { show, enableLocalStorage } = this.props;
    const currentTimeLabel = `currentTime${show.number}`;

    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      if (enableLocalStorage) {
        e.currentTarget.currentTime = ls[currentTimeLabel];
      }
      this.setState({ timeWasLoaded: false });
    } else {
      const { currentTime = 0, duration = 0 } = e.currentTarget;
      this.setState({ currentTime, duration });
    }
  };

  volumeUpdate = e => {
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent volume
    if (timeWasLoaded) {
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      if (lastVolume) {
        e.currentTarget.volume = JSON.parse(lastVolume).lastVolumePref;
      }
      this.setState({ timeWasLoaded: false });
    }
  };

  groupUpdates = e => {
    this.timeUpdate(e);
    this.volumeUpdate(e);
  };

  togglePlay = () => {
    const { playing } = this.state;
    const method = playing ? 'pause' : 'play';
    this.audio[method]();
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
    this.props.onPlayPause(this.audio);
  };

  setVolume = volume => {
    this.audio.volume = volume;
    this.setState({
      currentVolume: this.audio.volume
    })
  } 

  speedUp = () => {
    this.speed(0.25);
  };

  speedDown = e => {
    e.preventDefault();
    this.speed(-0.25);
  };

  speed = change => {
    const playbackRateMax = 2.5;
    const playbackRateMin = 0.75;

    let playbackRate = this.state.playbackRate + change; //eslint-disable-line

    if (playbackRate > playbackRateMax) {
      playbackRate = playbackRateMin;
    }

    if (playbackRate < playbackRateMin) {
      playbackRate = playbackRateMax;
    }

    this.setState({ playbackRate });
  };

  render() {
    const { show } = this.props;
    const {
      playing,
      playbackRate,
      currentTime,
      duration,
      currentVolume,
    } = this.state;

    return (
      <div className="player">
        <div className="player__section player__section--left">
          <button
            onClick={this.togglePlay}
            aria-label={playing ? 'pause' : 'play'}
            type="button"
          >
            <p className="player__icon">{playing ? <FaPause /> : <FaPlay />}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </button>
        </div>

        <div className="player__section player__section--middle">
          <Progressbar
            currentTime={currentTime}
            duration={duration}
            setCurrentTime={newTime => (this.audio.currentTime = newTime)}
          />
          <h3 className="player__title">
            Playing: {show.displayNumber}: {show.title}
          </h3>
        </div>

        <div className="player__section player__section--right">
          <button
            onClick={this.speedUp}
            onContextMenu={this.speedDown}
            className="player__speed"
            type="button"
          >
            <p>FASTNESS</p>
            <span className="player__speeddisplay">{playbackRate} &times;</span>
          </button>
          <div className="player__volume">
            <p>LOUDNESS</p>
            <div className="player__inputs">

              <VolumeBars currentVolume={currentVolume} setVolume={this.setVolume} />

            </div>
          </div>
        </div>
        {/* eslint-disable */}
        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onVolumeChange={this.volumeUpdate}
          onLoadedMetadata={this.groupUpdates}
          src={show.url}
        />
        {/* eslint-enable */}
      </div>
    );
  }
}
