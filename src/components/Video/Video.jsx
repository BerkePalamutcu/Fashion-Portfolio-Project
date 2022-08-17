import video from '../../assets/backgroundVideo.mp4';

const Video = () => {
  return (
    <div>
      <video style={{ width: '100vw', objectFit: 'cover' }} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
