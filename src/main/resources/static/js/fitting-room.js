let selectedItems = [];
const mockItems = [
    { id: 1, name: "Áo Nhật Bình Đỏ", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200" },
    { id: 2, name: "Áo Ngũ Thân Tay Chẽn", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200" },
    { id: 3, name: "Quần Lụa Trắng", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200" },
    { id: 4, name: "Guốc Mộc Sài Gòn", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("wardrobe-items-list");
    if (!grid) return;
    grid.innerHTML = mockItems.map(item => `
        <div class="item-card" onclick="toggleItem(${item.id}, this)">
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        </div>
    `).join("");
});

function toggleItem(id, el) {
    const item = mockItems.find(i => i.id === id);
    const idx = selectedItems.findIndex(i => i.id === id);
    if (idx > -1) { selectedItems.splice(idx, 1); el.classList.remove("selected"); }
    else { selectedItems.push(item); el.classList.add("selected"); }
    
    document.getElementById("selected-tags").innerHTML = selectedItems.length ? 
        selectedItems.map(i => `<span class="tag-badge">${i.name}</span>`).join("") :
        '<span style="color:#888; font-size:12px;">Chưa chọn món nào...</span>';
}

function submitToAI() {
    if (!selectedItems.length) return alert("Vui lòng chọn ít nhất 1 món đồ!");
    const card = document.getElementById("ai-card");
    const fb = document.getElementById("ai-feedback");
    card.style.display = "block";
    fb.innerHTML = "⏳ <i>AI Gatekeeper đang chấm điểm...</i>";

    fetch("http://localhost:8080/api/v1/check-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemIds: selectedItems.map(i=>i.name), event: document.getElementById("event-input").value })
    })
    .then(r => r.json())
    .then(data => {
        fb.innerHTML = data.feedback.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        if(!data.feedback.includes("KHÔNG DUYỆT")) document.getElementById("btn-pub").style.display = "block";
    })
    .catch(e => fb.innerHTML = "❌ Error: " + e.message);
}

function publishPost() {
    alert("🎉 Đã đăng bài lên Pinterest Social Feed!");
    window.location.href = "../index.html";
}
