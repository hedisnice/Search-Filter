// ดึงองค์ประกอบ DOM
const resultElement = document.getElementById("result");
const filterElement = document.getElementById("filter");
const countryList = [];

// ตัวฟังก์ชันสำหรับการฟิลเตอร์ข้อมูล
filterElement.addEventListener("input", (event) => {
  // แปลงค่า input เป็นตัวพิมพ์เล็กสำหรับการเปรียบเทียบแบบ case-insensitive
  const search = event.target.value.toLowerCase();

  // วนลูปผ่านทุกรายการประเทศ
  countryList.forEach((countryItem) => {
    // ตรวจสอบว่าชื่อประเทศมีคำที่ต้องการหรือไม่
    const isMatch = countryItem.innerText.toLowerCase().includes(search);

    // เปลี่ยนสถานะคลาส 'hide' ตามผลลัพธ์การค้นหา
    countryItem.classList.toggle("hide", !isMatch);
  });
});

// ดึงข้อมูลจาก API
async function fetchData() {
  try {
    const url = "https://restcountries.com/v2/all";
    const response = await fetch(url);
    const countriesData = await response.json();

    // ลบเนื้อหาก่อนหน้า
    resultElement.innerHTML = "";

    // วนลูปผ่านข้อมูลประเทศและสร้างรายการ
    countriesData.forEach((countryData) => {
      const listItem = createCountryListItem(countryData);
      countryList.push(listItem);
      resultElement.appendChild(listItem);
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
  }
}

// ฟังก์ชันช่วยสร้างรายการสำหรับประเทศ
function createCountryListItem(data) {
  const listItem = document.createElement("li");

  // ตั้งค่า inner HTML สำหรับรายการ
  listItem.innerHTML = `
        <img src="${data.flag}">
        <div class="info">
            <h4>${data.name}</h4>
            <p>${formatNumber(data.population)}</p>
        </div>
    `;

  return listItem;
}

// ฟังก์ชันช่วยในการจัดรูปแบบตัวเลขด้วยเครื่องหมายจุลภาค
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// ดึงข้อมูลเมื่อโหลดหน้า
fetchData();
