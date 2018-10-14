const subscribeHosts = [
  {
      classModifier: "itunes",
      url: "https://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2",
      name: "iTunes"
  }, {
      classModifier: "overcast",
      url: "https://overcast.fm/itunes1253186678/syntax-tasty-web-development-treats",
      name: "Overcast"
  }, {
      classModifier: "google",
      url: "https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkLnN5bnRheC5mbS9yc3M%3D",
      name: "Google Podcast"
  }, {
      classModifier: "stitcher",
      url: "http://www.stitcher.com/s?fid=142440&refid=stpr",
      name: "Stitcher"
  }, {
      classModifier: "pocketcasts",
      url: "http://pca.st/fmx9",
      name: "PocketCasts"
  }, {
      classModifier: "googleplay",
      url: "https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&link=https://play.google.com/music/m/Ityd325x5s5ivr3fc74hvvgeztu?t%3DSyntax_-_Tasty_Web_Development_Treats%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16",
      name: "Google Play"
  }, {
      classModifier: "spotify",
      url: "https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby?si=bOe7-kl6RnOHapMsVnFWgw",
      name: "Spotify"
  }, {
      classModifier: "rss",
      url: "http://feed.syntax.fm/rss",
      name: "RSS"
  }
]


const SubscribeListItem = ({name,url,classModifier}) => (<li className={"subscribe__link subscribe__link--" + classModifier}>
      <a target="_blank" href={url}>{name}</a>
    </li>)

const Subscribe = props => (
  <div className="subscribe">
    <ul className="subscribe__links">
        {subscribeHosts.map(h => <SubscribeListItem {...h} />)}
    </ul>  
  </div>
);

export default Subscribe;
