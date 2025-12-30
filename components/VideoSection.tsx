import React, { useRef } from 'react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-[80vh] md:h-[70vh] lg:h-[75vh] overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        onError={(e) => {
          console.error('Video failed to load, using fallback styling');
          e.currentTarget.style.display = 'none';
        }}
      >
        <source
          src="https://images.pexels.com/videos/3120935/free-video-3120935.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to ensure text readability if any is added later */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
    </section>
  );
};

export default VideoSection;
