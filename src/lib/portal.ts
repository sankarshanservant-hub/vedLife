// Данные портала: двери, лестница глубины, входы, задания Мастерской, подписка, слои читалки.
// Тон — голос бренда (00b): ≤ 9 слов в заголовке, точка в конце, без восклицаний и обещаний.
import type { Lang } from './i18n';
import type { Pigment } from './catalog';

export type L = Record<Lang, string>;
export type Status = 'live' | 'building' | 'idea';

export const STATUS: Record<Status, L> = {
  live: { ru: 'Работает', en: 'Live' },
  building: { ru: 'В работе', en: 'In progress' },
  idea: { ru: 'Идея', en: 'Idea' },
};

/* Девять дверей: восемь направлений из брендбука (15 · Глифы) и девятая — игры и колоды
   («Запись 602»: девятое место пустовало до девятой территории). */
export type Door = {
  id: string; glyph: string; pigment: Pigment; photo: string; position?: string;
  label: L; title: L; text: L; status: Status; href?: string; external?: boolean;
};
export const DOORS: Door[] = [
  { id: 'books', glyph: 'G01-scripture', pigment: 'bister', photo: 'reading-room', label: { ru: 'Писание', en: 'Scripture' },
    title: { ru: 'Книги и читалка', en: 'Books and reader' },
    text: { ru: 'Первые главы открыты. Читалка помнит, где вы остановились.', en: 'First chapters are open. The reader remembers where you stopped.' },
    status: 'live', href: 'books' },
  { id: 'audio', glyph: 'G02-recital', pigment: 'marigold', photo: 'japa-mala-crop', label: { ru: 'Рецитация', en: 'Recital' },
    title: { ru: 'Аудио', en: 'Audio' },
    text: { ru: 'Чтение вслух, беседы, подкасты. Тот же текст — на слух.', en: 'Read aloud, talks, podcasts. The same text, by ear.' },
    status: 'building' },
  { id: 'epics', glyph: 'G03-epics', pigment: 'terracotta', photo: 'scene-01-crop', label: { ru: 'Эпосы', en: 'Epics' },
    title: { ru: 'Комикс «Махабхарата»', en: 'The Mahābhārata comic' },
    text: { ru: 'Эпос в рисунке и приложение с интерактивными страницами.', en: 'The epic in drawing, and an app with interactive pages.' },
    status: 'building' },
  { id: 'talks', glyph: 'G04-philosophy', pigment: 'indigo', photo: 'shoulder-laptops', label: { ru: 'Философия', en: 'Philosophy' },
    title: { ru: 'Беседы и архив', en: 'Talks and archive' },
    text: { ru: 'Лекции Авадхута Махараджа с расшифровками и тайм-кодами.', en: 'Lectures of Avadhut Maharaj with transcripts and timecodes.' },
    status: 'live', href: 'https://avadhutmaharaj.com', external: true },
  { id: 'kirtan', glyph: 'G06-kirtan', pigment: 'marigold', photo: 'road-kirtan', label: { ru: 'Киртан', en: 'Kirtan' },
    title: { ru: 'Музыка и киртан', en: 'Music and kirtan' },
    text: { ru: 'Записи, концерты, звук для читалки и для дороги.', en: 'Recordings, concerts, sound for the reader and for the road.' },
    status: 'idea' },
  { id: 'film', glyph: 'G07-film', pigment: 'bister', photo: 'media-monitor', label: { ru: 'Фильм', en: 'Film' },
    title: { ru: 'Видео и каналы', en: 'Video and channels' },
    text: { ru: 'Серии, съёмки из дороги, каналы вокруг книг и комикса.', en: 'Series, road footage, channels around the books and the comic.' },
    status: 'building' },
  { id: 'things', glyph: 'G08-fashion', pigment: 'bister', photo: 'mock-tote', label: { ru: 'Мода', en: 'Fashion' },
    title: { ru: 'Вещи', en: 'Things' },
    text: { ru: 'Одежда и предметы. На вещи один знак, а не вывеска.', en: 'Clothing and objects. One mark on a thing, not a signboard.' },
    status: 'idea' },
  { id: 'practice', glyph: 'G05-ayurveda', pigment: 'tulasi', photo: 'puja-offering', label: { ru: 'Аюрведа', en: 'Ayurveda' },
    title: { ru: 'Практики', en: 'Practice' },
    text: { ru: 'Еда, чай, день: как знание входит в быт.', en: 'Food, tea, the day: how knowledge enters daily life.' },
    status: 'idea' },
  { id: 'games', glyph: 'G09-game', pigment: 'indigo', photo: 'scene-13-crop', label: { ru: 'Игра', en: 'Game' },
    title: { ru: 'Колоды и игры', en: 'Decks and games' },
    text: { ru: 'Колоды, настольные и цифровые игры по сюжетам книг.', en: 'Decks, board and digital games drawn from the books.' },
    status: 'idea' },
];

