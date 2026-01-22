import "./BackgroundAnimated.css";

const BackgroundAnimated = () => {
  return (
    <div className="background-container">
      <div className="background-rotate">
      <div className="background-circle circle-1"></div>
      <div className="background-circle circle-2"></div>
      <div className="background-circle circle-3"></div>
      <div className="background-circle circle-4"></div>
      <div className="background-circle circle-5"></div>
      <div className="background-circle circle-6"></div>
      </div>
      <div className="blur-overlay"></div>
    </div>
  );
};

export default BackgroundAnimated;
