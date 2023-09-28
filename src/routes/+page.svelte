<script lang="ts">
	import type { Language } from '../types';
	import type { PageData } from './$types';

	export let data: PageData;

	// Set default language
	let langFrom: string = 'en';
	let langTo: string = 'de';

	// Initialize input and output
	let input: string = '';
	let output: string = '';

	// Initialize context
	let context: string = '';

	// Initialize input file
	let inputFile: FileList | null;

	// Initialize disabled state of input
	let inputDisabled: boolean = false;
	let translateStatus: string = 'Translate';

	// Initialize languages
	let languages: Language[] = data.languages;

	// Function for reading file and setting input
	async function readFileInput(file: File) {
		// Set input to file content
		file.text().then((text) => {
			input = text;
		});
	}

	// Function to translate input
	async function translate() {
		// Check if input is empty
		if (input === '') {
			// Set output to error
			output = 'Error: Input is empty.';
			return;
		}

		// Disable input and button
		inputDisabled = true;
		translateStatus = 'Translating...';

		// Empty output
		output = '';

		// Use local api to translate using POST request
		const response = await fetch('/api/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				input: input,
				context: context,
				langFrom: langFrom,
				langTo: langTo
			})
		});

		// Read response
		const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
		if (!reader) return;
		let finished: boolean = false;
		while (!finished) {
			const { done, value } = await reader.read();
			if (done) {
				// This is to shush the linter without disabling this rule. Will try to find better way to do this. For now, this will do.
				finished = true;
				break;
			}

			// Parse chunks of data
			const lines = value.split('\n');

			// Parse lines, removing empty lines and [DONE] line as well as data: prefix
			const parsedLines = lines
				.map((line) => line.replace(/^data: /, '').trim())
				.filter((line) => line !== '' && line !== '[DONE]')
				.map((line) => JSON.parse(line));

			// Set output to parsed lines
			for (const line of parsedLines) {
				// Check if line has content
				if (line.choices[0].delta.content) {
					// Append output
					output += line.choices[0].delta.content;
				}
			}
		}

		// Re-enable input and button
		inputDisabled = false;
		translateStatus = 'Translate';
	}

	$: {
		if (inputFile) {
			readFileInput(inputFile[0]);
		}
	}
</script>

<body>
	<h1>TranslateGPT</h1>
	<div class="frame">
		<div class="translate-frame">
			<div class="translate-fromto">
				<select name="lang-from" id="lang-from" bind:value={langFrom}>
					{#each languages as language}
						<option value={language.shortcode}
							>{#if language.flagUnicode}{language.flagUnicode} | {/if}{language.name}</option
						>
					{/each}
				</select>

				<select name="lang-to" id="lang-to" bind:value={langTo}>
					{#each languages as language}
						<option value={language.shortcode}
							>{#if language.flagUnicode}{language.flagUnicode} | {/if}{language.name}</option
						>
					{/each}
				</select>
			</div>
			<div class="translate-textareas">
				<textarea
					disabled={inputDisabled}
					name="input"
					id="translateinput"
					rows="30"
					placeholder="Input"
					bind:value={input}
				/>
				<textarea
					readonly
					name="output"
					id="translateoutput"
					rows="30"
					placeholder="Output"
					bind:value={output}
				/>
			</div>
			<div class="context-submit">
				<textarea
					name="context-text"
					id="context-text"
					rows="4"
					placeholder="Context or hint"
					bind:value={context}
				/>
				<input
					type="file"
					id="input-file"
					name="input-file"
					bind:files={inputFile}
					accept="text/*"
					disabled={inputDisabled}
				/>
				<button id="translate-button" on:click={translate} disabled={inputDisabled}
					>{translateStatus}</button
				>
			</div>
		</div>
	</div>
</body>

<style>
	body {
		font-family: Arial, Helvetica, sans-serif;
	}

	h1 {
		text-align: center;
		font-size: 4em;
		margin: 1em;
	}

	button {
		padding: 12px;
		margin: 8px;
		font-size: 28px;

		color: black;
		background-color: white;
		border: solid purple 4px;
		border-radius: 12px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.19);
		transition: 0.1s linear;
	}

	button:hover {
		background-color: purple;
		border: solid magenta 4px;
		color: white;
	}

	button:active {
		background-color: #c7c7c7;
	}

	.frame {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.translate-frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 70%;
	}

	.translate-fromto {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	.translate-fromto select {
		width: 100%;
		margin: 8px;
		padding: 8px;

		font-size: 16px;

		box-shadow: 0 0 8px rgba(0, 0, 0, 0.19);

		background-color: white;
		border: solid rgba(128, 0, 128, 0) 4px;
		border-radius: 12px;

		transition: 0.1s linear;

		appearance: none;
	}

	.translate-fromto select:hover {
		border: solid purple 4px;
	}

	.translate-textareas {
		padding: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	.context-submit {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	#translate-button {
		height: 100%;
		width: 15%;
	}

	textarea {
		resize: none;
		margin: 8px;
		padding: 8px;

		font-size: 16px;

		border-radius: 12px;
		border: solid rgba(128, 0, 128, 0) 4px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.19);

		transition: 0.1s linear;
	}

	textarea:hover {
		border: solid purple 4px;
	}

	#translateinput {
		width: auto;
		flex-grow: 1;
	}

	#translateoutput {
		width: auto;
		flex-grow: 1;
	}

	#context-text {
		width: 100%;
		margin: 8px;
	}

	@media screen and (max-width: 1915px) {
		.translate-frame {
			width: 75%;
		}
	}

	@media screen and (max-width: 1275px) {
		.translate-frame {
			width: 100%;
		}

		.translate-textareas {
			flex-direction: column;
			width: 100%;
			height: 40rem !important;
		}

		.translate-textareas textarea {
			width: 100% !important;
		}
	}
</style>
