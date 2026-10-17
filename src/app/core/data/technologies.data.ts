import { ANGULAR_TOPICS } from './angular-topics.data';
import { ANGULAR_TOPIC_GUIDES } from './angular-guides.data';
import { DOTNET_TOPICS } from './dotnet-topics.data';
import { DOTNET_TOPIC_GUIDES } from './dotnet-guides.data';
import { CSHARP_TOPICS } from './csharp-topics.data';
import { CSHARP_TOPIC_GUIDES } from './csharp-guides.data';
import { SQL_SERVER_TOPICS } from './sql-server-topics.data';
import { SQL_SERVER_TOPIC_GUIDES } from './sql-server-guides.data';
import { AZURE_TOPICS } from './azure-topics.data';
import { AZURE_TOPIC_GUIDES } from './azure-guides.data';
import { InterviewTopic, TechnologyCategory, TopicContent } from '../models';
import { SupplementalGuide } from './supplemental-guide.model';

const categories: readonly Omit<TechnologyCategory, 'topics'>[] = [
  { id: 'angular', name: 'Angular', icon: 'web', color: '#c74634' },
  { id: 'dotnet', name: '.NET', icon: 'terminal', color: '#6544a5' },
  { id: 'csharp', name: 'C#', icon: 'code', color: '#7356a6' },
  { id: 'sql-server', name: 'SQL Server', icon: 'database', color: '#287c9e' },
  { id: 'azure', name: 'Azure', icon: 'cloud', color: '#2879b4' },
];

const topicsByCategory: Readonly<Record<string, readonly InterviewTopic[]>> = {
  'angular': ANGULAR_TOPICS,
  'dotnet': DOTNET_TOPICS,
  'csharp': CSHARP_TOPICS,
  'sql-server': SQL_SERVER_TOPICS,
  'azure': AZURE_TOPICS,
};

const guidesByCategory: Readonly<Record<string, Readonly<Record<string, SupplementalGuide>>>> = {
  'angular': ANGULAR_TOPIC_GUIDES,
  'dotnet': DOTNET_TOPIC_GUIDES,
  'csharp': CSHARP_TOPIC_GUIDES,
  'sql-server': SQL_SERVER_TOPIC_GUIDES,
  'azure': AZURE_TOPIC_GUIDES,
};

function buildSupplementalContent(topic: InterviewTopic, guide: SupplementalGuide): TopicContent {
  const concepts = guide.concepts.map((source, index) => {
    const separator = source.indexOf(':');
    const title = separator < 0 ? 'Core concept ' + (index + 1) : source.slice(0, separator).trim();
    const explanation = separator < 0 ? source : source.slice(separator + 1).trim();
    return { title, explanation, example: guide.example, interviewPoint: guide.validation };
  });
  const [first, second, third] = guide.concepts;
  return {
    introduction: guide.overview,
    concepts,
    questions: [
      { question: 'What is ' + topic.title + ', and when would you use it?', answer: guide.overview, detail: 'Frame the answer around the problem and constraints. ' + first, followUp: 'Which workload or product constraint would change your choice?' },
      { question: 'Which core mechanisms should you understand in ' + topic.title + '?', answer: first, detail: second + ' ' + third, followUp: 'How do these mechanisms interact in the system you are designing?' },
      { question: 'What trade-off matters most when implementing ' + topic.title + '?', answer: guide.tradeoff, detail: 'Balance that constraint with the expected behavior and operating model. ' + second, followUp: 'What evidence would you collect before changing the design?' },
      { question: 'How would you apply ' + topic.title + ' in a production scenario?', answer: guide.example, detail: 'Keep the boundary explicit and validate the assumptions in this scenario. ' + third, followUp: 'What would you do when a downstream dependency is unavailable?' },
      { question: 'How would you test and operate a solution using ' + topic.title + '?', answer: guide.validation, detail: 'Cover normal behavior, boundary inputs, failure recovery, and operational signals relevant to the workload. ' + guide.tradeoff, followUp: 'Which metric or alert would reveal a production regression first?' },
    ],
    codeExample: guide.codeExample,
    revision: [...guide.concepts, guide.tradeoff, guide.validation],
    useCases: [guide.example],
  };
}

export const TECHNOLOGIES: TechnologyCategory[] = categories.map((category) => ({
  ...category,
  topics: (topicsByCategory[category.id] ?? []).map((topic) => {
    if (topic.content) return topic;
    const guideId = category.id === 'csharp' && topic.id.startsWith('csharp-') ? topic.id.slice('csharp-'.length) : topic.id;
    const guide = guidesByCategory[category.id]?.[guideId];
    return guide ? { ...topic, content: buildSupplementalContent(topic, guide) } : topic;
  }),
}));

export const ALL_TOPICS: InterviewTopic[] = TECHNOLOGIES.flatMap((category) => category.topics);
export const TOPICS_WITHOUT_CONTENT = TECHNOLOGIES.flatMap((category) => category.topics.filter((topic) => !topic.content));
export const findTopic = (id: string | null | undefined): InterviewTopic | undefined => ALL_TOPICS.find((topic) => topic.id === id);
