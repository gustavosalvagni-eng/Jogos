# CASO 001 — Jogo instalável no iPhone (PWA)

## Conteúdo do pacote

- `index.html`: o jogo integral com matriz lógica, pistas, veredito, animações e armazenamento local, mais tela de instalação.
- `manifest.webmanifest`: nome, ícones, cores e modo standalone.
- `sw.js`: service worker; mantém os arquivos disponíveis offline após a primeira visita bem-sucedida.
- `icons/`: ícones PNG específicos para iOS e Android.

**Não retire arquivos do pacote.** A PWA precisa de todos juntos no mesmo diretório, com `icons/` preservado.

## Publicação gratuita recomendada — GitHub Pages

1. Entre em https://github.com e crie um repositório **público**, por exemplo `caso-001-pwa`.
2. Envie o **conteúdo extraído do ZIP** à raiz desse repositório, incluindo `index.html`, `sw.js`, `manifest.webmanifest` e a pasta `icons` (não envie só o ZIP).
3. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**; Branch `main`; pasta `/ (root)`; Save.
4. Espere a publicação e abra `https://SEU-USUARIO.github.io/caso-001-pwa/`.
5. Abra esse endereço no **Safari do iPhone**; use **Compartilhar → Adicionar à Tela de Início** (e **Abrir como App**, se oferecido).
6. Abra a PWA online uma vez até que apareça **“Jogo disponível offline”**. Em seguida desligue a rede e teste.

O endereço no passo 4 é apenas um MODELO; substitua seu usuário e o nome do repositório.

> Atenção: em repositório público, todo o HTML/JavaScript e a solução do jogo ficam acessíveis. Não insira senhas, chaves ou dados privados. O projeto é demonstrativo independente, não um produto oficial Murdle.

## Teste no computador

O `index.html` aberto via `file://` funciona como o HTML original, mas **não instala PWA**. Para testar o service worker, use um servidor HTTP em `localhost`:

```bash
python -m http.server 8000
```

Em seguida abra `http://localhost:8000/` no Chrome, Edge ou Safari (servidor iniciado na pasta que contém index.html).

## Atualizações

Se modificar o HTML, atualize também a constante `VERSION` em `sw.js` de `caso-noir-001-v1` para `caso-noir-001-v2`, `v3` e assim por diante. Publique os arquivos atualizados. Quando o app detectar a nova versão, toque em **Atualizar para a nova versão**.

## Armazenamento e uso offline

- Pistas e marcações são salvas em `localStorage` neste aparelho/navegador.
- Dados do HTML aberto por `file://` e de um endereço HTTPS não são compartilhados automaticamente; a PWA começa com progresso novo.
- Desinstalar o app, limpar dados de sites ou políticas de limpeza de armazenamento do iOS podem apagar o progresso ou o cache. Não é backup permanente.
- O jogo roda sem API, login, banco de dados ou bibliotecas externas.
- O primeiro acesso **requer internet e HTTPS**, salvo teste em `localhost`.
- A instalação não é feita pela App Store e não custa taxa de desenvolvedor Apple.
