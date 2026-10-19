/* LinkedIn posts shown in the Newsroom carousel ("From LinkedIn").
 *
 * To add a post: on LinkedIn open the post › "…" › "Copy link to post" (or "Embed this post"), and paste the link
 * below as one line in quotes, newest first. Any of these work:
 *   'https://www.linkedin.com/posts/wangusi_some-title-activity-7312345678901234567-AbCd'
 *   'https://www.linkedin.com/feed/update/urn:li:activity:7312345678901234567/'
 *   'https://www.linkedin.com/embed/feed/update/urn:li:share:7312345678901234567'
 *   or the whole <iframe …> code from "Embed this post"
 */
window.BC_LINKEDIN_POSTS = [
    'https://www.linkedin.com/feed/update/urn:li:activity:7515212715179556864/',
    'https://www.linkedin.com/feed/update/urn:li:activity:7511416782885232640/',
    'https://www.linkedin.com/feed/update/urn:li:activity:7511141105833345024/',
    'https://www.linkedin.com/feed/update/urn:li:activity:7508647271773900800/',
    'https://www.linkedin.com/feed/update/urn:li:activity:7498403328612102144/',
    'https://www.linkedin.com/feed/update/urn:li:activity:7498363892918558721/',
    // 'https://www.linkedin.com/posts/...',
];

(function () {
    'use strict';
    const root = document.getElementById('li-carousel'); if (!root) return;
    const track = root.querySelector('.li-track'), prev = root.querySelector('.li-prev'), next = root.querySelector('.li-next'), dots = root.querySelector('.li-dots');
    // a post link (or embed code) → LinkedIn's embed address
    const embedOf = s => {
        s = String(s || '');
        const src = s.match(/src="([^"]+)"/); if (src) s = src[1];
        let m = s.match(/urn:li:(activity|share|ugcPost):(\d{15,25})/); if (m) return `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}`;
        m = s.match(/activity[-:](\d{15,25})/); if (m) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${m[1]}`;
        m = s.match(/ugcPost[-:](\d{15,25})/); if (m) return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${m[1]}`;
        return null;
    };
    const posts = (window.BC_LINKEDIN_POSTS || []).map(embedOf).filter(Boolean);
    if (!posts.length) { root.classList.add('li-empty'); return; }
    track.innerHTML = posts.map((u, i) => `<div class="li-slide"><iframe src="${u}" title="LinkedIn post ${i + 1}" loading="lazy" allowfullscreen frameborder="0"></iframe></div>`).join('');
    const slides = [...track.children];
    const perView = () => Math.max(1, Math.round(track.clientWidth / slides[0].getBoundingClientRect().width));
    const pages = () => Math.max(1, Math.ceil(slides.length / perView()));
    const page = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = k => track.scrollTo({ left: Math.max(0, Math.min(pages() - 1, k)) * track.clientWidth, behavior: 'smooth' });
    const drawDots = () => { const n = pages(), p = page(); dots.innerHTML = n > 1 ? Array.from({ length: n }, (_, i) => `<button type="button" aria-label="Page ${i + 1}" class="${i === p ? 'on' : ''}" data-k="${i}"></button>`).join('') : '';
        prev.disabled = p <= 0; next.disabled = p >= n - 1; root.classList.toggle('li-one', n <= 1); };
    prev.onclick = () => go(page() - 1); next.onclick = () => go(page() + 1);
    dots.onclick = e => { const b = e.target.closest('[data-k]'); if (b) go(+b.dataset.k); };
    let t; track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(drawDots, 80); });
    window.addEventListener('resize', drawDots); drawDots();
})();