/* Лестница глубины. Кольца знака — ступени: чем глубже, тем плотнее линия. */
export type Depth = { id: string; name: L; text: L; access: L };
export const DEPTHS: Depth[] = [
  { id: 'seen', name: { ru: 'Увидел', en: 'Saw' }, text: { ru: 'Карточка в ленте: цитата или сцена, источник назван.', en: 'A card in the feed: one quote or scene, source named.' }, access: { ru: 'Открыто', en: 'Open' } },
  { id: 'tried', name: { ru: 'Попробовал', en: 'Tried' }, text: { ru: 'Первые главы без входа и без вопросов.', en: 'First chapters, no sign-in, no questions.' }, access: { ru: 'Открыто', en: 'Open' } },
  { id: 'stayed', name: { ru: 'Остался', en: 'Stayed' }, text: { ru: 'Аккаунт: закладки, продолжение чтения, письма о новом.', en: 'An account: bookmarks, continue reading, news by mail.' }, access: { ru: 'Бесплатно', en: 'Free' } },
  { id: 'deeper', name: { ru: 'Углубился', en: 'Went deeper' }, text: { ru: 'Слои читалки: звук, иллюстрации, видео. Полный текст и аудио.', en: 'Reader layers: sound, illustration, video. Full text and audio.' }, access: { ru: 'Подписка', en: 'Subscription' } },
  { id: 'joined', name: { ru: 'Участвует', en: 'Takes part' }, text: { ru: 'События, смены, чаты команды, Древо служения.', en: 'Events, shifts, team chats, the tree of service.' }, access: { ru: 'Через панель служения', en: 'Via the service panel' } },
  { id: 'makes', name: { ru: 'Создаёт', en: 'Makes' }, text: { ru: 'Мастерская: задания, когорты, релизы с долей автора.', en: 'The Workshop: briefs, cohorts, releases with the author’s share.' }, access: { ru: 'По отбору кураторов', en: 'Curated entry' } },
];

export type Entry = { from: L; first: L; next: L; depth: number };
export const ENTRIES: Entry[] = [
  { from: { ru: 'Reels, Shorts, TikTok', en: 'Reels, Shorts, TikTok' }, first: { ru: 'Карточка: одна цитата или сцена', en: 'A card: one quote or scene' }, next: { ru: 'Эпизод целиком, затем читалка', en: 'The whole episode, then the reader' }, depth: 0 },
  { from: { ru: 'YouTube и подкасты', en: 'YouTube and podcasts' }, first: { ru: 'Страница выпуска: тайм-коды, источники', en: 'Episode page: timecodes, sources' }, next: { ru: 'Книга, к которой он относится', en: 'The book it belongs to' }, depth: 1 },
  { from: { ru: 'Бумажная книга или колода', en: 'Paper book or deck' }, first: { ru: 'QR внутри: слои этой книги', en: 'QR inside: this book’s layers' }, next: { ru: 'Читалка со слоями навсегда', en: 'The layered reader, for good' }, depth: 3 },
  { from: { ru: 'Событие и встреча', en: 'Event or meetup' }, first: { ru: 'Анкета по QR на месте', en: 'On-site QR form' }, next: { ru: 'Моё служение, смены, чат', en: 'My service, shifts, chat' }, depth: 4 },
  { from: { ru: 'Приложение с комиксом', en: 'The comic app' }, first: { ru: 'Страница сюжета', en: 'A page of the story' }, next: { ru: 'Книга, колода, обсуждение', en: 'The book, the deck, the discussion' }, depth: 2 },
  { from: { ru: 'Поиск', en: 'Search' }, first: { ru: 'Справка: термин, место, персонаж', en: 'A reference: term, place, character' }, next: { ru: 'Все формы вокруг этого слова', en: 'Every form around this word' }, depth: 1 },
];

