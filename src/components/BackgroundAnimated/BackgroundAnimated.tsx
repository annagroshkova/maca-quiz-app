import "./BackgroundAnimated.css";

const BackgroundAnimated = () => {
  return (
    <div className="background-container" aria-hidden="true">
      <div className="background-rotate">
      <div className="background-circle circle-1"></div>
      <div className="background-circle circle-2"></div>
      <div className="background-circle circle-3"></div>
      <div className="background-circle circle-4 shape-2"></div>
      <div className="background-circle circle-5 shape-3"></div>
      <div className="background-circle circle-6"></div>
      </div>
      <div className="background-rotate-reverse">
      <div className="background-circle circle-7 shape-3"></div>
      <div className="background-circle circle-8"></div>
      <div className="background-circle circle-9 shape-2"></div>
      <div className="background-circle circle-10"></div>
      <div className="background-circle circle-11"></div>
      <div className="background-circle circle-12 shape-3"></div>
      </div>
      <div className="blur-overlay"></div> {/* drar förmycket prestanda och batteri tyvärr lol*/}
    </div>
  );
};

export default BackgroundAnimated;
