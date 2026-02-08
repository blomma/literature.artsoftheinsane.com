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
    quoteFragments(quoteData.quoteFirst, quote);

    if (quoteData.quoteTime) {
        const em = document.createElement("em");
        em.innerText = quoteData.quoteTime;
        quote.appendChild(em);
    }

    if (quoteData.quoteLast) {
        quoteFragments(quoteData.quoteLast, quote);
    }

    const cite = document.getElementById("cite");
    cite.appendChild(document.createTextNode("-"));

    const citeTitle = document.createElement("span");
    citeTitle.className = "title";
    citeTitle.innerText = quoteData.title;

    const citeAuthor = document.createElement("span");
    citeAuthor.className = "author";
    citeAuthor.innerText = quoteData.author;

    const container = quoteData.gutenbergReference
        ? document.createElement("a")
        : document.createDocumentFragment();

    if (quoteData.gutenbergReference) {
        container.href = `https://www.gutenberg.org/ebooks/${quoteData.gutenbergReference}`;
    }

    container.appendChild(citeTitle);
    container.appendChild(document.createTextNode(","));
    container.appendChild(citeAuthor);

    cite.appendChild(container);
}

const quoteFragments = (quote, node) => {
    quote.split("\n").forEach((value, index, array) => {
        node.appendChild(document.createTextNode(value));
        if (array.length - 1 !== index || quote.endsWith("\n")) {
            node.appendChild(document.createElement("br"));
        }
    });
};

window.addEventListener("load", init);
