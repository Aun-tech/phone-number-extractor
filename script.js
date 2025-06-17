function extractNumbers() {
  const text = document.getElementById("inputText").value;
  const phoneRegex = /(\+92|0)?3[0-9]{9}/g;
  const matches = [...text.matchAll(phoneRegex)].map(m => m[0]);

  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";

  const seen = {};
  matches.forEach(number => {
    let display = number;
    if (seen[number]) {
      display += " (duplicate)";
    } else {
      seen[number] = true;
    }
    const li = document.createElement("li");
    li.textContent = display;
    resultsList.appendChild(li);
  });
}

function extractNumbers() {
  const text = document.getElementById("inputText").value;
  const phoneRegex = /(\+92|0)?3[0-9]{9}/g;
  const matches = [...text.matchAll(phoneRegex)].map(m => m[0]);

  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";

  const seen = {};
  matches.forEach(number => {
    let display = number;
    if (seen[number]) {
      display += " (duplicate)";
    } else {
      seen[number] = true;
    }
    const li = document.createElement("li");
    li.textContent = display;
    resultsList.appendChild(li);
  });
}

function copyToClipboard() {
  const listItems = document.querySelectorAll("#resultsList li");
  const numbersText = Array.from(listItems).map(item => item.textContent).join('\n');

  navigator.clipboard.writeText(numbersText).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    alert("Failed to copy: " + err);
  });
}
