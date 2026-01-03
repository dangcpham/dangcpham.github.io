let parsedEntries = [];
let firstAuthor = [];
let secondThirdAuthor = [];
let contributingAuthor = [];

const ETAL = 10;
let currentSort = 'date';
let ascending = false;
let AUTHOR_LASTNAME = 'Pham';
let AUTHOR_FIRSTNAME = 'Dang';
let AUTHOR_FULLNAME = `${AUTHOR_FIRSTNAME} ${AUTHOR_LASTNAME}`;
const CONTAINER_NAME = 'publist';


const pubcontainer = document.getElementById(CONTAINER_NAME);
const totalCount = document.getElementById('total-count');

async function fetchBibFile(path) {
    const response = await fetch(path);
    return response.text();
}

function normalizeLatexMath(str) {
  // \ensuremath{...} -> $...$
  str = str.replace(/\\ensuremath\s*\{([^{}]+)\}/g, '$$$1$$');

  // \ensuremath\beta -> $\beta$
  str = str.replace(/\\ensuremath\s*\\([a-zA-Z]+)/g, '$\\$1$');

  // {\beta} -> $\beta$
  str = str.replace(/\{\\([a-zA-Z]+)\}/g, '$\\$1$');

  return str;
}

function latexToUnicode(str) {
  // Replace known LaTeX accent sequences
  const latexMap = {
    "\\'e": "é", "\\'a": "á", "\\'i": "í", "\\'o": "ó", "\\'u": "ú",
    "\\`e": "è", "\\`a": "à", "\\`i": "ì", "\\`o": "ò", "\\`u": "ù",
    '\\"o': "ö", '\\"a': "ä", '\\"u': "ü",
    "\\~n": "ñ", "\\c{c}": "ç",
    "\\'\\{e\\}": "é", "\\'\\{a\\}": "á", "\\'\\{i\\}": "í",
    "\\^{e}": "ê", "\\^{a}": "â", "\\^{i}": "î"
  };

  for (const [latex, uni] of Object.entries(latexMap)) {
    const regex = new RegExp(latex.replace(/\\/g, '\\\\'), 'g');
    str = str.replace(regex, uni);
  }

  // handle \'{e} → é
  str = str.replace(/\\'\\?\{?([a-zA-Z])\}?/g, (_, c) => {
    const map = { a: "á", e: "é", i: "í", o: "ó", u: "ú" };
    return map[c] || c;
  });

  return str.replace(/[{}]/g, '');
}


function parseAuthors(raw) {
    const authors = [];
    let buffer = '', depth = 0;

    for (let i = 0; i < raw.length; i++) {
        const char = raw[i];
        if (char === '{') depth++;
        if (char === '}') depth--;
        if (depth === 0 && raw.slice(i, i + 5) === ' and ') {
            authors.push(buffer.trim());
            buffer = '';
            i += 4;
        } else {
            buffer += char;
        }
    }
    if (buffer.trim()) authors.push(buffer.trim());

    return authors.map(name => {
        name = name.trim();

        // remove outer braces once
        if (name.startsWith('{') && name.endsWith('}')) {
            name = name.slice(1, -1);
        }

        // now convert latex escapes
        name = latexToUnicode(name);

        // split on comma if it exists
        const [last, first] = name.split(',').map(s => s.trim());
        return first ? `${first} ${last}` : last;
    });
}


function parseBibtex(raw) {
    const entries = [];
    const blocks = raw.split('@').slice(1); // skip first empty split
    for (const block of blocks) {
        const typeEnd = block.indexOf('{');
        const type = block.slice(0, typeEnd).trim();
        const content = block.slice(typeEnd + 1).trim();
        const keyEnd = content.indexOf(',');
        const citeKey = content.slice(0, keyEnd).trim();
        const fieldsRaw = content.slice(keyEnd + 1).replace(/\}\s*$/, '').trim();

        const fields = {};


        for (const line of fieldsRaw.split('\n')) {
            const match = line.match(/^\s*([\w\-]+)\s*=\s*(.+?),?\s*$/);
            if (match) {
                const field = match[1].toLowerCase();
                let value = match[2].trim();

                // Remove wrapping "..." or {...} or {{...}}
                if ((value.startsWith('{') && value.endsWith('}')) || (value.startsWith('"') && value.endsWith('"'))) {
                    value = value.slice(1, -1).trim();
                }

                // If it’s wrapped again (e.g. {{name}}), unwrap again
                if ((value.startsWith('{') && value.endsWith('}'))) {
                    value = value.slice(1, -1).trim();
                }

                // parse month
                if (field === 'month') {
                    const monthMap = {
                        jan: '01', feb: '02', mar: '03', apr: '04',
                        may: '05', jun: '06', jul: '07', aug: '08',
                        sep: '09', oct: '10', nov: '11', dec: '12'
                    };
                    const lowerValue = value.toLowerCase().slice(0, 3);
                    if (monthMap[lowerValue]) {
                        value = monthMap[lowerValue];
                    } else {
                        value = '00'; // unknown month
                    }
                }

                fields[field] = value;
            }
        }

        entries.push({ type, citeKey, fields });
    }
    return entries;
}

