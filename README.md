# Raycast Extension: WordSense

A personal Raycast extension for exploring rich linguistic data about words — including definitions, grammatical metadata, and contextual usage.

> ⚠️ This extension is intended for **personal use only** and is not maintained for public distribution.

## Features

- View word meanings categorized by domain
- See example sentences with contextual labels
- Explore:
  - Part of speech
  - Phonetic expression
  - Synonyms, antonyms, and hypernyms
  - Grammatical number (Singular / Plural)
  - Etymology (origin & evolution)
  - Syllable count
  - Formality level (style & tone)

## Schema Reference for OpenAI Agent

The extension uses a `WordSense` schema defined with [Zod](https://zod.dev/) for type validation.  
Here's a simplified structure:

```ts
WordSense {
  word: string;
  meanings: [{ domain: string, meaning: string }];
  exampleSentences: [{ context: string, sentence: string }];
  meta: {
    partOfSpeech: string;
    phoneticExpression: string;
    synonyms: string[];
    antonyms: string[];
    hypernyms: string[];
    numberForm: 'Singular' | 'Plural';
    etymology: { origin: string, evolution: string };
    syllableCount: number;
    styleAndTone: {
      formalityLevel: 'Very Formal' | 'Formal' | 'Neutral' | 'Informal' | 'Slang';
    }
  }
}
```


> **Note** If you plan to use this extension, rename `constants.template.ts` to `constants.ts` and replace the placeholder with your own OpenAI API key.