import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import {
  type UserSettings,
  getUserSettings,
  updateUserSettings,
} from "../../userSettings";
import { categories } from "../../data";
import RadioOption from "../../components/RadioOption/RadioOption";
import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

export default function Categories() {
  function useTwoRowHeight(deps: unknown[] = []) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el || el.children.length < 4) return;

      const updateHeight = () => {
        const childrenArray = Array.from(el.children) as HTMLElement[];

        const rowTops: number[] = [];
        childrenArray.forEach((child) => {
          const top = child.offsetTop;
          if (!rowTops.includes(top)) rowTops.push(top);
        });

        // Limit to first 2 rows
        if (rowTops.length >= 2) {
          const firstRowTop = rowTops[0];
          const thirdRowTop =
            rowTops[2] ??
            childrenArray[childrenArray.length - 1].offsetTop +
              childrenArray[childrenArray.length - 1].offsetHeight;
          const twoRowsHeight = thirdRowTop - firstRowTop;
          const scrollContainerHeight = twoRowsHeight + 40;
          el.style.maxHeight = `${scrollContainerHeight}px`;
        }
      };

      updateHeight();
      const ro = new ResizeObserver(updateHeight);
      ro.observe(el);

      return () => ro.disconnect();
    }, deps);

    return ref;
  }

  const gridRef = useTwoRowHeight([categories.length]);
  const user: UserSettings = getUserSettings();
  const greeting: string = `Greetings, ${user.name}!`;
  const navigate = useNavigate();

  const [category, setCategory] = useState<string | null>(null);

  const handleCategoriesSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category === null) {
      return;
    }
    updateUserSettings({ category });
    setCategory(null);
    navigate("/levels");
  };

  return (
    <>
      <Header backButton={false} />
      <section className='categories'>
        <p className='categories__greeting'>{greeting}</p>
        <form className='categories__form' onSubmit={handleCategoriesSubmit}>
          <fieldset className='categories__fieldset'>
            <legend>Select a subject</legend>
            <div ref={gridRef} className='categories-container'>
              {categories.map((c) => (
                <RadioOption
                  key={c.apiQuery}
                  name='category'
                  text={c.quizSubject}
                  value={c.apiQuery}
                  imageUrl={`${c.apiQuery}.png`}
                  onChange={() => setCategory(c.apiQuery)}
                  checked={category === c.apiQuery}
                />
              ))}
            </div>
          </fieldset>
          <SubmitButton disabled={category === null}>
            <span>Continue</span>
          </SubmitButton>
        </form>
      </section>
    </>
  );
}
