(() => {
  const C = window.DELLYS_CONFIG, $ = s => document.querySelector(s);
  const real = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  const sb = real ? supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const P = {
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    file: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5',
    box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 6v6l4 2',
    layers: 'M3 4h18v3H3zM5 7v13h14V7M9 11h6',
    wallet: 'M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7M16 14h2',
    sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3',
    moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    left: 'M15 18l-6-6 6-6',
    plus: 'M12 5v14M5 12h14',
    up: 'M3 17l6-6 4 4 8-8M15 7h6v6',
    down: 'M3 7l6 6 4-4 8 8M15 17h6v-6'
  };
  const icon = n => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;
  const icons = root => root.querySelectorAll('[data-i]').forEach(e => e.innerHTML = icon(e.dataset.i));

  // Dados fictícios, só para apresentação visual
  const NAV = [['grid', 'Visão geral'], ['file', 'Cotação'], ['box', 'Produtos'], ['users', 'Clientes'], ['clock', 'Pendentes'], ['layers', 'Estoque'], ['wallet', 'Caixa'], ['sliders', 'Configurações']];
  const KPI = [
    { t: 'Cotações hoje', v: 24, d: '+12%', up: 1, i: 'file', c: 'blue', s: [4, 6, 5, 8, 7, 10, 12] },
    { t: 'Cotações pendentes', v: 8, d: '-5%', up: 0, i: 'clock', c: 'amber', s: [10, 9, 11, 9, 8, 9, 8] },
    { t: 'Clientes ativos', v: 146, d: '+3%', up: 1, i: 'users', c: 'cyan', s: [120, 126, 130, 135, 139, 143, 146] },
    { t: 'Valor total cotado', v: 48920, m: 1, d: '+8,4%', up: 1, i: 'wallet', c: 'green', s: [30, 34, 33, 39, 41, 45, 49] }
  ];
  const ST = { 'Aprovada': 'g', 'Em análise': 'c', 'Pendente': 'a', 'Aguardando estoque': 'v', 'Cancelada': 'r' };
  const ROWS = [
    ['COT-373800', 'CARINA IVO', 18, 3284.5, 'Aprovada', 'há 5 min'],
    ['COT-369939', 'Caju', 42, 9120.9, 'Em análise', 'há 18 min'],
    ['COT-164962', '//RA GALEAO 164962⌛', 27, 5476.2, 'Pendente', 'há 32 min'],
    ['COT-226152', 'RA PORTO SEGURO 226152', 9, 812.7, 'Aprovada', 'há 1 h'],
    ['COT-226120', 'RA PORTO PRAIA 226120', 33, 6930, 'Aguardando estoque', 'há 2 h'],
    ['COT-755346', 'ESTRELA  CENTRO 775650', 61, 14280.35, 'Em análise', 'há 3 h'],
    ['COT-776217', 'PORTO CENTER 758228', 6, 450.8, 'Cancelada', 'há 4 h'],
    ['COT-758228', 'RA NAVEGANTES BPS 334865', 15, 2102.4, 'Pendente', 'ontem']
  ].map(([id, c, n, v, s, a]) => ({ id, c, n, v, s, a }));
  const ATIV = [
    ['green', 'Cotação COT-2481 aprovada', 'há 5 min'], ['cyan', 'COT-2480 enviada para análise', 'há 18 min'],
    ['amber', 'Novo cliente cadastrado: Empório Central', 'há 1 h'], ['violet', 'Estoque de 3 itens em revisão', 'há 2 h'],
    ['green', 'Tabela de preços atualizada', 'ontem']
  ];
  const COR = { green: 'var(--green)', cyan: 'var(--cyan)', amber: 'var(--amber)', violet: 'var(--vio)' };
  const RAPIDO = [['plus', 'Nova cotação'], ['box', 'Produtos'], ['users', 'Clientes'], ['layers', 'Estoque']];
  const STAT = [['Servidor', 'Operacional'], ['Banco de dados', 'Operacional'], ['Atualização de preços', 'Em dia'], ['Backup', 'Agendado 22:00']];

  function montar() {
    $('#nav').innerHTML = NAV.map(([i, t], n) => `<button class="ni ${n ? '' : 'on'}" data-tip="${t}">${icon(i)}<span class="lb">${t}</span></button>`).join('');
    $('#nav').onclick = e => { const b = e.target.closest('.ni'); if (!b) return; document.querySelectorAll('#nav .ni').forEach(x => x.classList.toggle('on', x === b)); };
    icons(document);

    const pts = s => s.map((y, i) => `${(i * 100 / (s.length - 1)).toFixed(1)},${(30 - (y - Math.min(...s)) * 26 / (Math.max(...s) - Math.min(...s) || 1)).toFixed(1)}`).join(' ');
    $('#cards').innerHTML = KPI.map((k, n) => `<article class="card" style="--d:${n * 90 + 200}ms"><div class="ch"><span class="ci ${k.c}">${icon(k.i)}</span>${k.t}</div><b class="cv" data-v="${k.v}" data-m="${k.m || 0}">0</b><div class="cf"><span class="delta ${k.up ? 'up' : 'dn'}">${icon(k.up ? 'up' : 'down')}${k.d}</span><svg class="spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts(k.s)}"/></svg></div></article>`).join('');
    document.querySelectorAll('.cv').forEach(contar);

    $('#chips').innerHTML = ['Todas', ...Object.keys(ST)].map((s, n) => `<button class="chip ${n ? '' : 'on'}">${s}</button>`).join('');
    $('#chips').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; fs = b.textContent; document.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === b)); tabela(); };
    $('#q').oninput = e => { q = e.target.value.toLowerCase(); tabela(); };
    tabela();

    $('#ativ').innerHTML = ATIV.map(([c, t, h]) => `<li><i style="background:${COR[c]}"></i><span>${t}</span><span class="mu">${h}</span></li>`).join('');
    $('#rapido').innerHTML = RAPIDO.map(([i, t]) => `<button>${icon(i)}${t}</button>`).join('');
    $('#stat').innerHTML = STAT.map(([t, s], n) => `<li><i style="${n === 3 ? 'background:var(--amber);animation:none' : ''}"></i>${t}<span>${s}</span></li>`).join('');

    $('#data').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' });
    $('#hora').textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    $('#drop').innerHTML = ATIV.slice(0, 3).map(([, t, h]) => `<div>${t}<small>${h}</small></div>`).join('');

    if (innerWidth < 900) $('#app').classList.add('min');
    setTimeout(() => toast('Tabela de preços atualizada'), 1800);
    setTimeout(() => toast('3 cotações aguardam análise'), 4200);
  }

  let fs = 'Todas', q = '';
  function tabela() {
    const r = ROWS.filter(x => (fs === 'Todas' || x.s === fs) && (x.c + x.id).toLowerCase().includes(q));
    $('#tb').innerHTML = r.map((x, n) => `<tr style="--d:${n * 50}ms"><td data-l="Cotação"><b>${x.id}</b></td><td data-l="Cliente">${x.c}</td><td data-l="Itens">${x.n}</td><td data-l="Valor" class="num">${brl(x.v)}</td><td data-l="Status"><span class="st ${ST[x.s]}">${x.s}</span></td><td data-l="Atualização" class="mu">${x.a}</td></tr>`).join('')
      || '<tr><td colspan="6" class="vazio">Nenhuma cotação encontrada.</td></tr>';
  }

  function contar(el) {
    const v = +el.dataset.v, m = el.dataset.m === '1';
    const f = x => m ? brl(x) : Math.round(x).toLocaleString('pt-BR');
    if (reduz) return el.textContent = f(v);
    const t0 = performance.now();
    (function passo(t) {
      const p = Math.min(1, (t - t0) / 1000);
      el.textContent = f(v * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    })(t0);
  }

  function toast(msg) {
    const d = document.createElement('div'); d.className = 'toast'; d.textContent = msg;
    $('#toasts').appendChild(d); setTimeout(() => d.remove(), 5000);
  }

  function mostrar(email) {
    $('#login').hidden = !!email; $('#app').hidden = !email;
    if (!email) return;
    $('#av').textContent = email.slice(0, 2).toUpperCase(); $('#av').title = email;
    montar();
  }

  $('#demo-aviso').hidden = real;
  $('#form-login').addEventListener('submit', async e => {
    e.preventDefault(); $('#erro').textContent = '';
    const email = $('#email').value.trim(), senha = $('#senha').value;
    if (!real) { sessionStorage.setItem('demo', email); return mostrar(email); }
    $('#btn-entrar').disabled = true;
    const { error } = await sb.auth.signInWithPassword({ email, password: senha });
    $('#btn-entrar').disabled = false;
    if (error) $('#erro').textContent = 'E-mail ou senha incorretos.'; else mostrar(email);
  });
  $('#sair').onclick = async () => { sessionStorage.removeItem('demo'); if (sb) await sb.auth.signOut(); location.reload(); };
  $('#colapsar').onclick = () => $('#app').classList.toggle('min');
  $('#notif').onclick = e => { const d = $('#drop'); d.hidden = !d.hidden; e.currentTarget.setAttribute('aria-expanded', !d.hidden); e.currentTarget.querySelector('em').hidden = true; };
  document.addEventListener('click', e => { if (!e.target.closest('.nw')) { $('#drop').hidden = true; $('#notif').setAttribute('aria-expanded', 'false'); } });
  $('#tema').onclick = () => {
    const r = document.documentElement, claro = r.dataset.theme !== 'light';
    r.dataset.theme = claro ? 'light' : 'dark'; $('#tema').innerHTML = icon(claro ? 'sun' : 'moon');
  };

  (async () => {
    if (!real) return mostrar(sessionStorage.getItem('demo'));
    const { data } = await sb.auth.getSession();
    mostrar(data.session ? data.session.user.email : null);
  })();
})();
