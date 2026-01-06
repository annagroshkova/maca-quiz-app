import { type UserInfo, saveUserInfo } from "./../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleNameSubmit = (e: Event) => {
    e.preventDefault();
    saveUserInfo({ name });
    setName("")
  };


  return (
    <section className='startpage'>
      <h1 className='startpage__headning'>Quizzie</h1>
      <form className='startpage__form'>
        <label htmlFor='name'>Skriv ditt namn</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button 
        type='submit'
        onClick={() => {handleNameSubmit; navigate("/quiz")}}
        >Låt oss spela!</button>
      </form>
    </section>
  );
}
