
/**
 * EDIT YOUR IMAGES HERE
 * To add a picture, just add a new object to this list:
 * { url: "YOUR_IMAGE_LINK", title: "WORK TITLE", category: "BRANDING" }
 */
const galleryData = [
    { url: "./gallery/Hon_Simon_Aworigo_Puda.png", title: "Executive Graphics", category: "Executive" },
    { url: "./gallery/Hon_Simon_Aworigo.png", title: "Executive Graphics", category: "Executive" },
    { url: "./gallery/DR_Jacob_Paarechuga_Anankware.png", title: "Executive Graphics", category: "Executive" },
    { url: "./gallery/Hon_Simon_Aworigo1.png", title: "Executive Graphics", category: "Executive" },
    { url: "./gallery/eLPi_Studios_Happy_News_Year.jpg", title: "Executive Graphics", category: "Executive" },
    { url: "./gallery/Global_Help_Foundation_Logo.png", title: "Logo Design", category: "Branding" },
    { url: "./gallery/DeGift_Beads.png", title: "Logo Design", category: "Branding" },
    { url: "./gallery/Global_Help_Foundation_Orphanage_Outreach.png", title: "NGO Non-Profit", category: "General" },
    { url: "./gallery/Cheetah_Design.jpg", title: "Minimal Type", category: "Adventure" },
    { url: "./gallery/Grace_Food_lounge.png", title: "Visual Identity", category: "Branding" },
    { url: "./gallery/Ambassador_AG_Recover_All_Service.png", title: "Religious Design", category: "Religious" },
    { url: "./gallery/Mition_Tech_logo.jpg", title: "Logo Design", category: "Branding" },
    { url: "./gallery/Orange_Fish.jpg", title: "Adventure", category: "Adventure" },
    { url: "./gallery/Transparent_Glass_Sea.jpg", title: "Adventure", category: "Adventure" },
    { url: "./gallery/yeark_glowing_horns.jpg", title: "Adventure", category: "Adventure" },
    { url: "./gallery/Rev_Daniel_Yeboah_Of_Sureway_Assemblies_Of_God.png", title: "Jotter Design", category: "Layout" },
    { url: "./gallery/Grace_Food_lounge_Message_From_Manager.png", title: "Business", category: "Advertisement" },
    { url: "./gallery/Rev_Elvis_Agyeman.png", title: "Jotter Design", category: "Layout" },
    { url: "./gallery/Ambassador_Assemblies_Of_God_Night_of_Altars.png", title: "Religious Design", category: "Religious" },
    { url: "./gallery/Ambassador_AG_Joint_Service.jpg", title: "Religious Design", category: "Religious" },
    { url: "./gallery/Last_Days_Army_Prayer_Festival_2025.png", title: "Religious Design", category: "Religious" },
    { url: "./gallery/Last_Days_Army_Kingdom_Culture1.png", title: "Religious Design", category: "Religious" },
    { url: "./gallery/Vyne_beauty_kasoa.png", title: "Business", category: "Advertisement" },
    { url: "./gallery/Ticia_Sizzle_And_Glaze.png", title: "Business", category: "Advertisement" },
    { url: "./gallery/Shop_With_Rika.png", title: "Business", category: "Advertisement" },
];

while (galleryData.length < 20) {
    const i = galleryData.length + 1;
    galleryData.push({
        url: `https://picsum.photos/seed/${i + 60}/800/${800 + (i % 4 * 100)}`,
        title: `Archive Project ${i}`,
        category: i % 2 === 0 ? "Motion" : "Design"
    });
}

// --- View Controller ---
function switchView(viewName) {
    const views = document.querySelectorAll('.view');
    const navHome = document.getElementById('nav-home');
    const navGallery = document.getElementById('nav-gallery');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    gsap.to('.view.active', {
        opacity: 0, duration: 0.4, onComplete: () => {
            views.forEach(v => v.classList.remove('active'));
            const next = document.getElementById(`view-${viewName}`);
            next.classList.add('active');

            if (viewName === 'home') {
                navHome.classList.add('text-orange-500'); navHome.classList.remove('text-gray-400');
                navGallery.classList.add('text-gray-400'); navGallery.classList.remove('text-orange-500');
            } else {
                navGallery.classList.add('text-orange-500'); navGallery.classList.remove('text-gray-400');
                navHome.classList.add('text-gray-400'); navHome.classList.remove('text-orange-500');
            }

            gsap.fromTo(next, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 });
        }
    });
}

// --- Gallery Injection ---
function populateGallery() {
    const grid = document.getElementById('gallery-grid');
    const counter = document.getElementById('gallery-count');
    counter.innerText = `${galleryData.length} Selected Works`;

    galleryData.forEach((item, index) => {
        const element = document.createElement('div');
        element.className = 'gallery-item group';
        element.innerHTML = `
                    <img src="${item.url}" alt="${item.title}" loading="lazy">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 md:p-8">
                        <span class="text-orange-500 font-mono text-[10px] mb-2">${item.category.toUpperCase()}</span>
                        <h3 class="text-xl md:text-2xl font-black uppercase tracking-tighter">${item.title}</h3>
                    </div>
                `;
        element.onclick = () => openLightbox(item.url, item.title, item.category);
        grid.appendChild(element);
    });
}

// --- Lightbox Logic ---
function openLightbox(url, title, cat) {
    const box = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = url;
    document.getElementById('lightbox-title').innerText = title;
    document.getElementById('lightbox-tag').innerText = `DESIGN // ${cat.toUpperCase()}`;

    box.style.display = 'block';
    setTimeout(() => { box.style.opacity = '1'; }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const box = document.getElementById('lightbox');
    box.style.opacity = '0';
    setTimeout(() => { box.style.display = 'none'; }, 400);
    document.body.style.overflow = 'auto';
}

// --- Particles ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
class Particle {
    constructor() { this.init(); }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.init();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// --- Cursor ---
const cOuter = document.getElementById('cursor-outer');
const cInner = document.getElementById('cursor-inner');

// Only attach mouse move if it's not a touch device
if (window.matchMedia("(hover: hover)").matches) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cOuter, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15 });
        gsap.to(cInner, { x: e.clientX - 2, y: e.clientY - 2, duration: 0 });
    });
}

window.onload = () => {
    resize();
    for (let i = 0; i < 100; i++) particles.push(new Particle());
    animate();
    populateGallery();
    gsap.from('h1', { y: 50, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
};
window.onresize = resize;