/* Мастерская: лестница и образцы заданий. Номера — «записи» летописи (14). */
export const WORKSHOP_STEPS: { name: L; text: L }[] = [
  { name: { ru: 'Задание', en: 'Brief' }, text: { ru: 'Куратор открывает задание внутри территории: что нужно книге.', en: 'A curator opens a brief inside a territory: what the book needs.' } },
  { name: { ru: 'Мастерская', en: 'Workshop' }, text: { ru: 'Короткая когорта: наставник, разбор работ, общий срок.', en: 'A short cohort: a mentor, critiques, a shared deadline.' } },
  { name: { ru: 'Релиз', en: 'Release' }, text: { ru: 'Отобранная работа выходит под именем автора, с договором.', en: 'The chosen work is released under the author’s name, under contract.' } },
  { name: { ru: 'Резиденция', en: 'Residency' }, text: { ru: 'Постоянный состав: те, кто ведёт направление дальше.', en: 'A standing team: those who carry a direction forward.' } },
];

export type Brief = { no: string; door: string; kind: L; title: L; scope: L; reward: L };
export const BRIEFS: Brief[] = [
  { no: '601', door: 'books', kind: { ru: 'Иллюстрация', en: 'Illustration' }, title: { ru: 'Дхарма Гита, глава 4', en: 'Dharma Gita, chapter 4' }, scope: { ru: 'Пять работ для слоя читалки. Источник — текст главы.', en: 'Five works for a reader layer. The source is the chapter text.' }, reward: { ru: 'Гонорар и доля от слоя', en: 'Fee and a share of the layer' } },
  { no: '602', door: 'audio', kind: { ru: 'Звук', en: 'Sound' }, title: { ru: 'Имя: звуковая среда', en: 'The Name: a sound bed' }, scope: { ru: 'Десять петель по две минуты. Без слов, без ритма киртана.', en: 'Ten two-minute loops. No words, no kirtan rhythm.' }, reward: { ru: 'Гонорар', en: 'Fee' } },
  { no: '603', door: 'epics', kind: { ru: 'Комикс', en: 'Comics' }, title: { ru: 'Махабхарата, раскадровки', en: 'Mahābhārata storyboards' }, scope: { ru: 'Вторая песнь, 24 страницы. Сверка с источником обязательна.', en: 'Book two, 24 pages. Checking against the source is required.' }, reward: { ru: 'Договор на серию', en: 'A series contract' } },
  { no: '604', door: 'games', kind: { ru: 'Колода', en: 'Deck' }, title: { ru: 'Колода «Путь», 32 карты', en: 'The “Way” deck, 32 cards' }, scope: { ru: 'Дизайн и иллюстрации. Запуск через предзаказ.', en: 'Design and illustration. Launched through pre-orders.' }, reward: { ru: 'Доля с тиража', en: 'A share of the print run' } },
  { no: '605', door: 'books', kind: { ru: 'Перевод', en: 'Translation' }, title: { ru: 'Имя на английском', en: 'The Name in English' }, scope: { ru: 'Переводчик и редактор. Диакритика по правилам издательства.', en: 'A translator and an editor. Diacritics per the house rules.' }, reward: { ru: 'Гонорар', en: 'Fee' } },
  { no: '606', door: 'things', kind: { ru: 'Дизайн вещи', en: 'Object design' }, title: { ru: 'Знак на груди', en: 'The mark on the chest' }, scope: { ru: 'Футболка и сумка. Один элемент на сторону, одна краска.', en: 'A tee and a tote. One element per side, one ink.' }, reward: { ru: 'Доля с продаж', en: 'A share of sales' } },
];

