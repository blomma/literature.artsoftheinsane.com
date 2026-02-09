const default_literature_quote = [
    {
        quoteFirst:
            "Apologies, a quote has not yet been unearthed for the current time, instead, for now, I leave you with this quote from Douglas Adams.\n\n\n",
        quoteLast: "“Time is an illusion. Lunchtime doubly so.”",
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
    },
];

async function init() {
    const date = new Date();
    const time =
        `${date.getHours()}`.padStart(2, "0") +
        "_" +
        `${date.getMinutes()}`.padStart(2, "0");

    const quoteData = await fetch(`quotes/${time}.json`)
        .then((response) =>
            response.ok ? response.json() : default_literature_quote,
        )
        .then((quotes) => quotes[Math.floor(Math.random() * quotes.length)])
        .catch(() => default_literature_quote[0]);

    const quote = document.getElementById("quote");
    appendTextFragments(quoteData.quoteFirst, quote);

    if (quoteData.quoteTime) {
        const em = document.createElement("em");
        em.textContent = quoteData.quoteTime;
        quote.appendChild(em);
    }

    if (quoteData.quoteLast) {
        appendTextFragments(quoteData.quoteLast, quote);
    }

    const cite = document.getElementById("cite");
    cite.textContent = "-";

    const citeTitle = document.createElement("span");
    citeTitle.className = "title";
    citeTitle.textContent = quoteData.title;

    const citeAuthor = document.createElement("span");
    citeAuthor.className = "author";
    citeAuthor.textContent = quoteData.author;

    if (quoteData.gutenbergReference) {
        const link = document.createElement("a");
        link.href = `https://www.gutenberg.org/ebooks/${quoteData.gutenbergReference}`;
        link.append(citeTitle, ",", citeAuthor);
        cite.appendChild(link);
    } else {
        cite.append(citeTitle, ",", citeAuthor);
    }
}

function appendTextFragments(text, node) {
    text.split("\n").forEach((line, index, array) => {
        node.appendChild(document.createTextNode(line));
        if (index < array.length - 1 || text.endsWith("\n")) {
            node.appendChild(document.createElement("br"));
        }
    });
}

window.addEventListener("load", init);
