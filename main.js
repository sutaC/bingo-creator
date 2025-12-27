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
// --- globals
/**
 * Words in a pool
 * @type {string[]}
 */
let words = [];
/**
 * Bingo table
 * len - 25
 * @type {string[]}
 */
let bingo = Array(25);
/**
 * Time of creation of bingo table
 * - null = none
 * - Date = time
 * @type {Date | null}
 */
let created = null;
// --- functions
const update_display = () => {
    elt_wordcount.innerText = words.length.toString();
    elt_craateddate.innerText =
        created === null ? "..." : created.toISOString();
    // fills bingo table
    elt_bingo.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("tr");
        for (let j = i * 5; j < (i + 1) * 5; j++) {
            const cell = document.createElement("td");
            cell.innerText = bingo[j];
            row.appendChild(cell);
        }
        elt_bingo.appendChild(row);
    }
};
const create_bingo = () => {
    const left_words = [...words];
    const new_bingo = Array(25);
    for (let i = 0; i < new_bingo.length; i++) {
        const idx = Math.floor(Math.random() * (left_words.length - 1));
        new_bingo[i] = left_words.splice(idx, 1)[0];
    }
    bingo = new_bingo;
    created = new Date();
};
// --- bindings
elt_createnew.addEventListener("click", (e) => {
    if (words.length < 25) return alert("Should have at least 25 words!");
    if (!confirm("Create new?")) return;
    create_bingo();
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
create_bingo();
update_display();
