let excelData = [];

fetch('list.xlsx')
  .then(res => res.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    excelData = XLSX.utils.sheet_to_json(sheet);
  })
  .catch(err => {
    document.getElementById('statusBox').textContent = '❌ خطا در بارگذاری فایل اکسل';
    console.error(err);
  });

function liveSearch() {
  const input = document.getElementById('searchInput').value.trim();
  const suggestions = document.getElementById('suggestions');
  const statusBox = document.getElementById('statusBox');
  suggestions.innerHTML = '';
  statusBox.textContent = '';

  if (!input) return;

  const matches = excelData.filter(row =>
    row["نام پایگاه"]?.toLowerCase().includes(input.toLowerCase())
  );

  matches.forEach(row => {
    const li = document.createElement('li');
    li.textContent = row["نام پایگاه"];
    li.onclick = () => {
      document.getElementById('searchInput').value = row["نام پایگاه"];
      suggestions.innerHTML = '';
      statusBox.textContent = `وضعیت "${row["نام پایگاه"]}": ${row["وضعیت"] || "نامشخص"}`;
    };
    suggestions.appendChild(li);
  });
}

function clearInput() {
  document.getElementById('searchInput').value = '';
  document.getElementById('suggestions').innerHTML = '';
  document.getElementById('statusBox').textContent = '';
}
