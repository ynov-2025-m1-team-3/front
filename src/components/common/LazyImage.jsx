import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";

const LazyImage = ({
  src,
  alt,
  sx = {},
  fallbackSrc = null,
  skeleton = true,
  threshold = 0.1,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc) {
      setIsLoaded(true);
    }
  };

  const imageStyles = {
    ...sx,
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  const skeletonStyles = {
    ...sx,
    backgroundColor: "#f0f0f0",
    backgroundImage: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    "@keyframes shimmer": {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
  };

  return (
    <Box ref={imgRef} sx={{ position: "relative", ...sx }}>
      {skeleton && !isLoaded && (
        <Box sx={skeletonStyles} />
      )}

      {isInView && (
        <Box
          component="img"
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={imageStyles}
          loading="lazy"
          {...props}
        />
      )}
    </Box>
  );
};

export default LazyImage;
