import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { findMatchingDishes } from '../src/utils/foodMatcher'

const mockDishes = [
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

describe('findMatchingDishes', () => {
  it('returns perfect match when all categories align', () => {
    const answers = {
      moisture: ['Dry'],
      protein: ['Light Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }

    const result = findMatchingDishes(answers, mockDishes)

    assert.deepStrictEqual(result.perfectMatches.map(d => d.name), ['Dish A'])
    assert.deepStrictEqual(result.closeMatches.map(d => d.name), ['Dish B'])
  })

  it('returns close match when exactly one category differs', () => {
    const answers = {
      moisture: ['Wet'], // differ from Dish B only here
      protein: ['Heavy Protein'],
      carb: ['Rice'],
      fried: ['Not Fried'],
      spiciness: ['Mild'],
      appetite: ['Light Snack']
    }

    const result = findMatchingDishes(answers, mockDishes)

    assert.deepStrictEqual(result.perfectMatches.map(d => d.name), [])
    assert.deepStrictEqual(result.closeMatches.map(d => d.name), ['Dish B'])
  })

  it('returns no matches when none align', () => {
    const answers = {
      moisture: ['Soupy'],
      protein: ['Medium Protein'],
      carb: ['Bread'],
      fried: ['Grilled'],
      spiciness: ['Very Spicy'],
      appetite: ['Dessert']
    }

    const result = findMatchingDishes(answers, mockDishes)

    assert.deepStrictEqual(result.perfectMatches, [])
    assert.deepStrictEqual(result.closeMatches, [])
  })
})
