import { withRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ShowList from '../components/ShowList';
import ShowNotes from '../components/ShowNotes';
import Player from '../components/Player';
import Meta from '../components/meta';
import Page from '../components/Page';
import getBaseURL from '../lib/getBaseURL';
import getHashParams from '../lib/getHashParams';

function hashToStateMapper(hashParams, applyTo = {}) {
  if(hashParams.playingShow) applyTo.currentPlaying = hashParams.playingShow
  if(hashParams.startTime) applyTo.startTime = hashParams.startTime
  if(hashParams.autoPlay) applyTo.isPlaying = hashParams.autoPlay === true
  return applyTo
}

export default withRouter(
  class IndexPage extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired,
      shows: PropTypes.array.isRequired,
      baseURL: PropTypes.string.isRequired,
    };

    constructor(props) {
      super();

      const hashParams = typeof window === undefined ? {} : getHashParams()
      const currentShow = props.router.query.number || props.shows[0].displayNumber;
      const currentPlaying = hashParams.playingShow || currentShow;
      const startTime = hashParams.startTime || null;
      const isPlaying = hashParams.autoPlay !== undefined;
      this.state = {
        currentShow,
        currentPlaying,
        isPlaying,
        startTime,
      };

      this.onHashChange = this.onHashChange.bind(this) 

    }

    onHashChange() {
      const hashParams = getHashParams()
      const mapped = hashToStateMapper(hashParams)
      console.log(hashParams, mapped)
      this.setState(mapped)
    }

    componentDidMount() {
      if (typeof window !== undefined) {
        window.addEventListener('hashchange',this.onHashChange)
      }
    }
    componentWillUnmount() {
      if (typeof window !== undefined) {
        window.removeEventListener('hashchange',this.onHashChange)
      }
    }
    
    static async getInitialProps({ req }) {
      const baseURL = getBaseURL(req);
      const { data: shows } = await axios.get(`${baseURL}/api/shows`);
      return { shows, baseURL };
    }

    componentWillReceiveProps(nextProps) {
      const { query } = nextProps.router;
      if (query.number) {
        this.setState({ currentShow: query.number });
      }
    }

    setCurrentPlaying = (currentPlaying, startTime = null) => {
      console.log('Setting current playing');
      this.setState({ currentPlaying, startTime });
    };

    setIsPlaying = (isPlaying) => {
      this.setState({isPlaying})
    }

    render() {
      const { shows = [], baseURL } = this.props;
      const { currentShow, currentPlaying, isPlaying, startTime } = this.state;
      // Currently Shown shownotes
      const show =
        shows.find(showItem => showItem.displayNumber === currentShow) ||
        shows[0];
      // Currently Playing
      const current =
        shows.find(showItem => showItem.displayNumber === currentPlaying) ||
        shows[0];

      return (
        <Page>
          <Meta show={show} baseURL={baseURL} />
          <div className="wrapper">
            <main className="show-wrap" id="main" tabIndex="-1">
              <Player show={current} onPlayPause={a => this.setIsPlaying(!a.paused)} startTime={startTime}/>
              <ShowList
                shows={shows}
                currentShow={currentShow}
                currentPlaying={currentPlaying}
                setCurrentPlaying={this.setCurrentPlaying}
                isPlaying={isPlaying}
              />
              <ShowNotes
                show={show}
                setCurrentPlaying={this.setCurrentPlaying}
              />
            </main>
          </div>
        </Page>
      );
    }
  }
);
