
export interface Dish {
  name: string;
  /** Food-rule flags (not cravings). Used by the constraints checklist. */
  pork?: boolean;        // contains pork → hidden by "No pork"
  fried?: boolean;       // always deep-fried → hidden by "No fried"
  highProtein?: boolean; // protein-dense → "High protein" shows only these
  tags: {
    cuisine: string[];
    moisture: string[];
    carb: string[];
    spiciness: string[];
    appetite: string[];
  };
}

/** A single answer choice: `label` is shown to the user, `value` is matched against dish tags. */
export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  /** Optional sub-line under the question (e.g. "Pick any that apply"). */
  helper?: string;
  options: QuestionOption[];
  /** Craving questions map to a Dish tag category. Constraints are handled separately. */
  category: keyof Dish['tags'] | 'constraints';
  kind: 'craving' | 'constraints';
}

export interface UserAnswers {
  [questionId: string]: string[];
}
