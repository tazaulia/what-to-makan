
export interface Dish {
  name: string;
  tags: {
    moisture: string[];
    protein: string[];
    carb: string[];
    fried: string[];
    spiciness: string[];
    appetite: string[];
  };
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  category: keyof Dish['tags'];
}

export interface UserAnswers {
  [questionId: string]: string[];
}
