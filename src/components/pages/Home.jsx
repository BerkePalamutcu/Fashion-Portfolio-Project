import Navbar from '../Navbar/Navbar';
import Slider from '../Slider/Slider';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import CarouselMobile from '../CarouselMobile/CarouselMobile';
const Home = () => {
  return (
    <>
      <Navbar />
      <Card />
      <Carousel />
      <CarouselMobile />
      <Slider />
    </>
  );
};

export default Home;
