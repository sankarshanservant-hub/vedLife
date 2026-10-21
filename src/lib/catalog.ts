// Каталог ved·Life: книги, территории (серии) и записи «Живого указателя».
// Тексты глав лежат в src/content/books/<slug>/<lang>/ (см. scripts/import-docx.py).

import type { Lang } from './i18n';

export type Pigment = 'indigo' | 'terracotta' | 'tulasi' | 'marigold' | 'bister';

export type Territory = {
  id: string;
  name: Record<Lang, string>;
  about: Record<Lang, string>;
  pigment: Pigment;
  glyph: string; // файл в /brand/glyphs/
};

export type Book = {
  slug: string;
  entry: string; // номер в «Живом указателе», всегда три цифры
  territory: string;
  year: number;
  title: Record<Lang, string>;
  subtitle?: Partial<Record<Lang, string>>;
  author: Record<Lang, string>;
  description: Record<Lang, string>;
  // языки, на которых текст уже есть на сайте
  texts: Lang[];
  // сколько первых глав открыто бесплатно
  freeChapters: number;
  status: 'reading' | 'soon';
  // формы произведения (Preservation Through Transformation)
  audio?: Partial<Record<Lang, 'available' | 'soon'>>;
  stores?: { name: string; url: string; lang: Lang }[];
  note?: Partial<Record<Lang, string>>;
};

export const TERRITORIES: Territory[] = [
  {
    id: 'gitas',
    name: { ru: 'Гиты', en: 'The Gitas' },
    about: {
      ru: 'Песни Пути: диалоги учителя и учеников о дхарме, карме и природе души.',
      en: 'Songs of the Way: dialogues between a teacher and students on dharma, karma and the self.',
    },
    pigment: 'indigo',
    glyph: 'G04-philosophy',
  },
  {
    id: 'name',
    name: { ru: 'Святое Имя', en: 'The Holy Name' },
    about: {
      ru: 'Звук, мантра и Имя: беседы и истории о пути, который проходит через слух.',
      en: 'Sound, mantra and the Name: talks and stories about a path that runs through hearing.',
    },
    pigment: 'marigold',
    glyph: 'G02-recital',
  },
  {
    id: 'foundations',
    name: { ru: 'Основы', en: 'Foundations' },
    about: {
      ru: 'Ведическое мировоззрение без посредников: о Боге, мире и человеке.',
      en: 'The Vedic worldview without intermediaries: on God, the world and the person.',
    },
    pigment: 'tulasi',
    glyph: 'G01-scripture',
  },
  {
    id: 'tales',
    name: { ru: 'Притчи и романы', en: 'Tales' },
    about: {
      ru: 'Художественная проза, в которой философия живёт внутри сюжета.',
      en: 'Fiction in which the philosophy lives inside the story.',
    },
    pigment: 'terracotta',
    glyph: 'G03-epics',
  },
];

