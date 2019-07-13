const SubscribeItem = ({classModifier, href, contents}) => (
  <li className={`subscribe__link subscribe__link--${classModifier}`}>
        <a
          target="_blank"
          href={href}
          rel="noopener noreferrer"
        >
          {contents}
        </a>
      </li>
)

const Subscribe = props => (
  <div className="subscribe">
    <ul className="subscribe__links">
      <SubscribeItem 
        contents='iTunes' 
        classModifier="itunes" 
        href="https://itunes.apple.com/ca/podcast/syntax-tasty-web-development-treats/id1253186678?mt=2" 
      />
      <SubscribeItem 
        contents='Overcast' 
        classModifier="overcast" 
        href="https://overcast.fm/itunes1253186678/syntax-tasty-web-development-treats"
      />
      <SubscribeItem 
        contents='Google Podcast' 
        classModifier="google" 
        href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkLnN5bnRheC5mbS9yc3M%3D"
      />
      <SubscribeItem
        contents='Stitcher'
        classModifier="stitcher"
        href="http://www.stitcher.com/s?fid=142440&refid=stpr"
      />
      <SubscribeItem
        contents='PocketCasts'
        classModifier="pocketcasts"
        href="http://pca.st/fmx9"
      />
      <SubscribeItem
        contents='Google Play'
        classModifier="googleplay"
        href="https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&isi=691797987&ius=googleplaymusic&link=https://play.google.com/music/m/Ityd325x5s5ivr3fc74hvvgeztu?t%3DSyntax_-_Tasty_Web_Development_Treats%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16"
      />
      <SubscribeItem
        contents='Spotify'
        classModifier="spotify"
        href="https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby?si=bOe7-kl6RnOHapMsVnFWgw"
      />
      <SubscribeItem
        contents='RSS'
        classModifier="rss"
        href="http://feed.syntax.fm/rss"
      />
    </ul>
  </div>
);

export default Subscribe;
