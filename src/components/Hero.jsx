'use client';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        // poster="/images/poster.png" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
          filter: 'brightness(0.7)', // darken for text contrast
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ textAlign: 'center', zIndex: '1' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to Our Store</h1>
        <p style={{ fontSize: '1.2rem' }}>Discover amazing products at great prices</p>
      </div>
    </section>
  );
}
