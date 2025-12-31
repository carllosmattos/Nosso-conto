import { motion } from 'framer-motion';
import './Verse.css';

const Verse = ({ text }) => {
  return (
    <motion.div 
      className="verse-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div 
        className="verse-content"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="verse-quote-left">❝</div>
        <p className="verse-text">{text}</p>
        <div className="verse-quote-right">❞</div>
      </motion.div>
    </motion.div>
  );
};

export default Verse;
