import {
  type UserSettings,
  updateUserSettings,
  getUserSettings,
} from "../../userSettings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function StartPage() {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  const [name, setName] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return; //stoppar om det inte finns ett namn
    }
    setUserName(trimmedName);

    setName("");
    navigate("/categories");
  };

  return (
    <section className="startpage">
      <h1 className="startpage__headning">Quizzie</h1>
      <div className="startpage__form-container">
        <form className="startpage__form" onSubmit={handleNameSubmit}>
          <label htmlFor="name">Enter your name to start</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name..."
          ></input>
          {/* knapp disabled om det inte finns ett namn */}
          <button type="submit" disabled={!name.trim()}>
            <span>Let's begin!</span>
          </button>
        </form>
      </div>
    </section>
  );
}
