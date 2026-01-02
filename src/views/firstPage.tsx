function FirstPageComponent() {
  return (
    <div className="pageContainer">
      <div className="headLineContainer">
        <h1>QUIZ</h1>
      </div>
      <div className="inputContainer">
        <label htmlFor="inputName">Write your name</label>
        <input
          type="text"
          id="inputName"
          className="inputName"
          placeholder="Name"
        />
      </div>
      <div className="startContainer">
        <button className="startButton">Start!</button>
      </div>
    </div>
  );
}
