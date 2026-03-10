
import { Dish } from '../types/food';

export const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkL_ckVhScJ-qTo39tKf_1OlujLlE2ycGFRDhPCBUS6c83_VnWTy8CVxVN6O-SoYWcnLt7OfuaT0us/pub?gid=684506908&single=true&output=csv';

export async function fetchDishesFromSheets(url: string): Promise<Dish[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch dishes');
        const csvData = await response.text();
        return parseCSVDishes(csvData);
    } catch (error) {
        console.error('Error fetching dishes from Google Sheets:', error);
        return [];
    }
}

function parseCSVDishes(csv: string): Dish[] {
    const lines = csv.split('\n');

    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
        const cleanValues = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));

        return {
            name: cleanValues[0],
            tags: {
                moisture: cleanValues[1]?.split('|') || [],
                protein: cleanValues[2]?.split('|') || [],
                carb: cleanValues[3]?.split('|') || [],
                fried: cleanValues[4]?.split('|') || [],
                spiciness: cleanValues[5]?.split('|') || [],
                appetite: cleanValues[6]?.split('|') || [],
            }
        } as Dish;
    });
}
