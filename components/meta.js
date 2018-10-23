import Head from 'next/head';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import stylesheet from '../styles/style.styl';
import { description } from '../package.json';

const Meta = ({ show, baseURL, title }) => (
  <div>
    <Head>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href={`${baseURL}/static/favicon.png`} />
      <style
        dangerouslySetInnerHTML={{ __html: stylesheet.replace(/\n/g, '') }}
      />
    </Head>
    {show && <Head>
      <title>
        {show.title} — Syntax Podcast {show.displayNumber}
      </title>
      <meta property="og:audio" content={show.url} />
      <meta property="og:audio:secure_url" content={show.url} />
      <meta property="og:audio:type" content="audio/mp3" />
      <meta property="og:type" content="music.song" />
      <meta
        property="og:title"
        content={`${show.title} — Syntax Podcast ${show.displayNumber}`}
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:url"
        content={`${baseURL}/show/${show.displayNumber}/${slug(show.title)}`}
      />
      <meta
        property="og:image"
        content={`${baseURL}/static/syntax-banner.png`}
      />
      
    </Head>}
  </div>
);

Meta.defaultProps = {
  show: {},
};

Meta.propTypes = {
  show: PropTypes.object,
  baseURL: PropTypes.string.isRequired,
};

export default Meta;
