import React, { useRef } from 'react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-[80vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://packaged-media.redd.it/eocwyp64008f1/pb/m2-res_640p.mp4?m=DASHPlaylist.mpd&v=1&e=1750406400&s=786f2e47ec0a6a250d567c672b5f266cf682a784"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default VideoSection;
