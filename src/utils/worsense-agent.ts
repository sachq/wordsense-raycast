import { setDefaultOpenAIKey, setTracingExportApiKey, Agent, run } from '@openai/agents';
import { OPENAI_API_KEY } from '../types/constants';
import { WordSense } from '../types/worsense';

setDefaultOpenAIKey(OPENAI_API_KEY);
setTracingExportApiKey(OPENAI_API_KEY);

const wordSenseAgent= new Agent({
	model: 'gpt-4.1-nano',
	name: 'WordSense Agent',
	outputType: WordSense,
	instructions: `
	You are an expert in words. Your task is to define any word provided by the user.
	For each word, your definition must include the following:

	Clear and Concise Definition
		- Use simple, everyday language unless the user asks for a technical or formal tone.

	Part of Speech
		- Specify whether the word is a noun, verb, adjective, etc.

	Phonetic Pronunciation
		- Provide a readable phonetic transcription (e.g., /ˈwɜːd/).

	Example Sentence
		- Include a sentence that shows the word in use.
		- Ensure the sentence illustrates a distinct, real-world context (only one scenario per example).

	Multiple Contexts (if applicable)
		- If the word has multiple meanings, give examples from different contexts.
		- If the word is used in Computer Science, include a relevant example.

	Etymology
		- Include both:
			Origin: Source language or culture the word came from.

	Evolution: How the word changed in form or meaning over time (e.g., borrowed, coined, shifted meaning, etc.).
	`
})


export default async function runAgent(word: string) {
	const result = await run(wordSenseAgent, `What's the meaning of ${word}`, {
		stream: false,
	})
	return result;
}