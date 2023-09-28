import 'dotenv/config';
import { error } from '@sveltejs/kit';
import { openai } from './openai';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { langFrom, langTo, input, context } = await request.json();

	// check if request is valid
	if (!langFrom || !langTo || !input) {
		throw error(400, 'Bad request');
	}

	// check if OPENAI_KEY is set
	if (!process.env.OPENAI_KEY) {
		console.error('OPENAI_KEY is missing in .env file. Check .env.example for more information.');
		throw error(500, 'Internal server error');
	}

	// create a new translator
	const translator = new openai(process.env.OPENAI_KEY, 'gpt-3.5-turbo-16k');

	const result = await translator.streamTranslate(input, langTo, langFrom, context);
	if (!result.body) {
		// if not, send 400 error
		throw error(400, 'Bad request');
	}

	const readableStream: ReadableStream<Uint8Array> = result.body;

	return new Response(readableStream);
}

/**
 * This is my first time touching streams, so I'm not sure if this is the right way to do it.
 * - Sveny
 */