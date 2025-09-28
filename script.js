function searchWord() {
    const word = document.getElementById('wordInput').value.trim();
    const resultDiv = document.getElementById('result');
    if (!word) {
        resultDiv.innerHTML = '<span style="color:red">Please enter a word.</span>';
        return;
    }
    resultDiv.innerHTML = 'Searching...';
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions Found") {
                resultDiv.innerHTML = 'No definition found.';
            } else {
                const meanings = data[0].meanings.map(m => `<b>${m.partOfSpeech}</b>: ${m.definitions[0].definition}`).join('<br>');
                resultDiv.innerHTML = `<h3>${data[0].word}</h3>${meanings}`;
            }
        })
        .catch(() => {
            resultDiv.innerHTML = 'Error fetching definition.';
        });
}
