import { z } from 'zod'

export const WordSense = z.object({
	word: z.string(),
	meanings: z.array(z.object({
		domain: z.string(),
		meaning: z.string(),
	})),
	exampleSentences: z.array(z.object({
		context: z.string(),
		sentence: z.string(),
	})),
	meta: z.object({
		partsOfSpeech: z.string(),
		phoneticExpression: z.string(),
		synonymns: z.array(z.string()),
		antonymns: z.array(z.string()),
		numberForm: z.enum(['Singular', 'Plural']),
		etymology: z.object({
			origin: z.enum([
				"Latin",
				"Greek",
				"OldEnglish",
				"OldNorse",
				"French",
				"Germanic",
				"Arabic",
				"Indian",
				"Italian",
				"Spanish",
				"Chinese",
				"Japanese",
				"IndigenousAmerican",
				"African",
			]),
			evolution: z.enum([
				"Borrowed",
				"Coined",
				"Shortened",
				"Blended",
				"ShiftedMeaning",
				"BackFormation",
				"Clipped",
				"Acronym",
				"Initialism",
				"Calque",
				"FolkEtymology",
				"Compound",
				"Reduplication",
				]),
		}),
		syllableCount: z.number(),
		styleAndTone: z.object({
			formalityLevel:  z.enum([
				'Very Formal',
				'Formal',
				'Neutral',
				'Informal',
				'Slang'
			]),
		}),
	})
});