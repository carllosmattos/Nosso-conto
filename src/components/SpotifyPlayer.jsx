import { motion } from 'framer-motion';
import './SpotifyPlayer.css';

const SpotifyPlayer = ({ trackUrl }) => {
  // Converter URL do Spotify para embed
  const getEmbedUrl = (url) => {
    const trackId = url.split('/track/')[1]?.split('?')[0];
    if (!trackId) return null;
    return `https://open.spotify.com/embed/track/${trackId}`;
  };

  const embedUrl = getEmbedUrl(trackUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <motion.div 
      className="spotify-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <h3 className="spotify-title">🎵 Nossa Música 🎵</h3>
      <motion.div 
        className="spotify-player-wrapper"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
          className="spotify-iframe"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default SpotifyPlayer;
