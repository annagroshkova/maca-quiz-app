import {
  type UserSettings,
  getUserSettings,
  updateUserSettings,
} from "../../userSettings";
import { categories } from "../../categoriesData";
import Category from "../../components/Category/Category";

export default function QuizSettings() {
  const user: UserSettings = getUserSettings();
  const greeting: string = `Greetings, ${user.name}! Choose your options`;

  return (
    <section className='quiz-settings'>
      <p className='quiz-settings__greeting'>{greeting}</p>
      <form className='quiz-settings__form'>
        <fieldset className='quiz-settings__categories'>
          <legend>Select a subject</legend>
          {categories.map((c) => (
            <Category
              key={c.apiQuery}
              text={c.quizSubject}
              apiQuery={c.apiQuery}
              imageUrl={`${c.apiQuery}.png`}
            />
          ))}
        </fieldset>
      </form>
    </section>
  );
}
