import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Pré-carrega e cacheia todas as imagens
  useEffect(() => {
    const cache = {};
    let loadedCount = 0;

    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        cache[src] = img;
        loadedCount++;
        
        if (loadedCount === images.length) {
          setImageCache(cache);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImageCache(cache);
          setIsLoading(false);
        }
      };
      img.src = src;
    });
  }, [images]);

  // Auto-play - só inicia quando as imagens estiverem carregadas
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, isLoading]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers para swipe no mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  // Não renderiza o slider até que todas as imagens estejam carregadas
  if (isLoading || Object.keys(imageCache).length === 0) {
    return (
      <div className="slider-container">
        <div className="slider-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <p style={{ color: '#fff', fontSize: '1.2rem' }}>Carregando suas memórias... 💕</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="slider-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div 
        className="slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Renderiza todas as imagens sempre no DOM */}
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="slider-image-container"
            initial={false}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 0.95,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            style={{
              pointerEvents: index === currentIndex ? 'auto' : 'none'
            }}
          >
            <img 
              src={src} 
              alt={`Memória ${index + 1}`}
              className="slider-image"
              style={{ display: 'block' }}
            />
            <div className="slider-overlay"></div>
          </motion.div>
        ))}

        {/* Botões de navegação */}
        <button className="slider-button slider-button-prev" onClick={prevSlide} aria-label="Imagem anterior">
          ❮
        </button>
        <button className="slider-button slider-button-next" onClick={nextSlide} aria-label="Próxima imagem">
          ❯
        </button>

        {/* Indicadores */}
        <div className="slider-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageSlider;
