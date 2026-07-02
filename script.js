const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

sizeCanvas();

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%<>/{}[]";
const fontSize = 15;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(2, 6, 4, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 255, 136, 0.85)";
  ctx.font = fontSize + "px JetBrains Mono, monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 42);

window.addEventListener("resize", () => {
  sizeCanvas();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".stats strong").forEach((counter) => {
  const text = counter.textContent.trim();
  if (!/^\d+\+?$/.test(text)) return;

  const target = parseInt(text, 10);
  let current = 0;
  const plus = text.includes("+");
  const step = Math.max(1, Math.ceil(target / 40));

  const run = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(run);
    }
    counter.textContent = current + (plus ? "+" : "");
  }, 35);
});
