// @ts-check
// --- elements
const elt_createnew = /** @type {HTMLButtonElement} */ (
    document.getElementById("createnew")
);
const elt_bingo = /** @type {HTMLTableElement} */ (
    document.getElementById("bingo")
);
const elt_craateddate = /** @type {HTMLOutputElement} */ (
    document.getElementById("createddate")
);
const elt_changewords = /** @type {HTMLButtonElement} */ (
    document.getElementById("changewords")
);
const elt_wordcount = /** @type {HTMLOutputElement} */ (
    document.getElementById("wordcount")
);
const elt_words = /** @type {HTMLTextAreaElement} */ (
    document.getElementById("words")
);
const elt_savewords = /** @type {HTMLButtonElement} */ (
    document.getElementById("savewords")
);
const elt_editwords = /** @type {HTMLDialogElement} */ (
    document.getElementById("editwords")
);
// --- globals
/**
 * Words in a pool
 * @type {string[]}
 */
let words = [];
/**
 * Bingo table
 * length - 25
 * @type {string[] | null}
 */
let bingo = null;
/**
 * Time of creation of bingo table
 * @type {Date | null}
 */
let created = null;
/**
 * Bingo checked boxes
 * length - 25
 * @type {boolean[] | null}
 */
let checked = null;
// --- functions
const update_display = () => {
    elt_wordcount.innerText = words.length.toString();
    elt_craateddate.innerText =
        created === null ? "..." : created.toISOString();
    elt_words.value = words.join("\n");
    elt_bingo.innerHTML = "";
    if (bingo !== null) {
        for (let i = 0; i < 5; i++) {
            const row = document.createElement("tr");
            for (let j = i * 5; j < (i + 1) * 5; j++) {
                const cell = document.createElement("td");
                cell.innerText = bingo[j];
                if (checked !== null && checked[j])
                    cell.classList.add("checked");
                else cell.classList.remove("checked");
                cell.addEventListener("click", (e) => {
                    if (checked === null) return;
                    checked[j] = !checked[j];
                    if (checked[j]) cell.classList.add("checked");
                    else cell.classList.remove("checked");
                });
                row.appendChild(cell);
            }
            elt_bingo.appendChild(row);
        }
    }
};
const create_bingo = () => {
    const left_words = [...words];
    const new_bingo = Array(25);
    for (let i = 0; i < new_bingo.length; i++) {
        const idx = Math.round(Math.random() * (left_words.length - 1));
        new_bingo[i] = left_words.splice(idx, 1)[0];
    }
    bingo = new_bingo;
    checked = Array(25).fill(false);
    created = new Date();
};
// --- listeners
elt_createnew.addEventListener("click", (e) => {
    if (words.length < 25) return alert("Should have at least 25 words!");
    if (!confirm("Create new?")) return;
    create_bingo();
    update_display();
});
elt_changewords.addEventListener("click", (e) => {
    elt_editwords.showModal();
});
elt_savewords.addEventListener("click", (e) => {
    const new_words = [];
    for (let w of elt_words.value.split("\n")) {
        w = w.trim();
        if (!w) continue;
        new_words.push(w);
    }
    words = new_words;
    elt_editwords.close();
    update_display();
});
// --- start
// test words
words = [
    "abba",
    "abba",
    "abba",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "baab",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
    "abba",
];
update_display();
