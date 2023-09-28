import type { Language } from '../types';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	// get list of languages from API
	const response = await fetch('/api/getlanguages');
	const languages: Language[] = await response.json();

	return {
		languages: languages
	};
}