function formatEntry(entry) {
    const f = entry.fields;

    // let authors = f.author || '';
    // authors = authors.replace(/[{}]/g, '').split(' and ').map(a => a.includes('Pham') ? `<b>${a.trim()}</b>` : a.trim()).join(', ');
    let authorList = parseAuthors(f.author || '');
    // let isAuthor = authorList.some(name => 
    //   name.includes(AUTHOR_LASTNAME) && name.includes(AUTHOR_FIRSTNAME)
    // );

    let authors = '';

    const isAuthor = authorList.some(name =>
        name.toLowerCase().includes(AUTHOR_LASTNAME.toLowerCase()) &&
        name.toLowerCase().includes(AUTHOR_FIRSTNAME.toLowerCase())
    );

    if (authorList.length > ETAL) {
        const firstThree = authorList.slice(0, 3);

        const isAuthorInFirstThree = firstThree.some(name =>
            name.toLowerCase().includes(AUTHOR_LASTNAME.toLowerCase()) &&
            name.toLowerCase().includes(AUTHOR_FIRSTNAME.toLowerCase())
        );

        if (isAuthorInFirstThree) {
          const authorIndex = firstThree.findIndex(name =>
              name.toLowerCase().includes(AUTHOR_LASTNAME.toLowerCase()) &&
              name.toLowerCase().includes(AUTHOR_FIRSTNAME.toLowerCase())
          );

          if (authorIndex === 0) {
            authors = `<b>${authorList[0]}</b> et al.`;
          } else {
            const displayList = firstThree.map(name =>
                name.toLowerCase().includes(AUTHOR_LASTNAME.toLowerCase()) &&
                name.toLowerCase().includes(AUTHOR_FIRSTNAME.toLowerCase())
                    ? `<b>${name}</b>`
                    : name);
            authors = `${displayList.join(', ')} et al.`;
          }
        } else {
            const first = authorList[0];
            const displayFirst = first.toLowerCase().includes(AUTHOR_LASTNAME.toLowerCase()) &&
                                first.toLowerCase().includes(AUTHOR_FIRSTNAME.toLowerCase())
                                ? `<b>${first}</b>` : first;
            authors = `${displayFirst} et al. (includes <b>${AUTHOR_FULLNAME}</b>)`;
        }
    } else {
        authors = authorList.map(name =>
            name.includes(AUTHOR_LASTNAME) ? `<b>${name}</b>` : name
        ).join(', ');
    }


    let title = f.title ? `${normalizeLatexMath(f.title.replace(/[{}]/g, ''))}` : '';
    // title = title;

    let journal = f.journal || '';
    journal = journal.trim();
    if (journal in JOURNAL_MACROS) {
        journal = JOURNAL_MACROS[journal];
    }
    const year = f.year || '';
    const volume = f.volume || '';
    const pages = f.pages || '';
    const url = f.adsurl ? `<a href="${f.adsurl}">${journal}</a>` : journal;

    let citation = `${year}`;
    if (url) citation += `, ${url}`;
    if (volume) citation += `, ${volume}`;
    if (pages) citation += `, ${pages}`;

    return `<li>
                ${title}<br>
                ${authors}<br>
                ${citation}
            </li>`;
}

async function renderBibtex(bibPath, initialSort = 'date') {
  const bibRaw = await fetchBibFile(bibPath);
  parsedEntries = await parseBibtex(bibRaw);

  if (initialSort === 'first-author') {
    sortPubs('first-author');
  } else {
    sortPubs('date');
  }

  totalCount.textContent = `— ${parsedEntries.length} total, ${firstAuthor.length + secondThirdAuthor.length} major contributions (as first to third author)`;
  
  // re-render MathJax for newly loaded contents
  if (window.MathJax) {
    await MathJax.typesetPromise();
  }
  return true;
}


