import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { motion } from "motion/react";
import useQuizNavigation from "../../hooks/useQuizNavigation";

export default function StartPage() {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  const [name, setName] = useState("");
  const { goToRules } = useQuizNavigation();

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
      <div className="startpage__heading">
        <img
          className="startpage__gamelogo"
          alt="MindPop logo"
          src="/mindpoplogo.png"
        />
      </div>
      <div className="startpage__form-container">
        <motion.form
          className="startpage__form shared-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleNameSubmit}
        >
          <label htmlFor="name">Enter your name to start</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name..."
          ></input>
          {/* knapp disabled om det inte finns ett namn */}
          <SubmitButton type="button" onClick={goToRules}>
            Rules
          </SubmitButton>
          <SubmitButton
            onClick={() => handleNameSubmit}
            disabled={!name.trim()}
          >
            <span>Let's begin!</span>
          </SubmitButton>
          {/* <button type='submit' disabled={!name.trim()}>
            <span>Let's begin!</span>
          </button> */}
        </motion.form>
      </div>
    </section>
  );
}
