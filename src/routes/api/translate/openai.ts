/**
 * I wrote this file so that I can use streaming, as the openai npm package doesn't support it.
 */
interface ChatCompletionMessage {
	role: 'user' | 'bot' | 'system' | 'assistant';
	content: string;

	// Name
	name?: string;

	// Function call
	function_call?: {
		name: string;
		arguments: string;
	};
}

interface ChatCompletionRequest {
	model: string;
	messages: ChatCompletionMessage[];
	functions?: {
		name: string;
		description?: string;
		parameters: string[];
	};

	// Function call
	function_call?: 'none' | 'auto' | string;

	temperature?: number;
	top_p?: number;
	n?: number;
	stream?: boolean;
	stop?: string | string[];
	max_tokens?: number;
	presence_penalty?: number;
	frequency_penalty?: number;
	user?: string;
}

export class openai {
	apiKey: string;
	model: string;
	endpoint: string;

	constructor(
		apiKey: string,
		model: string = 'gpt-3.5-turbo',
		endpoint: string = 'https://api.openai.com/v1/chat/completions'
	) {
		this.apiKey = apiKey;
		this.model = model;
		this.endpoint = endpoint;
	}

	/**
	 * Translates text from one language to another.
	 * @param text - The text to translate
	 * @param targetLanguage - The language to translate to
	 * @param sourceLanguage - The language to translate from
	 * @param context - Additional information or instructions
	 * @returns - A stream of the translated text
	 */
	async streamTranslate(
		text: string,
		targetLanguage: string,
		sourceLanguage: string,
		context?: string
	) {
		// check if anything is missing
		if (!this.apiKey) {
			throw new Error('API key is missing');
		}
		if (!text) {
			throw new Error('Text is missing');
		}
		if (!targetLanguage) {
			throw new Error('Target language is missing');
		}
		if (!sourceLanguage) {
			throw new Error('Source language is missing');
		}

		// hardcoded until I figure out the best way to make it NOT hardcoded, for customisability.
		const chatMessages: ChatCompletionMessage[] = [
			{
				role: 'system',
				content: `
                You are FoxyTranslator, you are a translator service that translates text from one language to another.
                You are currently translating from ${sourceLanguage} to ${targetLanguage}.
                Context (if any) is: "${context}"
                "Context" is additional information or instructions that may be useful for translation, such as mentions of ambiguity, instructions on how to translate the text, which dialect to write it to, slang and more.
                Whenever possible, FOLLOW INSTRUCTIONS IN THE CONTEXT.

                If both input translation language and output translation language are the same, then you are to improve the text, whether it be grammar, spelling, structure, or punctuation.

                You are to ONLY translate the text, and not add any additional information or context, do NOT add any extra text EXCEPT for the translated text.
                Respond with the translated text. Do not append, or prepend, or replace the text, just translate it, following the context if any.

                You are translating the following text:
                `
			},
			{
				role: 'user',
				content: text
			}
		];

		const chatCompletionRequest: ChatCompletionRequest = {
			model: this.model,
			messages: chatMessages,
			stream: true
		};

		const endpoint = this.endpoint;
		const apiKey = this.apiKey;

		// get the response
		const response: Response = await fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(chatCompletionRequest),
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			}
		});

		return response;
	}
}