function renderEntries(entries, mode = 'flat') {

  // sort entries chronologically before rendering (include month)
  entries.sort((a, b) => {
    const yearDiff = parseInt(a.fields.year || '0') - parseInt(b.fields.year || '0');
    if (yearDiff !== 0) return ascending ? yearDiff : -yearDiff;

    const monthA = parseInt(a.fields.month || '0');
    const monthB = parseInt(b.fields.month || '0');
    return ascending ? monthA - monthB : monthB - monthA;
  });

  if (mode === 'split') {
    firstAuthor = [];
    secondThirdAuthor = [];
    contributingAuthor = [];
  
    for (const entry of entries) {
      const authors = parseAuthors(entry.fields.author || '');

      // consider (co-first author) too
      const authorIndex = authors.findIndex(a => a.includes(AUTHOR_LASTNAME) && a.includes(AUTHOR_FIRSTNAME));
      const coFirstIndex = authors.findIndex(a => a.includes(AUTHOR_LASTNAME + ' (co-first author)' ) && a.includes(AUTHOR_FIRSTNAME));
      // if co-first author, make AUTHOR the first author for sorting purposes
      const finalIndex = coFirstIndex !== -1 ? 0 : authorIndex;

      if (finalIndex === 0) {
        firstAuthor.push(entry);
      } else if (finalIndex === 1 || finalIndex === 2) {
        secondThirdAuthor.push(entry);
      } else {
        contributingAuthor.push(entry);
      }

      // if (finalIndex < 3 && finalIndex !== -1) {
      //   firstAuthor.push(entry);
      // } else {
      //   contributingAuthor.push(entry);
      // }
    }

    let html = '';

    html += renderCollapsibleSection("As First Author", firstAuthor);
    html += renderCollapsibleSection("As Second/Third Author", secondThirdAuthor);
    html += renderCollapsibleSection("As Contributing Author", contributingAuthor);

    pubcontainer.innerHTML = html;

  } else if (mode === 'group-by-year') {
    const grouped = {};
    for (const entry of entries) {
      const year = entry.fields.year || 'Unknown';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(entry);
    }

    const sortedYears = Object.keys(grouped)
      .map(y => parseInt(y))
      .sort((a, b) => ascending ? a - b : b - a);

    let html = '';
    for (const year of sortedYears) {
      html += renderCollapsibleSection(`${year}`, grouped[year]);
    }

    pubcontainer.innerHTML = html;

  } else {
    pubcontainer.innerHTML = `<ol reversed type="1">${entries.map(formatEntry).join('\n')}</ol>`;
  }
}

function renderCollapsibleSection(title, entries) {
  if (entries.length === 0) return '';

  return `
    <details open>
      <summary><strong>${title} (${entries.length})</strong></summary>
      <ol reversed type="1" style="margin-top: 1em;">
        ${entries.map(formatEntry).join('\n')}
      </ol>
    </details>
    <br/>
  `;
}

function sortPubs(mode) {
  currentSort = mode;

  if (mode === 'date') {
    parsedEntries.sort((a, b) => {
      const diff = parseInt(a.fields.year || '0') - parseInt(b.fields.year || '0');
      return ascending ? diff : -diff;
    });

    renderEntries(parsedEntries, 'group-by-year');

  } else if (mode === 'first-author') {
    parsedEntries.sort((a, b) => {
      const aFirst = parseAuthors(a.fields.author || '')[0];
      const bFirst = parseAuthors(b.fields.author || '')[0];
      const nameCompare = aFirst.localeCompare(bFirst);
      return ascending ? nameCompare : -nameCompare;
    });

    renderEntries(parsedEntries, 'split');
  }
}

function handleSortChange() {
  const select = document.getElementById('sort-select');
  const mode = select.value;
  currentSort = mode;
  sortPubs(mode);
}

function toggleSortOrder() {
  ascending = !ascending;
  const btn = document.getElementById('sort-order-btn');
  btn.textContent = ascending ? '⬇ Asc' : '⬆ Desc';
  sortPubs(currentSort);
}

renderBibtex("pubs.bib", "first-author");
