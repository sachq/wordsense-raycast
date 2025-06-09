import { Detail } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import runAgent from "./utils/worsense-agent";
import { tagColor } from "./types/constants";

export default function GetWordMeaning(props: { arguments: { word: string } }) {
  const word = props.arguments.word;
  const { isLoading, data } = usePromise(
    async () => {
      const response = await runAgent(word);
      return response.finalOutput;
    },
    [],
  );

  const markDownExpression = `
${data?.word}
===============


---
### Meaning
${data?.meanings.map(m => `* \`${m.domain}\` - ${m.meaning}`).join('\n')}
---
### Usage  
${data?.exampleSentences.map(sentence => `* ${sentence.context} ${sentence.sentence}`).join('\n')}
  `


  return (
    <Detail
      isLoading={isLoading}
      markdown={data?.word ? markDownExpression : ''}
      metadata={(data?.meta.synonymns) ?
        <Detail.Metadata>
          <Detail.Metadata.Label title="Phonetics" text={`${data?.meta.phoneticExpression}`}/>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Parts of Speech" text={`${data?.meta.partsOfSpeech}`}/>
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Synonymns">
              {data?.meta.synonymns.map(synonymn => <Detail.Metadata.TagList.Item key={synonymn} text={synonymn} color={tagColor} />)}
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Antonymns">
              {data?.meta.antonymns.map(antonymn => <Detail.Metadata.TagList.Item key={antonymn} text={antonymn} color={tagColor} />)}
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Tone">
              <Detail.Metadata.TagList.Item text={data?.meta.styleAndTone.formalityLevel} color={tagColor}/>
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Origin">
              <Detail.Metadata.TagList.Item text={data?.meta.etymology.origin} color={tagColor}/>
          </Detail.Metadata.TagList>
        </Detail.Metadata> : ''
      }/>
  );
}
