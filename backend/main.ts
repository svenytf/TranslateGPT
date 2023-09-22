import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';
import type { Express, Request, Response } from 'express';

// initalize express
const app: Express = express();
const port = 5000;

// initalize OpenAI API
const openai = new OpenAI({ apiKey: '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' });

// middleware
app.use(cors());
app.use(express.json());

// routes
// translation route
app.post('/translate', (req: Request, res: Response) => {
	// check if request is valid
	if (!req.body.langFrom || !req.body.langTo || !req.body.input) {
		// if not, send 400 error
		res.status(400).send('Bad request');
		return;
	}

	// get input and output languages from request
	const inputLang = req.body.langFrom;
	const outputLang = req.body.langTo;

	const input = req.body.input;

	const context = req.body.context;

	// initalise messages array for OpenAI API
	const messages: Array<ChatCompletionMessageParam> = [
		{
			role: 'system',
			content: `
            You are a translation bot. You translate from ${inputLang} to ${outputLang}. You must ONLY respond with the translated text.
            Context is used and SENT BY THE USER for helping format the translation or in case of ambiguity. For example, if the input is "I like it", the context might be "I like it, but I don't love it."
            Context is optional. You do NOT control the context. You only control the output.

            Again, you are ONLY to respond with the translated text. You are NOT to respond with the context, or anything else.

            If both input languages and output languages are identical, your task is, if possible, improve the grammar of the input text. For example, if the input is "I likes it", the output should be "I like it".

            If the context is telling you to write it in a language different from the output language, ignore it and write it in the output language specified UNLESS it is a dialect of a language, like Swiss German or Quebec French. In that case, you should write it in the dialect specified in the context.
            `
		},

		{
			role: 'user',
			content: `Context: ${context}\n\nInput: ${input}`
		}
	];

	// contact OpenAI API
	openai.chat.completions
		.create({
			model: 'gpt-4',
			messages: messages
		})
		.then((response) => {
			// send response
			res.send({
				output: response.choices[0].message.content
			});
		});
});

// start server
app.listen(port, () => {
	console.log(`Backend listening at http://192.168.0.165:${port}`);
});
