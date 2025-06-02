# 🌱 *AgroTech*

**Sistema Supervisório para Monitoramento de Plantações**
Projeto acadêmico desenvolvido no 7º semestre da faculdade.

O **AgroTech** é um sistema supervisório voltado para o monitoramento de plantações, integrando sensores físicos conectados a um microcontrolador **Wemos D1 Mini** com uma interface web moderna, desenvolvida em **Next.js**, **TypeScript** e **Firebase Firestore**.

Este sistema permite que produtores acompanhem, em tempo real, parâmetros essenciais do ambiente agrícola, como temperatura, umidade do solo e outras variáveis, promovendo uma gestão mais eficiente e sustentável.

---

## 🚀 Tecnologias Utilizadas

* 🌐 **Frontend:** Next.js, React, TypeScript, TailwindCSS
* 🔥 **Backend/Database:** Firebase Firestore
* 📡 **IoT:** Wemos D1 Mini + sensores ambientais (umidade, temperatura, etc.)

---

## 🔧 Como Executar Localmente

**Clone o repositório:**

```
git clone https://github.com/JoaoFlavio11/plant-io1.git
```

**Instale as dependências:**

```
npm install
# ou
yarn install
```

**Execute o ambiente de desenvolvimento:**

```
npm run dev
# ou
yarn dev
```

**Abra no navegador:**

```
http://localhost:3000
```
---

## 🔌 Configuração do Dispositivo (Wemos D1 Mini)

* Faça upload do firmware desenvolvido para o Wemos;
* Configure as credenciais de Wi-Fi;
* Adicione as chaves de acesso do Firebase no código do microcontrolador;
* Os sensores conectados ao Wemos enviarão dados periodicamente para o Firestore.

---

## 🗄️ Estrutura do Projeto

```
AgroTech/
├── .next/                        # Arquivos do Next.js
├── app/                          # Rotas das páginasd da aplicação (Next.js)
│   └── api/                      # APIs do servidor (Next.js API)
├── components/                   # Componentes Reacts reutilizáveis
├── core/                         # Firmware para o Wemos D1 Mini
├── hooks/                        # Hook para autenticação
├── lib/                          # Bibliotecas e modelos
├── public/                       # Arquivos públicos (imagens, ícones)
│   ├── bandeiras/
│   └── images/
├── services/                     # Configuração de serviços externos (Firebase)
├── package.json

```
---

## 📜 Funcionalidades

* ✔️ Monitoramento em tempo real da plantação;
* ✔️ Dashboard com dados dos sensores;
* ✔️ Histórico de dados armazenados no Firebase;
* ✔️ Comunicação eficiente entre sensores IoT e plataforma web;
* ✔️ Interface responsiva e de fácil utilização.
* ✔️ Relatórios gerados em PDF ou XLSX.
* ✔️ Escalabilidade e flexibilidade.

---

## 👨‍💻 Autor

* João Flávio C. Lopes — [@JoaoFlavio11](https://github.com/JoaoFlavio11)
* Pedro Bastos
* Théo Gomes 
* André Izidio
* Maria Clara Thomaz
---

## ⚠️ Observações

> Este projeto foi desenvolvido com fins acadêmicos para demonstrar a integração de tecnologias web modernas com sistemas IoT aplicados na agricultura de precisão.
> 2025, Unisal Lorena, Engenharia de computação - 7º semestre.



