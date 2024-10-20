const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const hoverScale = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  }

  export {fadeInUp, stagger, hoverScale}