// ===============================
// HAUL AL ALBAB 2026
// script.js
// ===============================

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUevr_f41TuL8iWfUjWvhdAIHISl_sT5QmIuBi_s9J4FPkn73e1cK2HgzMuiixxs5LTLZjctkFvpP/pub?gid=0&single=true&output=csv";

async function loadDonatur() {

    try {

        const response = await fetch(CSV_URL);

        const csv = await response.text();

        const rows = csv.trim().split("\n").slice(1);

        const tbody = document.getElementById("donaturTable");

        const totalElement = document.getElementById("totalDonasi");

        tbody.innerHTML = "";

        let total = 0;

        rows.forEach((row, index) => {

            const cols = row.split(",");

            const nama = cols[0] || "";
            const domisili = cols[1] || "";
            const nominal = parseInt((cols[2] || "0").replace(/[^0-9]/g,"")) || 0;
            const metode = cols[3] || "";

            total += nominal;

            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${nama}</td>
                    <td>${domisili}</td>
                    <td>
                        Rp${nominal.toLocaleString("id-ID")}
                        ${metode ? "<br><small>(" + metode + ")</small>" : ""}
                    </td>
                </tr>
            `;

        });

        totalElement.innerHTML =
            "Rp" + total.toLocaleString("id-ID");

    }

    catch(error){

        console.log(error);

        document.getElementById("donaturTable").innerHTML =
        `<tr>
            <td colspan="4">
                Gagal mengambil data Google Sheets.
            </td>
        </tr>`;

    }

}

loadDonatur();
