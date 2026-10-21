#!/usr/bin/env python3
"""
Импорт книги из .docx в src/content/books/<slug>/<lang>/ для читалки ved·Life.

Результат:
  src/content/books/<slug>/<lang>/index.json  — список глав {id, title, minutes}
  src/content/books/<slug>/<lang>/<id>.json   — глава {id, title, words, minutes, blocks}

Границы глав — абзацы любого стиля вида «Пролог», «Введение», «Глава N. …»,
«Заключение» (и английские Prologue / Introduction / Chapter N / Conclusion):
в рукописях часть глав размечена Heading 1, а часть — обычным текстом.
Строки до первой границы (название, автор, год) пропускаются.

Внутри главы короткая строка в стиле «No Spacing» без завершающей точки —
подзаголовок (h3), остальное — абзацы.

Использование:
  python3 scripts/import-docx.py <путь.docx> <slug> <ru|en>
"""
import json
import re
import sys
from pathlib import Path

import docx

NAMED = {
    'пролог': 'prologue', 'prologue': 'prologue',
    'предисловие': 'foreword', 'foreword': 'foreword',
    'введение': 'intro', 'introduction': 'intro',
    'заключение': 'conclusion', 'conclusion': 'conclusion',
    'эпилог': 'epilogue', 'epilogue': 'epilogue',
}
CHAPTER_RE = re.compile(r'^(?:Глава|Chapter)\s+(\d+)\.?\s*(.*)$', re.IGNORECASE)
WORDS_PER_MIN = 160


def boundary(text):
    """id главы, если абзац начинает новую главу, иначе None."""
    t = text.strip()
    if t.lower() in NAMED:
        return NAMED[t.lower()]
    m = CHAPTER_RE.match(t)
    return f'ch{m.group(1)}' if m else None


def is_subhead(par):
    t = par.text.strip()
    return (par.style.name == 'No Spacing' and len(t) <= 80
            and not t.endswith(('.', '!', '?', ':', ';', '»', '"', '…', ','))
            and not t.startswith(('—', '«', '"')) and t[:1].isupper())


def main():
    src, slug, lang = sys.argv[1], sys.argv[2], sys.argv[3]
    out = Path(__file__).resolve().parent.parent / 'src/content/books' / slug / lang
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob('*.json'):
        old.unlink()

    chapters, cur = [], None
    for par in docx.Document(src).paragraphs:
        text = ' '.join(par.text.split())
        if not text:
            continue
        cid = boundary(text)
        if cid:
            cur = {'id': cid, 'title': text, 'blocks': []}
            chapters.append(cur)
        elif cur is not None:
            cur['blocks'].append({'type': 'h3' if is_subhead(par) else 'p', 'text': text})

    toc = []
    for ch in chapters:
        words = sum(len(b['text'].split()) for b in ch['blocks'])
        ch['words'] = words
        ch['minutes'] = max(1, round(words / WORDS_PER_MIN))
        (out / f"{ch['id']}.json").write_text(json.dumps(ch, ensure_ascii=False, indent=1), encoding='utf-8')
        toc.append({'id': ch['id'], 'title': ch['title'], 'minutes': ch['minutes']})
    (out / 'index.json').write_text(json.dumps({'chapters': toc}, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'{slug}/{lang}: {len(toc)} глав, {sum(c["words"] for c in chapters)} слов')


if __name__ == '__main__':
    main()
