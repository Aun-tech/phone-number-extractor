const phoneRegex = /(?:\+92|0092|0)?3\d{2}[- ]?\d{7}\b/g;
    const fileInput = document.getElementById("fileInput");
    const inputText = document.getElementById("inputText");
    const extractBtn = document.getElementById("extractBtn");
    const copyBtn = document.getElementById("copyBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsList = document.getElementById("resultsList");
    const statsDisplay = document.getElementById("statsDisplay");
    const themeToggle = document.getElementById("themeToggle");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const clearTextBtn = document.getElementById("clearTextBtn");
    let extractedNumbers = [];

    const showToast = (msg, color = "#007bff") => {
      Toastify({ text: msg, duration: 3000, close: true, gravity: "top", position: "right", backgroundColor: color }).showToast();
    };

    const displayResults = (numbers) => {
      resultsList.innerHTML = "";
      const countMap = {};
      numbers.forEach(num => countMap[num] = (countMap[num] || 0) + 1);

      const uniqueNumbers = [...new Set(numbers)];

      uniqueNumbers.forEach(num => {
        const li = document.createElement("li");
        const count = countMap[num];
        li.textContent = num;
        if (count > 1) {
          li.classList.add("duplicate");
          const badge = document.createElement("span");
          badge.textContent = `${count}x`;
          badge.style.color = "#dc3545";
          li.appendChild(badge);
        }
        li.onclick = () => navigator.clipboard.writeText(num).then(() => showToast(`📋 Copied ${num}`));
        resultsList.appendChild(li);
      });
    };

    const updateStats = () => statsDisplay.textContent = `${[...new Set(extractedNumbers)].length} unique / ${extractedNumbers.length} total number(s)`;

    const extractNumbers = () => {
      const matchesRaw = inputText.value.match(phoneRegex) || [];
      const cleaned = matchesRaw.map(num => num.replace(/[- ]/g, ""));
      extractedNumbers = cleaned;
      displayResults(cleaned);
      updateStats();
      showToast("📞 Extraction complete");
    };

    const copyAll = () => {
      const unique = [...new Set(extractedNumbers)];
      if (!unique.length) return showToast("Nothing to copy", "#dc3545");
      const formatted = unique.join("\n");
      navigator.clipboard.writeText(formatted).then(() => showToast("📋 Copied all!"));
    };

    const exportData = (format) => {
      const unique = [...new Set(extractedNumbers)];
      if (!unique.length) return showToast("Nothing to export", "#dc3545");

      const filename = `pakistani_numbers.${format}`;
      if (format === "csv" || format === "txt") {
        const blob = new Blob(["Phone Number\n" + unique.join("\n")], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } else if (format === "xlsx") {
        const worksheet = XLSX.utils.aoa_to_sheet([["Phone Number"], ...unique.map(num => [num])]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Numbers");
        XLSX.writeFile(workbook, filename);
      } else if (format === "pdf") {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        unique.forEach((num, i) => doc.text(num, 10, 10 + i * 10));
        doc.save(filename);
      }
      showToast(`⬇️ Downloaded ${format.toUpperCase()}`);
    };

    const filterResults = () => {
      const q = searchInput.value.toLowerCase();
      displayResults(extractedNumbers.filter(num => num.includes(q)));
    };

    const toggleTheme = () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");

    extractBtn.onclick = extractNumbers;
    copyBtn.onclick = copyAll;
    searchInput.oninput = filterResults;
    themeToggle.onclick = toggleTheme;
    scrollTopBtn.onclick = scrollToTop;
    clearTextBtn.onclick = () => inputText.value = "";

    fileInput.onchange = e => {
      const reader = new FileReader();
      reader.onload = () => inputText.value = reader.result;
      reader.readAsText(e.target.files[0]);
    };
    const filterDuplicatesBtn = document.getElementById("filterDuplicatesBtn");

filterDuplicatesBtn.onclick = () => {
  if (!extractedNumbers.length) return showToast("Nothing to filter", "#dc3545");

  const countMap = {};
  extractedNumbers.forEach(num => {
    countMap[num] = (countMap[num] || 0) + 1;
  });

  const duplicates = extractedNumbers.filter(num => countMap[num] > 1);
  const uniqueDuplicates = [...new Set(duplicates)];

  if (uniqueDuplicates.length === 0) {
    showToast("No duplicates found", "#28a745");
  } else {
    const countMap = {};
extractedNumbers.forEach(num => {
  countMap[num] = (countMap[num] || 0) + 1;
});

const duplicates = extractedNumbers.filter(num => countMap[num] > 1);
const uniqueDuplicates = [...new Set(duplicates)];

if (uniqueDuplicates.length === 0) {
  showToast("No duplicates found", "#28a745");
} else {
  displayResultsWithCount(uniqueDuplicates, countMap);
  statsDisplay.textContent = `${uniqueDuplicates.length} duplicate number(s)`;
  showToast("🔁 Showing duplicates only");
}
    statsDisplay.textContent = `${uniqueDuplicates.length} duplicate number(s)`;
    showToast("🔁 Showing duplicates only");
  }
};
    const displayResultsWithCount = (numbers, countMap) => {
  resultsList.innerHTML = "";
  numbers.forEach(num => {
    const li = document.createElement("li");
    const count = countMap[num];
    li.textContent = num;
    if (count > 1) {
      li.classList.add("duplicate");
      const badge = document.createElement("span");
      badge.textContent = `${count}x`;
      badge.style.color = "#dc3545";
      li.appendChild(badge);
    }
    li.onclick = () => navigator.clipboard.writeText(num).then(() => showToast(`📋 Copied ${num}`));
    resultsList.appendChild(li);
  });
};
