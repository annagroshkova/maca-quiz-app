export interface Category {
  quizSubject: string;
  apiQuery: string;
}

export const categories: Category[] = [
  {
    quizSubject: "Music",
    apiQuery: "music",
  },
  {
    quizSubject: "Sport & leisure",
    apiQuery: "sport_and_leisure",
  },
  {
    quizSubject: "Film & tv",
    apiQuery: "film_and_tv",
  },
  {
    quizSubject: "Arts & literature",
    apiQuery: "arts_and_literature",
  },
  {
    quizSubject: "History",
    apiQuery: "history",
  },
  {
    quizSubject: "Society & culture",
    apiQuery: "society_and_culture",
  },
  {
    quizSubject: "Science",
    apiQuery: "science",
  },
  {
    quizSubject: "Geography",
    apiQuery: "geography",
  },
  {
    quizSubject: "Food & drink",
    apiQuery: "food_and_drink",
  },
  {
    quizSubject: "General knowledge",
    apiQuery: "general_knowledge",
  },
];
