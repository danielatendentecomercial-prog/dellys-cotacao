# DELLYS · Sistema de Cotação (interface)

Site estático (HTML/CSS/JS) com login e um painel visual escuro. Os dados exibidos são fictícios.
Não contém o sistema de cotação, iframe, integração externa nem detecção do Tampermonkey.

## Ver no computador
Abra `index.html`. Sem o `config.js` preenchido, é modo demonstração (qualquer senha entra, sem segurança).

## Login real (Supabase Free, sem cartão)
1. supabase.com > novo projeto.
2. Authentication > Providers > Email: desligue "Allow new users to sign up".
3. Authentication > Users > Add user: crie cada usuário.
4. Project Settings > API: copie *Project URL* e *anon public* para o `config.js`.
5. Authentication > URL Configuration: coloque a URL final do site em *Site URL*.

A chave anon é pública por desenho. Nunca coloque a `service_role` no site.

## Hospedar grátis
- GitHub Pages: suba a pasta > Settings > Pages > branch `main`, pasta `/ (root)`.
- Cloudflare Pages / Netlify: conecte o repositório, sem build, saída `/`.

## Layout e o UserScript
Nenhum elemento fixo do site usa o canto superior direito: o cabeçalho reserva espaço ali, e as notificações aparecem no canto inferior direito. O z-index do site é baixo (máx. 50), então o painel do script fica por cima.

## Segurança
O login protege o acesso à página. Qualquer proteção feita só em JavaScript no navegador não substitui segurança de servidor.
