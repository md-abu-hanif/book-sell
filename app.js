const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}
const toggleData = displayStyle => {
  document.getElementById('data-store').style.display = displayStyle;
}
const toggleSearch = displayStyle => {
  document.getElementById('total').style.display = displayStyle;
}
const toggleError = displayStyle => {
  document.getElementById('error').style.display = displayStyle;
}

toggleError('none');
const searchBtn = () => {
  const input = document.getElementById('input');
  const inputText = input.value;

  toggleSpinner('block');
  toggleData('none');
  toggleSearch('none');
  input.value = '';




  const url = `https://openlibrary.org/search.json?q=${inputText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayData(data));
}

// const totalFound = data.numFound;



const displayData = (data) => {
  const books = data.docs;

  const totalFound = (data.numFound);
  console.log(totalFound);
  // data.numFound ? found = totalFound: '' ;
  document.getElementById('total').innerHTML = `<h2>Total search Found : ${totalFound}</h2>`
  const display = document.getElementById('data-store');
  display.textContent = '';

  if (totalFound !== 0) {

    books.forEach(book => {
      console.log(book);
      toggleError('none');
      toggleSpinner('none');
      toggleData('flex');
      toggleSearch('block');
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="col text-center shadow-lg p-3 mb-5 bg-white rounded">
        <div id="card" class="card h-100">
          <img width="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="rounded mx-auto d-block mt-3" alt="...">
          <div class="card-body">
            <h2>Books:<span id="book-name">${book.title}</span></h2>
            <h4>Author: <span id="author-name">${book.author_name}</span></h4> 
            <h6 class="fw-normal">Publisher:<span id="publisher-name">${book.publisher}</span></h6>
            <h6>Publishing Date:${book.first_publish_year}</h6>
          </div>
        </div>
      </div> `
      display.appendChild(div);
    });
  }
  else {
    toggleError('block');
    toggleSpinner('none');

  }



}
