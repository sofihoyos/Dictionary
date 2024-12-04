import { dictionary } from './dictionary.js';

// Función para traducir palabras
document.querySelector('.translate-button').addEventListener('click', () => {
    const wordInput = document.querySelector('#word').value.trim().toLowerCase();
    const isEnglish = document.querySelector('#english').checked;
    const isSpanish = document.querySelector('#espanol').checked;
    const responseDiv = document.querySelector('.response');

    if (!isEnglish && !isSpanish) {
        responseDiv.innerHTML = `<p>Por favor, selecciona un idioma.</p>`;
        return;
    }

    let translation = null;
    Object.values(dictionary.categories).forEach(category => {
        if (isEnglish) {
            const word = category.find(item => item.spanish.toLowerCase() === wordInput);
            if (word) translation = word.english;
        } else if (isSpanish) {
            const word = category.find(item => item.english.toLowerCase() === wordInput);
            if (word) translation = word.spanish;
        }
    });

    responseDiv.innerHTML = translation ? `<p>${translation}</p>` : `<p>Palabra no encontrada.</p>`;
});


// Agregar nuevas palabras
document.querySelector('.new-word-button').addEventListener('click', (event) => {
    event.preventDefault();

    const wordEnglish = document.querySelector('#word-english').value.trim();
    const wordSpanish = document.querySelector('#word-spanish').value.trim();
    const wordExample = document.querySelector('#example').value.trim();
    const selectedCategory = document.querySelector('input[name="category-select"]:checked')?.value;

    const responseDiv = document.querySelector('.response');

    if (!wordEnglish || !wordSpanish || !wordExample || !selectedCategory) {
        responseDiv.innerHTML = `<p>Por favor, completa todos los campos.</p>`;
        return;
    }

    const newWord = {
        id: dictionary.categories[selectedCategory].length + 1,
        english: wordEnglish,
        spanish: wordSpanish,
        example: wordExample,
    };

    dictionary.categories[selectedCategory].push(newWord);

    const sortedWords = [...dictionary.categories[selectedCategory]].sort((a, b) =>
        a.spanish.localeCompare(b.spanish, 'es', { sensitivity: 'base' })
    );

    const wordList = sortedWords
        .map(word => `<li>${word.spanish} - ${word.english}: <em>${word.example}</em></li>`)
        .join('');
    document.querySelector('.word-list').innerHTML = `<ul>${wordList}</ul>`;

    responseDiv.innerHTML = `<p>¡Palabra agregada con éxito!</p>`;

    document.querySelector('#word-english').value = '';
    document.querySelector('#word-spanish').value = '';
    document.querySelector('#example').value = '';
    document.querySelectorAll('input[name="category-select"]').forEach(input => input.checked = false);
});