export const BOOKS: Book[] = [
  {
    slug: 'dharma-gita',
    entry: '001',
    territory: 'gitas',
    year: 2026,
    title: { ru: 'Дхарма Гита', en: 'Dharma Gita' },
    subtitle: { ru: 'Песнь Пути', en: 'Following Your True Nature' },
    author: { ru: 'Под редакцией Свами Авадхута', en: 'Edited by Swami Avadhut' },
    description: {
      ru: 'Диалоги Учителя и учеников о дхарме — пути через поле битвы собственной жизни. По преданию, этот текст нашли монахи, возвращавшиеся из Индии в Китай.',
      en: 'Dialogues between a Master and his students on dharma — the path across the battlefield of one’s own life. Legend says monks found the text on their way home from India to China.',
    },
    texts: ['ru', 'en'],
    freeChapters: 5,
    status: 'reading',
    audio: { ru: 'soon' },
  },
  {
    slug: 'imya',
    entry: '002',
    territory: 'name',
    year: 2026,
    title: { ru: 'Имя', en: 'The Name' },
    author: { ru: 'Свами Авадхут', en: 'Swami Avadhut' },
    description: {
      ru: 'Беседы о Святом Имени за тридцать с лишним лет, собранные в одну книгу: короткие истории в десяти частях.',
      en: 'Thirty-odd years of talks on the Holy Name, gathered into one book of short stories in ten parts.',
    },
    texts: ['ru'],
    freeChapters: 12,
    status: 'reading',
    note: { en: 'English edition in preparation. The Russian text is open to read.' },
  },
  {
    slug: 'karma-gita',
    entry: '003',
    territory: 'gitas',
    year: 2026,
    title: { ru: 'Карма Гита', en: 'Karma Gita' },
    author: { ru: 'Свами Авадхут', en: 'Swami Avadhut' },
    description: {
      ru: 'Притча о караване на тракте между Индией и Китаем и об Отшельнике, который отвечает на главный вопрос: почему мир, устроенный справедливо, так часто кажется несправедливым.',
      en: 'A parable of a caravan on the road between India and China, and of a hermit who answers one question: why a world built on justice so often looks unjust.',
    },
    texts: ['ru'],
    freeChapters: 3,
    status: 'reading',
    note: { en: 'English edition in preparation. The Russian text is open to read.' },
  },
  {
    slug: 'vedicheskoe-mirovozzrenie',
    entry: '004',
    territory: 'foundations',
    year: 2026,
    title: { ru: 'Ведическое мировоззрение', en: 'The Vedic Worldview' },
    author: { ru: 'Свами Авадхут', en: 'Swami Avadhut' },
    description: {
      ru: 'Веды о Боге, мире и человеке: почему мир похож на сложную игру, зачем человеку дано тело и что в нас роднит нас с Абсолютом.',
      en: 'The Vedas on God, the world and the person: why the world resembles a complex game, why we are given a human body, and what in us is akin to the Absolute.',
    },
    texts: [],
    freeChapters: 0,
    status: 'soon',
  },
  {
    slug: 'puteshestvie-na-zapad',
    entry: '005',
    territory: 'tales',
    year: 2026,
    title: { ru: 'Путешествие на Запад', en: 'Journey to the West' },
    subtitle: { ru: 'Тайна Пути', en: 'The Secret of the Way' },
    author: { ru: 'Свами Авадхут', en: 'Swami Avadhut' },
    description: {
      ru: 'Роман-притча в декорациях старого Китая: принц царства Чанлинь, демоны и магия — и путь, который лежит за ними.',
      en: 'A novel-parable set in old China: a prince of the Changlin kingdom, demons and magic, and the path that lies beyond them.',
    },
    texts: ['ru'],
    freeChapters: 3,
    status: 'reading',
    note: { en: 'The English edition is published on Amazon. The Russian text is open to read here.' },
  },
];

export const territoryOf = (b: Book) => TERRITORIES.find((t) => t.id === b.territory)!;
export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);
export const nextEntry = () => String(BOOKS.length + 1).padStart(3, '0');

// --- тексты глав ---

export type Block = { type: 'p' | 'h3' | 'verse' | 'cite' | 'img'; text?: string; src?: string; caption?: string; runs?: { text: string; href?: string }[] };
export type ChapterMeta = { id: string; title: string; minutes: number; part?: string };
export type Chapter = ChapterMeta & { words: number; blocks: Block[] };

const INDEXES = import.meta.glob('../content/books/*/*/index.json', { import: 'default', eager: true }) as Record<string, { chapters: ChapterMeta[] }>;
const CHAPTERS = import.meta.glob(['../content/books/*/*/*.json', '!../content/books/*/*/index.json'], { import: 'default' }) as Record<string, () => Promise<Chapter>>;

export function tocOf(slug: string, lang: Lang): ChapterMeta[] {
  return INDEXES[`../content/books/${slug}/${lang}/index.json`]?.chapters ?? [];
}

export async function loadChapter(slug: string, lang: Lang, id: string): Promise<Chapter | null> {
  const load = CHAPTERS[`../content/books/${slug}/${lang}/${id}.json`];
  return load ? load() : null;
}

// Язык текста для читалки: свой, если есть, иначе русский оригинал
export function textLang(b: Book, lang: Lang): Lang | null {
  if (b.texts.includes(lang)) return lang;
  return b.texts[0] ?? null;
}
