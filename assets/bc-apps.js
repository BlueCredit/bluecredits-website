/* BlueCredit app launcher (9-dot menu) for bluecredits.org: the same menu as Atlas, Hydro, Flow and Plume.
 * Needs #bc-apps > #bc-apps-btn + #bc-apps-panel in the nav (next to Newsroom and Sign in). Adds its own styles. */
window.BC_APP = 'home';
(function () { const s = document.createElement('style'); s.textContent = `#bc-apps { position: relative; z-index: 1003; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
#bc-apps-btn { width: 40px; height: 40px; border-radius: 50%; border: 0; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.15); display: grid; place-items: center; cursor: pointer; color: #3c4043; }
#bc-apps-btn:hover, #bc-apps.open #bc-apps-btn { background: #e8eaed; }
#bc-apps-btn:focus-visible { outline: 3px solid rgba(30,111,217,.45); outline-offset: 2px; }
#bc-apps-btn svg { width: 22px; height: 22px; }
#bc-apps-panel { position: absolute; top: 50px; right: 0; width: 300px; max-width: calc(100vw - 32px); background: #e9eef6; border-radius: 28px; padding: 8px; box-shadow: 0 8px 28px rgba(15,23,42,.28); display: none; }
#bc-apps.open #bc-apps-panel { display: block; animation: bcAppsIn .14s ease-out; }
@keyframes bcAppsIn { from { opacity: 0; transform: translateY(-6px) scale(.98); } to { opacity: 1; transform: none; } }
#bc-apps-panel .card { background: #f8fafd; border-radius: 22px; padding: 16px 12px 12px; }
#bc-apps-panel .hd { font-size: 19px; font-weight: 500; color: #1f1f1f; padding: 2px 10px 12px; }
#bc-apps-panel .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
#bc-apps-panel a.app { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 4px 10px; border-radius: 16px; text-decoration: none; color: #1f1f1f; font-size: 14px; text-align: center; position: relative; }
#bc-apps-panel a.app:hover, #bc-apps-panel a.app:focus-visible { background: #e3e8f0; outline: none; }
#bc-apps-panel a.app.here { background: #dbe7fb; }
#bc-apps-panel a.app .ic { width: 48px; height: 48px; display: grid; place-items: center; }
#bc-apps-panel a.app .ic svg { width: 48px; height: 48px; display: block; }
#bc-apps-panel a.app small { position: absolute; top: 6px; right: 8px; font-size: 9.5px; font-weight: 700; color: #1e6fd9; text-transform: uppercase; letter-spacing: .04em; }
#bc-apps-panel .ft { text-align: center; font-size: 12.5px; color: #444746; padding: 10px 6px 4px; }
#bc-apps-panel .ft a { color: #0b57d0; text-decoration: none; font-weight: 600; }
#bc-apps-btn svg { width: 20px; height: 20px; }
.n-signin { display: inline-flex; align-items: center; gap: 8px; margin-left: 10px; padding: 9px 18px; border-radius: 10px; background: #1e6fd9; color: #fff !important; text-decoration: none;
  font: 700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; box-shadow: 0 4px 14px rgba(30,111,217,.35); white-space: nowrap; }
.n-signin:hover { background: #1557b0; }
.n-signin svg { width: 17px; height: 17px; stroke: currentColor; fill: none; stroke-width: 2; }
.n-right #bc-apps { margin-left: 6px; }
@media (max-width: 700px) { #bc-apps-panel { position: fixed; top: 64px; right: 12px; } .n-signin { padding: 8px 12px; font-size: 13px; } }

/* compact version for the website */
#bc-apps-panel { width: 252px !important; border-radius: 18px !important; padding: 6px !important; top: 48px !important; }
#bc-apps-panel .card { border-radius: 14px !important; padding: 10px 8px 8px !important; }
#bc-apps-panel .hd { font-size: 14px !important; font-weight: 600 !important; padding: 2px 8px 8px !important; }
#bc-apps-panel .grid { grid-template-columns: repeat(3, 1fr) !important; gap: 2px !important; }
#bc-apps-panel a.app { gap: 5px !important; padding: 8px 2px 7px !important; border-radius: 10px !important; font-size: 11.5px !important; }
#bc-apps-panel a.app .ic, #bc-apps-panel a.app .ic svg { width: 30px !important; height: 30px !important; }
#bc-apps-panel .ft { font-size: 10.5px !important; padding: 7px 4px 3px !important; }
`; document.head.appendChild(s); })();
/* BlueCredit app launcher (9-dot menu), shared by Atlas, Hydro, Flow and Plume. Needs #bc-apps > #bc-apps-btn + #bc-apps-panel on the page (index.html, pages/hc.js). */
(function () {
    // BlueCredit apps shown in the launcher, in this order (same as the Marketplace/Account launcher).
    // Account and Marketplace URLs follow window.BC_ACCOUNT (js/account.js).
    const acctUrl = () => ((window.BC_ACCOUNT && window.BC_ACCOUNT.account) || 'https://marketplace.bluecredits.org/account').replace(/\/$/, '');
    const initials = () => { const u = window.dcwlUser && window.dcwlUser(); return u ? (((u.first_name || '')[0] || '') + ((u.last_name || '')[0] || '') || (u.email || '?')[0]).toUpperCase() : ''; };
    // Which app this page belongs to (BC_ACCOUNT.app from js/account.js, or the host name); Help Center pages link back to their app
    const APP = window.BC_APP || (window.BC_ACCOUNT && window.BC_ACCOUNT.app) || (/^hydro\./.test(location.hostname) ? 'hydro' : /^flow\./.test(location.hostname) ? 'flow' : /^plume\./.test(location.hostname) ? 'plume' : 'atlas');
    const inPages = /\/pages\//.test(location.pathname);
    const BC_APPS = [
        { name: 'Account', url: () => acctUrl(), desc: 'Profile, security, plan and billing',
          icon: () => { const i = initials(); return `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#0b7dda"/>${i ? `<text x="24" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-size="${i.length > 1 ? 16 : 20}" font-weight="700" fill="#fff">${i}</text>` : '<path d="M24 24.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 3c-5.3 0-10 2.7-10 6.2V36h20v-2.3c0-3.5-4.7-6.2-10-6.2z" fill="#fff"/>'}</svg>`; } },
        { name: 'Home', url: () => 'https://bluecredits.org', here: APP === 'home', desc: 'BlueCredit company site',
          icon: () => '<svg viewBox="0 0 48 48"><defs><linearGradient id="bcaH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4da6ff"/><stop offset="1" stop-color="#0047b3"/></linearGradient></defs><path d="M24 5s-13 15.6-13 23.4C11 36 16.8 42 24 42s13-6 13-13.6C37 20.6 24 5 24 5z" fill="url(#bcaH)"/><path d="M24 22l-7 6v8h5v-5h4v5h5v-8z" fill="#fff"/></svg>' },
        { name: 'Marketplace', url: () => acctUrl().replace(/\/account$/, '') + '/', desc: 'Buy, hold and retire water credits',
          icon: () => '<svg viewBox="0 0 48 48"><defs><linearGradient id="bcaM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs><path d="M11 16h26l-2.2 22.2A3 3 0 0 1 31.8 41H16.2a3 3 0 0 1-3-2.8z" fill="url(#bcaM)"/><path d="M18 18v-4a6 6 0 0 1 12 0v4" fill="none" stroke="#0f766e" stroke-width="3" stroke-linecap="round"/><path d="M24 23.5s-5 5.6-5 8.8a5 5 0 0 0 10 0c0-3.2-5-8.8-5-8.8z" fill="#fff"/></svg>' },
        { name: 'Atlas', url: () => APP === 'atlas' ? '/' : 'https://atlas.bluecredits.org', here: APP === 'atlas' && !inPages, desc: 'U.S. water demand, supply and monitoring map',
          icon: () => '<svg viewBox="0 0 48 48"><path d="M6 12l11-4 14 4 11-4v28l-11 4-14-4-11 4z" fill="#dbeafe"/><path d="M17 8v28M31 12v28" stroke="#93c5fd" stroke-width="2"/><path d="M6 12l11-4 14 4 11-4v28l-11 4-14-4-11 4z" fill="none" stroke="#1e6fd9" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 14c-4.4 0-7.5 3.2-7.5 7.3 0 5.5 7.5 13.2 7.5 13.2s7.5-7.7 7.5-13.2C31.5 17.2 28.4 14 24 14z" fill="#1a6fdb"/><circle cx="24" cy="21.3" r="2.8" fill="#fff"/></svg>' },
        { name: 'Hydro', url: () => APP === 'hydro' ? '/' : 'https://hydro.bluecredits.org', here: APP === 'hydro' && !inPages, desc: 'Runoff, groundwater and flood analysis',
          icon: () => '<svg viewBox="0 0 48 48"><defs><linearGradient id="bcaY" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#0b57d0"/></linearGradient></defs><path d="M24 5s-12 14-12 22a12 12 0 0 0 24 0C36 19 24 5 24 5z" fill="url(#bcaY)"/><path d="M15 29c3-2.2 6 2.2 9 0s6 2.2 9 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M17 35c2.4-1.8 4.8 1.8 7.2 0s4.8 1.8 7.2 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/></svg>' },
        { name: 'Flow', url: () => APP === 'flow' ? '/' : 'https://flow.bluecredits.org', here: APP === 'flow' && !inPages, desc: 'Storm drains, water networks, culverts, bridges and dams',
          icon: () => '<svg viewBox="0 0 48 48"><defs><linearGradient id="bcaF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#0e7490"/></linearGradient></defs><rect x="5" y="5" width="38" height="38" rx="10" fill="url(#bcaF)"/><circle cx="14" cy="16" r="3.6" fill="#fff"/><circle cx="34" cy="16" r="3.6" fill="#fff"/><circle cx="24" cy="33" r="3.6" fill="#fff"/><path d="M14 16h20M14 16l10 17M34 16 24 33" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>' },
        { name: 'Plume', url: () => APP === 'plume' ? '/' : 'https://plume.bluecredits.org', here: APP === 'plume' && !inPages, desc: 'Pollution spread in air, rivers and groundwater',
          icon: () => '<svg viewBox="0 0 48 48"><defs><linearGradient id="bcaP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs><rect x="5" y="5" width="38" height="38" rx="10" fill="url(#bcaP)"/><path d="M14 36V22h6v14" fill="#fff"/><path d="M17 18c0-3 3-3 3-6M21 18c2-2 6-1 7-4 2 1 6 2 7 6-3 2-8 2-11 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>' },
    ];
    const root = document.getElementById('bc-apps'), btn = document.getElementById('bc-apps-btn'), panel = document.getElementById('bc-apps-panel');
    const draw = () => {
        panel.innerHTML = `<div class="card"><div class="hd">BlueCredit apps</div><div class="grid">${BC_APPS.map(a =>
            `<a class="app${a.here ? ' here' : ''}" role="menuitem" href="${a.url()}"${a.here ? ' aria-current="page"' : ''} title="${a.desc}"><span class="ic">${a.icon()}</span>${a.name}</a>`).join('')}</div></div>
            <div class="ft">One BlueCredit account for every app · <a href="https://bluecredits.org">bluecredits.org</a></div>`;
        panel.querySelectorAll('a.app').forEach(a => a.addEventListener('click', e => {
            if (a.classList.contains('here')) { e.preventDefault(); setOpen(false); return; }   // already in this app
            if (typeof track === 'function') track('app_launcher_click', { app: a.textContent.trim() });
        }));
    };
    const setOpen = open => { if (open) { draw(); const m = document.getElementById('acct-menu'); if (m) m.classList.remove('open'); } root.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); if (open) { const f = panel.querySelector('a.app'); f && f.focus({ preventScroll: true }); if (typeof track === 'function') track('app_launcher_open'); } };
    btn.addEventListener('click', e => { e.stopPropagation(); setOpen(!root.classList.contains('open')); });
    document.addEventListener('click', e => { if (!root.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('open')) { setOpen(false); btn.focus(); } });
    ['mousedown', 'dblclick', 'wheel', 'touchstart', 'contextmenu'].forEach(t => root.addEventListener(t, e => e.stopPropagation()));
})();
