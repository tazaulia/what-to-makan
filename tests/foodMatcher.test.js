import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { findMatchingDishes } from '../src/utils/foodMatcher'

// Mock dishes in the current shape: 5 craving categories + fried/protein (multi-value)
// in tags, and an optional top-level `pork` boolean.
const mockDishes = [
  {
    name: 'Chicken Rice',
    tags: {
      cuisine: ['Chinese'], moisture: ['Dry'], carb: ['Rice'],
      spiciness: ['Mild'], appetite: ['Light Meal'],
      fried: ['Not Fried'], protein: ['Medium Protein'],
    },
  },
  {
    name: 'Fried Chicken',
    tags: {
      cuisine: ['Western'], moisture: ['Dry'], carb: ['Rice'],
      spiciness: ['Medium'], appetite: ['Heavy Meal'],
      fried: ['Fried'], protein: ['Protein-Dense'],
    },
  },
  {
    name: 'Bak Kut Teh',
    pork: true,
    tags: {
      cuisine: ['Chinese'], moisture: ['Soupy'], carb: ['Rice'],
      spiciness: ['Mild'], appetite: ['Heavy Meal'],
      fried: ['Not Fried'], protein: ['Protein-Dense'],
    },
  },
  {
    name: 'Hor Fun', // can be had fried OR not-fried (either-way)
    tags: {
      cuisine: ['Chinese'], moisture: ['Saucy'], carb: ['Noodle'],
      spiciness: ['Mild'], appetite: ['Heavy Meal'],
      fried: ['Not Fried', 'Fried'], protein: ['Medium Protein'],
    },
  },
]

const allNames = (result) =>
  [...result.perfectMatches, ...result.closeMatches].map((d) => d.name)

describe('findMatchingDishes', () => {
  it('marks a dish that matches every answered craving as a perfect match', () => {
    const answers = {
      cuisine: ['Chinese'], moisture: ['Dry'], carb: ['Rice'],
      spiciness: ['Mild'], appetite: ['Light Meal'],
    }

    const result = findMatchingDishes(answers, mockDishes)

    assert.deepStrictEqual(result.perfectMatches.map((d) => d.name), ['Chicken Rice'])
  })

  it('never dead-ends: fills close matches when nothing matches perfectly', () => {
    const answers = { cuisine: ['Korean'] } // no mock dish is Korean

    const result = findMatchingDishes(answers, mockDishes)

    assert.equal(result.perfectMatches.length, 0)
    assert.ok(result.closeMatches.length > 0)
  })

  it('"No Pork" hard-filters pork dishes out', () => {
    const result = findMatchingDishes({ constraints: ['No Pork'] }, mockDishes)
    const names = allNames(result)

    assert.ok(!names.includes('Bak Kut Teh'))
    assert.ok(names.includes('Chicken Rice'))
  })

  it('"No Fried" excludes always-fried dishes but keeps either-way ones', () => {
    const result = findMatchingDishes({ constraints: ['No Fried'] }, mockDishes)
    const names = allNames(result)

    assert.ok(!names.includes('Fried Chicken')) // fried-only → excluded
    assert.ok(names.includes('Hor Fun')) // can be not-fried → kept
  })

  it('"High Protein" keeps only protein-dense-capable dishes', () => {
    const result = findMatchingDishes({ constraints: ['High Protein'] }, mockDishes)
    const names = allNames(result)

    assert.ok(names.includes('Fried Chicken'))
    assert.ok(names.includes('Bak Kut Teh'))
    assert.ok(!names.includes('Chicken Rice')) // medium protein → excluded
    assert.ok(!names.includes('Hor Fun'))
  })
})
