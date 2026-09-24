let selectedItems = [];

// 1. Tải danh sách đồ từ items.json
document.addEventListener("DOMContentLoaded", () => {
    fetch('/data/items.json')
        .then(res => res.json())
        .then(data => renderItems(data))
        .catch(err => console.error("Lỗi nạp danh sách đồ:", err));
});

function renderItems(items) {
    const container = document.getElementById('items-list');
    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        `;
        div.onclick = () => toggleSelectItem(item.name, div);
        container.appendChild(div);
    });
}

function toggleSelectItem(itemName, element) {
    if (selectedItems.includes(itemName)) {
        selectedItems = selectedItems.filter(i => i !== itemName);
        element.classList.remove('selected');
    } else {
        selectedItems.push(itemName);
        element.classList.add('selected');
    }
}

// 2. Gọi API Backend Spring Boot
function checkOutfitWithAI() {
    const event = document.getElementById('event-input').value.trim();
    const resultBox = document.getElementById('ai-result');
    const feedbackText = document.getElementById('ai-feedback-text');

    if (selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất 1 món đồ trong Tủ đồ!");
        return;
    }

    resultBox.style.display = 'block';
    feedbackText.innerText = "⏳ AI đang kiểm tra quy tắc văn hóa...";

    fetch('http://localhost:8080/api/v1/check-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            itemIds: selectedItems,
            event: event || 'Dạo phố'
        })
    })
    .then(res => res.json())
    .then(data => {
        feedbackText.innerText = data.feedback;
    })
    .catch(err => {
        feedbackText.innerText = "❌ Lỗi kết nối Backend: " + err.message;
    });
}