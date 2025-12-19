let currentMethod = "";

const methodData = {
    'iteratsiya': { title: "Iteratsiya usuli", formula: "$$x_{k+1} = \\phi(x_k)$$. $n$ ta qadamni kiriting:" },
    'zeydel': { title: "Zeydel usuli", formula: "$$Ax = b$$ sistemasini yechish. Koeffitsientlarni kiriting:" },
    'nyuton': { title: "Nyuton usuli", formula: "$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$" },
    'lagranj': { title: "Lagranj interpolyatsiyasi", formula: "$$L_n(x) = \\sum y_i l_i(x)$$" },
    // Qolgan metodlar ham shu yerda davom etadi...
};

function showMethod(key) {
    currentMethod = key;
    document.getElementById('workspace').style.display = "block";
    document.getElementById('m-title').innerText = methodData[key].title;
    document.getElementById('m-formula').innerHTML = methodData[key].formula;
    
    // MathJaxni yangilash (formulani chiroyli chiqarish uchun)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "m-formula"]);
    generateInputs(); // Tugmalarni avtomatik yaratish
}

function generateInputs() {
    const n = document.getElementById('n-value').value;
    const container = document.getElementById('dynamic-inputs');
    container.innerHTML = ""; // Tozalash

    for (let i = 1; i <= n; i++) {
        // Har bir koeffitsient uchun tugmasimon input yaratish
        let div = document.createElement('div');
        div.className = "input-group";
        
        // Agar Zeydel bo'lsa a va b larni chiqaradi, aks holda x larni
        let labelText = currentMethod === 'zeydel' ? a${i}= : x${i}=;
        
        div.innerHTML = <label>${labelText}</label><input type="number" id="inp-${i}" placeholder="Qiymat">;
        container.appendChild(div);
    }
}

// Hisoblash tugmasi bosilganda
document.getElementById('calc-btn').onclick = function() {
    const n = document.getElementById('n-value').value;
    let values = [];
    for (let i = 1; i <= n; i++) {
        values.push(parseFloat(document.getElementById(`inp-${i}`).value) || 0);
    }

    let result = 0;
    // Misol uchun: barcha kiritilgan sonlar yig'indisini hisoblash
    // Bu yerga har bir formula uchun alohida algoritm yoziladi
    if (currentMethod === 'iteratsiya') {
        result = values.reduce((a, b) => a + b, 0); // Shunchaki misol
    } else if (currentMethod === 'nyuton') {
        result = Math.max(...values); // Eng kattasini topish misoli
    }

    document.getElementById('result').innerText = "Natija: " + result.toFixed(4);
};
