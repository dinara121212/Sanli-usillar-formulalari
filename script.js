const formulasData = [
    {
        name: "Iteratsiya usuli",
        formula: "x_{n+1} = g(x_n)",
        info: "Foydalanuvchi boshlang'ich qiymat x0 va kerakli n sonini kiritsin.",
        compute: (values) => {
            let x = values[0];
            for(let i = 1; i < values.length; i++){
                x = Math.sqrt(values[i] + x); // misol g(x) = sqrt(x + x_n)
            }
            return x.toFixed(4);
        }
    },
    {
        name: "Zeydel usuli",
        formula: "x_{n+1} = (b - c y_n)/a, \\; y_{n+1} = (e - f x_{n+1})/d",
        info: "Foydalanuvchi a,b,c,d,e,f ni kiritsin. Misol uchun ikki tenglama sistemi uchun.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Nyuton usuli",
        formula: "x_{n+1} = x_n - f(x_n)/f'(x_n)",
        info: "Foydalanuvchi boshlang'ich x0 va n ni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Xordalar usuli",
        formula: "x_{n+1} = x_n - f(x_n)(x_n - x_{n-1})/(f(x_n) - f(x_{n-1}))",
        info: "Foydalanuvchi x0, x1 va n ni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Bolcano-Koshi usuli",
        formula: "y_{n+1} = y_n + h f(x_n + h/2, y_n + h/2 f(x_n, y_n))",
        info: "Foydalanuvchi x0,y0,h,n ni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Lagranj interpolatsiyaviy formulasi",
        formula: "L(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}",
        info: "Foydalanuvchi x_i va y_i qiymatlarni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Trapetsiya usuli",
        formula: "\\int_a^b f(x) dx \\approx \\frac{h}{2}[f(a) + 2\\sum f(x_i) + f(b)]",
        info: "Foydalanuvchi f(x_i) qiymatlarni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Simpson usuli",
        formula: "\\int_a^b f(x) dx \\approx \\frac{h}{3}[f(x_0)+4\\sum f(x_{odd})+2\\sum f(x_{even})+f(x_n)]",
        info: "Foydalanuvchi f(x_i) qiymatlarni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Galerkin usuli",
        formula: "\\int_\\Omega R(u) v_i dx = 0, i = 1,...,n",
        info: "Foydalanuvchi R(u) va v_i qiymatlarni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    },
    {
        name: "Eyler usuli",
        formula: "y_{n+1} = y_n + h f(x_n, y_n)",
        info: "Foydalanuvchi x0,y0,h,n ni kiritsin.",
        compute: (values) => "Natija faqat misol ko‘rsatiladi."
    }
];

const container = document.getElementById("formulasContainer");

formulasData.forEach((f, idx) => {
    const block = document.createElement("div");
    block.classList.add("formulaBlock");

    block.innerHTML = `
        <h2>${f.name}</h2>
        <p id="formula${idx}">$$${f.formula}$$</p>
        <button id="infoBtn${idx}">Nimalar kiritilishi kerak?</button>
        <br><br>
        <label for="nInput${idx}">n ni kiriting:</label>
        <input type="number" id="nInput${idx}" min="1" value="2">
        <button id="genBtn${idx}">Inputlarni yaratish</button>
        <div id="inputs${idx}"></div>
        <button id="computeBtn${idx}">Hisoblash</button>
        <p id="result${idx}"></p>
    `;

    container.appendChild(block);

    const infoBtn = document.getElementById(`infoBtn${idx}`);
    const genBtn = document.getElementById(`genBtn${idx}`);
    const computeBtn = document.getElementById(`computeBtn${idx}`);
    const inputsDiv = document.getElementById(`inputs${idx}`);
    const resultP = document.getElementById(`result${idx}`);
    const nInput = document.getElementById(`nInput${idx}`);

    infoBtn.addEventListener("click", () => {
        alert(f.info);
    });

    genBtn.addEventListener("click", () => {
        inputsDiv.innerHTML = "";
        const n = parseInt(nInput.value);
        for(let i = 0; i < n; i++){
            const inp = document.createElement("input");
            inp.type = "number";
            inp.placeholder = `x${i+1}`;
            inputsDiv.appendChild(inp);
        }
    });

    computeBtn.addEventListener("click", () => {
        const inputs = inputsDiv.querySelectorAll("input");
        const values = Array.from(inputs).map(inp => parseFloat(inp.value));
        const res = f.compute(values);
        resultP.textContent = `Natija: ${res}`;
    });

    MathJax.typesetPromise();
});
