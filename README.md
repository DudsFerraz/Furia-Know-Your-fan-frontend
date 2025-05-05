# Know Your Fan - Frontend

Este é o frontend da aplicação **Know Your Fan**, desenvolvida para a organização de eSports **FURIA**, com o objetivo de engajar e analisar os seus fãs de forma gamificada e interativa.

Este repositório corresponde à interface web (frontend). O backend está disponível [neste repositório](https://github.com/DudsFerraz/Furia-Know-Your-fan-backend).

## 🌟 Visão Geral

A aplicação web permite que os usuários:

* Criem seus perfis e compartilhem dados pessoais e de redes sociais.
* Ganhem XP e **FURIA Cash** ao realizarem atividades como compras, eventos e interações externas.
* Subam de nível e troquem moedas virtuais por brindes na loja.

## ⚙️ Tecnologias Utilizadas

* **React 18** com **Next.js** (App Router)
* **Tailwind CSS** para estilização
* **Axios** para comunicação com a API backend
* **Shadcn/UI** para componentes acessíveis e reutilizáveis

## 🔧 Funcionalidades Principais

* Cadastro e login via token JWT.
* Upload de foto do CPF para validação via Google Vision API.
* Conexão com Twitter/X para verificar se o usuário segue a FURIA.
* Consulta de perfil, XP e conquistas.
* Ranking global dos fãs.
* Loja para resgate de brindes usando FURIA Cash.

## 🔐 Integração com Backend

A aplicação consome a API via Axios com autenticação JWT armazenada localmente.

As principais chamadas incluem:

* `getInfo(userId)`
* `buy(userId, price)`
* `uploadDocument`
* `connectTwitter`

## 🏠 Componentes Principais

* `Register`: Tela de cadastro com coleta de dados.
* `Profile`: Visualização do perfil e progresso do usuário.
* `DocumentUpload`: Upload de documento com feedback de validação.
* `Socials`: Conexão com Twitter/X.
* `InfoXp`: Entrada de dados sobre eventos, compras e atividades externas.
* `Ranking`: Exibe leaderboard com XP.
* `Loja`: Interface de compra com feedback de erro e saldo.

## 🛏️ Layout da Interface

A interface principal é estruturada em abas (`Tabs`) com transições dinâmicas entre:

* Meu Perfil
* Upload Documento
* Redes Sociais
* +Info +XP
* Ranking
* Loja

## 🔑 Autenticação e Armazenamento

* JWT é salvo no `localStorage` após login via callback URL.
* O payload do token é decodificado para extrair `userId` e requisitar os dados do usuário.

## 🚀 Futuras Expansões

* Conexão com Instagram e Twitch.
* Suporte a dark mode.
* Sistema de badges e conquistas visuais.
* Integração com ChatBot interativo (https://github.com/DudsFerraz/FuriaBot).

## 🐾 Confira a aplicação [clicando aqui](https://furia-know-you-fan-frontend.vercel.app/)

---
