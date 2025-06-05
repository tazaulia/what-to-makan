import { describe, it, expect, vi } from 'vitest'
import type { UserAnswers, Dish } from '../src/types/food'

const mockDishes: Dish[] = [
  {
    name: 'Dish A',
    tags: {
      moisture: ['Dry'],
      protein: ['Light Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }
  },
  {
    name: 'Dish B',
    tags: {
      moisture: ['Dry'],
      protein: ['Heavy Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }
  },
  {
    name: 'Dish C',
    tags: {
      moisture: ['Wet'],
      protein: ['Heavy Protein'],
      carb: ['Noodle'],
      fried: ['Fried'],
      spiciness: ['Spicy'],
      appetite: ['Heavy Meal']
    }
  }
]

vi.mock('../src/data/dishes', () => ({ dishes: mockDishes }))

import { findMatchingDishes } from '../src/utils/foodMatcher'

describe('findMatchingDishes', () => {
  it('returns perfect match when all categories align', () => {
    const answers: UserAnswers = {
      moisture: ['Dry'],
      protein: ['Light Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }

    const result = findMatchingDishes(answers)

    expect(result.perfectMatches.map(d => d.name)).toEqual(['Dish A'])
    expect(result.closeMatches.map(d => d.name)).toEqual(['Dish B'])
  })

  it('returns close match when exactly one category differs', () => {
    const answers: UserAnswers = {
      moisture: ['Wet'], // differ from Dish B only here
      protein: ['Heavy Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }

    const result = findMatchingDishes(answers)

    expect(result.perfectMatches.map(d => d.name)).toEqual([])
    expect(result.closeMatches.map(d => d.name)).toEqual(['Dish B'])
  })

  it('returns no matches when none align', () => {
    const answers: UserAnswers = {
      moisture: ['Soupy'],
      protein: ['Medium Protein'],
      carb: ['Bread'],
      fried: ['Grilled'],
      spiciness: ['Very Spicy'],
      appetite: ['Dessert']
    }

    const result = findMatchingDishes(answers)

    expect(result.perfectMatches).toEqual([])
    expect(result.closeMatches).toEqual([])
  })
})
