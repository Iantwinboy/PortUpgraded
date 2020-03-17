const characters = [];
const rootURL = 'https://swapi.co/api/people/?page=';

for(let i = 1; i < 10; i++){
  let url = rootURL + i.toString();
  fetch(url)
    .then(blob => blob.json())
    .then(data => characters.push(...data.results))
}

function searchCharacters(input, characters) {
  return characters.filter(character => {
    const regexInput = new RegExp(input, 'gi');
    return character.name.match(regexInput) || character.gender.match(regexInput)
  });
}

function showCharacters() {
  const matchInput = searchCharacters(this.value, characters);
  const element = matchInput.map(character => {
    const listItem = `<li><p>${character.name}, ${character.gender}, ${character.height}cm</p></li>`
    return listItem;
  }).join('');
  charactersList.innerHTML = element;
}

const input = document.querySelector('.search');
const charactersList = document.querySelector('.characters');
input.addEventListener('keyup', showCharacters);
input.addEventListener('change', showCharacters);