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

    const url = new URL(
        `./quotes/${time}.json`,
        window.location.origin + window.location.pathname,
    );
    const quoteData = await fetch(url)
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

    const citeContent = document.createElement(
        quoteData.gutenbergReference ? "a" : "span",
    );
    if (quoteData.gutenbergReference) {
        citeContent.href = `https://www.gutenberg.org/ebooks/${quoteData.gutenbergReference}`;
        citeContent.target = "_blank";
        citeContent.rel = "noopener";
    }
    citeContent.append(citeTitle, ", ", citeAuthor);
    cite.appendChild(citeContent);
}

function appendTextFragments(text, node) {
    text.split("\n").forEach((line, index, array) => {
        node.appendChild(document.createTextNode(line));
        if (index < array.length - 1 || text.endsWith("\n")) {
            node.appendChild(document.createElement("br"));
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
