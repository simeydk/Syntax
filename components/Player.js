import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import formatTime from '../lib/formatTime';
import VolumeBars from './VolumeBars';
import Progressbar from './Progressbar';

export default class Player extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    onPlayPause: PropTypes.func,
  };

  constructor(props) {
    super(props);

    let lastPlayed = 0;
    let lastVolumePref = 1;
    let lastPlaybackRate = 1;

    // for Server Side Rendering
    if (typeof window !== 'undefined') {
      const { show } = this.props;
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      const lastPlayback = localStorage.getItem(`lastPlaybackSetting`);

      if (lp) lastPlayed = JSON.parse(lp).lastPlayed; //eslint-disable-line
      if (lastVolume) lastVolumePref = JSON.parse(lastVolume).lastVolumePref; //eslint-disable-line
      if (lastPlayback)
        lastPlaybackRate = JSON.parse(lastPlayback).lastPlaybackRate; //eslint-disable-line
    }

    this.state = {
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      currentVolume: lastVolumePref,
      playbackRate: lastPlaybackRate,
      timeWasLoaded: lastPlayed !== 0,
    };
  } // END Constructor

  componentWillUpdate(nextProps, nextState) { //eslint-disable-line
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) { //eslint-disable-line
    const { show } = this.props;
    const { currentTime, currentVolume, playbackRate } = this.state;
    if (show.number !== prevProps.show.number) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      if (lp) {
        const lastVolume = localStorage.getItem(`lastVolumeSetting`);
        const lastPlayback = localStorage.getItem(`lastPlaybackSetting`);
        const data = JSON.parse(lp);
        const data2 = JSON.parse(lastVolume);
        const data3 = JSON.parse(lastPlayback);
        // eslint-disable-next-line
        this.setState({
          currentTime: data.lastPlayed,
          currentVolume: data2.lastVolumePref,
          playbackRate: data3.lastPlaybackRate,
        });
        this.audio.currentTime = data.lastPlayed;
        this.audio.volume = data2.lastVolumePref;
        this.audio.playbackRate = data3.lastPlaybackRate;
      }
      this.audio.play();
    } else {
      localStorage.setItem(
        `lastPlayed${show.number}`,
        JSON.stringify({ lastPlayed: currentTime })
      );
      localStorage.setItem(
        `lastVolumeSetting`,
        JSON.stringify({ lastVolumePref: currentVolume })
      );
      localStorage.setItem(
        `lastPlaybackSetting`,
        JSON.stringify({ lastPlaybackRate: playbackRate })
      );
    }
  }

  timeUpdate = e => {
    // console.log('Updating Time');
    const { show } = this.props;
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`);

      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed;
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
    this.props.onPlayPause(this.audio)
  };

  setVolume = volume => {
    this.audio.volume = volume
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
