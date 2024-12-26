document.getElementById("data-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById("response-message").textContent = result.message;
});

document.getElementById("download-data").addEventListener("click", async () => {
    const response = await fetch("/download");
    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "data.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }
});