/* Слои читалки */
export type Layer = { id: 'notes' | 'art' | 'sound' | 'frame'; name: L; text: L; paid: boolean };
export const LAYERS: Layer[] = [
  { id: 'notes', name: { ru: 'Источники и примечания', en: 'Sources and notes' }, text: { ru: 'Слова, места, цитаты: что стоит за строкой.', en: 'Words, places, quotes: what stands behind a line.' }, paid: false },
  { id: 'art', name: { ru: 'Иллюстрации', en: 'Illustrations' }, text: { ru: 'Рисунок между абзацами, от приглашённых авторов.', en: 'Drawings between paragraphs, by invited artists.' }, paid: true },
  { id: 'sound', name: { ru: 'Звук', en: 'Sound' }, text: { ru: 'Тихая среда и колокол на входе в сцену. Звук следует за чтением.', en: 'A quiet bed and a bell as a scene begins. Sound follows the reading.' }, paid: true },
  { id: 'frame', name: { ru: 'Кадр', en: 'Frame' }, text: { ru: 'Короткое видео или фото к месту в тексте.', en: 'A short film or photograph for a place in the text.' }, paid: true },
];

/* Подписка. Условия не утверждены: прототип показывает устройство, а не цены. */
export type Tier = { id: string; name: L; who: L; items: L[] };
export const TIERS: Tier[] = [
  { id: 'reader', name: { ru: 'Читатель', en: 'Reader' }, who: { ru: 'Бесплатно', en: 'Free' },
    items: [
      { ru: 'Первые главы каждой книги', en: 'First chapters of every book' },
      { ru: 'Закладки и продолжение чтения', en: 'Bookmarks and resume' },
      { ru: 'Источники и примечания', en: 'Sources and notes' },
      { ru: 'Живой указатель и карточки', en: 'The living index and cards' },
    ] },
  { id: 'plus', name: { ru: 'Читалка+', en: 'Reader+' }, who: { ru: 'По подписке', en: 'By subscription' },
    items: [
      { ru: 'Полный текст всех книг', en: 'Full text of every book' },
      { ru: 'Иллюстрации, звук, кадры', en: 'Illustrations, sound, frames' },
      { ru: 'Аудио книг', en: 'Audio of the books' },
      { ru: 'Ранний доступ к главам', en: 'Early access to chapters' },
    ] },
  { id: 'workshop', name: { ru: 'Мастерская', en: 'Workshop' }, who: { ru: 'По отбору', en: 'By selection' },
    items: [
      { ru: 'Задания и когорты', en: 'Briefs and cohorts' },
      { ru: 'Куратор и разбор работ', en: 'A curator and critiques' },
      { ru: 'Релиз с договором и долей', en: 'A release with contract and share' },
      { ru: 'Карточка в панели служения', en: 'A card in the service panel' },
    ] },
];

// Матрица «слой × уровень»: 0 нет, 1 есть, 2 часть
export const MATRIX: { row: L; vals: [number, number, number] }[] = [
  { row: { ru: 'Текст книг', en: 'Book text' }, vals: [2, 1, 1] },
  { row: { ru: 'Источники и примечания', en: 'Sources and notes' }, vals: [1, 1, 1] },
  { row: { ru: 'Иллюстрации', en: 'Illustrations' }, vals: [0, 1, 1] },
  { row: { ru: 'Звук', en: 'Sound' }, vals: [0, 1, 1] },
  { row: { ru: 'Кадры и видео', en: 'Frames and video' }, vals: [0, 1, 1] },
  { row: { ru: 'Аудио книг', en: 'Audio of the books' }, vals: [0, 1, 1] },
  { row: { ru: 'Задания и когорты', en: 'Briefs and cohorts' }, vals: [0, 0, 1] },
];
