import video from '../../assets/backgroundVideo.mp4';

const Video = () => {
  return (
    <div>
      <video
        style={{ width: '100%', objectFit: 'cover', overflow: 'hidden' }}
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
