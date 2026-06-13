
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

const truthy = (v: string | undefined) => /^(yes|true|1)$/i.test((v || '').trim());
const multi = (v: string | undefined) => (v?.split('|').map(s => s.trim()).filter(Boolean)) || [];

// Sheet columns are in quiz order (see the "Legend" tab) — do not reorder without updating this:
// 0 name | 1 cuisine | 2 moisture | 3 carb | 4 spiciness | 5 appetite | 6 fried | 7 protein | 8 pork
function parseCSVDishes(csv: string): Dish[] {
    const lines = csv.split('\n');

    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
        const c = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));

        return {
            name: c[0],
            pork: truthy(c[8]),
            tags: {
                cuisine: multi(c[1]),
                moisture: multi(c[2]),
                carb: multi(c[3]),
                spiciness: multi(c[4]),
                appetite: multi(c[5]),
                fried: multi(c[6]),
                protein: multi(c[7]),
            }
        } as Dish;
    });
}
