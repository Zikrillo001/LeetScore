const students = [
    { name: "Tukhtamishhoji-zoda Muhammad Nur Islom", solved: "unknown", account_name: "jdu211171", account_link: "https://leetcode.com/u/jdu211171/" },
    { name: "Azimxo'jayev Abdulazizxo'ja", solved: "unknown", account_name: "Kho_ja", account_link: "https://leetcode.com/u/Kho_ja/"},
    { name: "Ismoilova Soliha", solved: "unknown", account_name: "Ismoilova1031", account_link: "https://leetcode.com/u/Ismoilova1031/"},
    { name: "Kozokjonov Khushnudbek", solved: "unknown", account_name: "edSJVRbEh6", account_link: "https://leetcode.com/u/edSJVRbEh6/" },
    {name: "Pardayev Otabek", solved: "unknown", account_name: "pardayevotabek30gmailcom", account_link: "https://leetcode.com/u/pardayevotabek30gmailcom/" },
    {name: "Abdulaziz Yunusov", solved: "unknown", account_name: "ayunusov238", account_link: "https://leetcode.com/u/ayunusov238/" },
    {name: "Xamidjonov Fazliddin", solved: "unknown", account_name: "Fazliddin_001", account_link: "https://leetcode.com/u/Fazliddin_001/" },
    {name: "Amrullayev Nurbek", solved: "unknown", account_name: "Amrullayev", account_link: "https://leetcode.com/u/Amrullayev/" },
    {name: "Pulatov Abdufattoh", solved: "unknown", account_name: "abdufattohcoder2004", account_link: "https://leetcode.com/u/abdufattohcoder2004/" },
    {name: "Tillayev Xusniddin", solved: "unknown", account_name: "MrPyDeveloper", account_link: "https://leetcode.com/u/MrPyDeveloper/" },
    {name: "Farmonov Javohir", solved: "unknown", account_name: "javohir07", account_link: "https://leetcode.com/u/javohir07/"},
    {name: "Otajonov Muhammadali", solved: "unknown", account_name: "otajonovmuhammadali", account_link: "https://leetcode.com/u/otajonovmuhammadali/" },
    {name: "Shavkatov Bahodir", solved: "unknown", account_name: "agadev", account_link: "https://leetcode.com/u/agadev/" },
    {name: "Muzaffar Xusanov", solved: "unknown", account_name: "muza_Sano", account_link: "https://leetcode.com/u/muza_Sano/" },
    {name: "Farrux Shavkatov", solved: "unknown", account_name: "yamamoto05", account_link: "https://leetcode.com/u/yamamoto05/" },
    {name: "Ibroximov Diyorbek", solved: "unknown", account_name: "Ibroximov_Diyorbek", account_link: "https://leetcode.com/u/Ibroximov_Diyorbek/" },
    {name: "Sardor Olimjonov", solved: "unknown", account_name: "Daydi", account_link: "https://leetcode.com/u/Daydi/" },
];

// Talabalar ro'yxatini yuklash
async function loadResults() {
    const tableBody = document.getElementById("resultsBody");

    // Har bir talabani jadvalga qo'shish
    students.forEach(async (student) => {
        const row = document.createElement("tr");

        // Student name bilan link yaratamiz
        const nameCell = document.createElement("td");
        const nameLink = document.createElement("a");
        nameLink.textContent = student.name;
        nameLink.href = `student_profile.html?account_name=${student.account_name}`;
        nameLink.target = "_self";
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        // Solved Problems cell
        const solvedCell = document.createElement("td");
        solvedCell.textContent = "Loading..."; // Default qiymat
        row.appendChild(solvedCell);

        // Score cell
        const scoreCell = document.createElement("td");
        scoreCell.textContent = student.score || "N/A";
        row.appendChild(scoreCell);

        // Link cell with emoji
        const linkCell = document.createElement("td");
        const linkIcon = document.createElement("a");
        linkIcon.textContent = "🔗";
        linkIcon.href = student.account_link;
        linkIcon.target = "_self";
        linkCell.appendChild(linkIcon);
        row.appendChild(linkCell);

        tableBody.appendChild(row);

        // APIdan `totalSolved` qiymatini olish
        try {
            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${student.account_name}`);
            const data = await response.json();
            solvedCell.textContent = data.totalSolved || 0; // APIdan kelgan `totalSolved` qiymatini ko'rsatish
        } catch (error) {
            console.error(`Error loading data for ${student.account_name}:`, error);
            solvedCell.textContent = "N/A"; // Error bo'lsa, N/A ko'rsatamiz
        }
    });
}

// Talabaning profil sahifasini yuklash
async function loadStudentProfile() {
    // URL'dan account_name ni olish
    const urlParams = new URLSearchParams(window.location.search);
    const accountName = urlParams.get("account_name");

    // Agar account_name mavjud bo'lmasa, sahifani yuklamaslik
    if (!accountName) {
        document.body.innerHTML = "<h2>Error: Student profile not found</h2>";
        return;
    }

    try {
        // API orqali ma'lumotlarni olish
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${accountName}`);
        const data = await response.json();

        // API ma'lumotlarini sahifaga yuklash
        document.querySelector(".container h2").textContent = `${accountName} - LeetCode Performance`;
        document.querySelector(".stats").innerHTML = `
            <div>Total Solved: ${data.totalSolved}</div>
            <div>Easy Solved: ${data.easySolved}</div>
            <div>Medium Solved: ${data.mediumSolved}</div>
            <div>Hard Solved: ${data.hardSolved}</div>
        `;

        // Recent submissions jadvalini to'ldirish
        const submissionsBody = document.getElementById("submissionsBody");
        data.recentSubmissions.forEach(submission => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${submission.title}</td>
                <td>${submission.difficulty}</td>
                <td>${submission.lang}</td>
            `;
            submissionsBody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load student data:", error);
        document.body.innerHTML = "<h2>Error: Failed to load student profile</h2>";
    }
}

// Sahifa yuklanganda funksiyani chaqirish
if (document.getElementById("resultsBody")) {
    // Bu kod faqat index.html uchun ishlaydi
    window.onload = loadResults;
} else {
    // Bu kod faqat student_profile.html uchun ishlaydi
    window.onload = loadStudentProfile;
}
