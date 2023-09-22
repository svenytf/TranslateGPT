<script lang="ts">
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

	// Initialize languages
	let languages: Array<{ shortcode: string; name: string }> = [
		{ shortcode: 'en', name: 'English' },
		{ shortcode: 'de', name: 'German' },
		{ shortcode: 'fr', name: 'French' },
		{ shortcode: 'es', name: 'Spanish' },
		{ shortcode: 'it', name: 'Italian' },
		{ shortcode: 'pt', name: 'Portuguese' },
		{ shortcode: 'ru', name: 'Russian' },
		{ shortcode: 'zh', name: 'Chinese (Mandarin)' },
		{ shortcode: 'ja', name: 'Japanese' },
		{ shortcode: 'ko', name: 'Korean' },
		{ shortcode: 'sv', name: 'Swedish' },
		{ shortcode: 'nl', name: 'Dutch' },
		{ shortcode: 'no', name: 'Norwegian' },
		{ shortcode: 'da', name: 'Danish' },
		{ shortcode: 'ar', name: 'Arabic' },
		{ shortcode: 'hi', name: 'Hindi' },
		{ shortcode: 'tr', name: 'Turkish' },
		{ shortcode: 'pl', name: 'Polish' },
		{ shortcode: 'fi', name: 'Finnish' },
		{ shortcode: 'el', name: 'Greek' },
		{ shortcode: 'cs', name: 'Czech' },
		{ shortcode: 'hu', name: 'Hungarian' },
		{ shortcode: 'id', name: 'Indonesian' },
		{ shortcode: 'ms', name: 'Malay' },
		{ shortcode: 'th', name: 'Thai' },
		{ shortcode: 'uk', name: 'Ukrainian' },
		{ shortcode: 'vi', name: 'Vietnamese' },
		{ shortcode: 'pirate', name: 'Pirate' },
		{ shortcode: 'yoda', name: 'Yoda' },
		{ shortcode: 'minion', name: 'Minion' }
	];

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

		// Disable input
		inputDisabled = true;

		// Set output to loading
		output = 'Translating...';

		// Use local api to translate using POST request
		const response = await fetch('http://localhost:5000/translate', {
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

		if (response === undefined) {
			// Set output to error
			output = 'Error: Unknown error.';
		} else {
			// Check if response is not OK
			if (response.status !== 200) {
				// Set output to error
				output = 'Error: ' + response.status + ' ' + response.statusText;
			} else {
				// Get response as JSON
				const data = await response.json();
				console.log(data);
				output = data.output;
			}
		}

		// Re-enable input
		inputDisabled = false;
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
						<option value={language.shortcode}>{language.name}</option>
					{/each}
				</select>

				<select name="lang-to" id="lang-to" bind:value={langTo}>
					{#each languages as language}
						<option value={language.shortcode}>{language.name}</option>
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
				<input type="file" id="input-file" name="input-file" bind:files={inputFile} accept=".txt" />
				<button id="translate-button" on:click={translate}>Translate</button>
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
		width: 50%;
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
</style>
