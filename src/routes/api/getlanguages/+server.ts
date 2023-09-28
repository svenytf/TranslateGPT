import { languages } from "./languages";
import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    if (!languages) {
        // something broke with the languages
        console.error('languages array is undefined');
        throw error(500, 'Internal server error');
    }
    if (languages.length === 0) {
        // no languages in the languages array, so return a 500 and log the error
        console.error('languages array is empty');
        throw error(500, 'Internal server error');
    }

    // return the list of languages
    return json(languages)
}