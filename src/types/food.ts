
export interface Dish {
  name: string;
  /** Contains pork → hidden by the "No pork" food rule. */
  pork?: boolean;
  tags: {
    // Craving categories (scored softly)
    cuisine: string[];
    moisture: string[];
    carb: string[];
    spiciness: string[];
    appetite: string[];
    // Food-rule categories (multi-value so "either way" dishes are preserved):
    // fried can be ["Not Fried", "Fried"]; protein can span ["Medium Protein", "Protein-Dense"].
    fried: string[];
    protein: string[];
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
