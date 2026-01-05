export default function StartPage() {
  return (
    <section className="startpage">
      <h1 className="startpage__headning">Quizzie</h1>
      <form className="startpage__form">
        <label htmlFor='name'>Skriv ditt namn</label>
        <input id='name' type='text'></input>
        <button type='submit'>Låt oss spela!</button>
      </form>
    </section>
  );
}
