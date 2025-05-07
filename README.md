# Leitor Inteligente de Documentos com OCR + IA

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) 
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white) 

## Sobre a Aplicação
Este projeto é uma aplicação web que permite o envio de imagens e documentos (como `.png`, `.jpg`), realiza a extração de texto via OCR utilizando o Tesseract.js e, em seguida, envia o conteúdo para uma IA generativa (Gemini) que fornece interpretação interativa e respostas contextuais com base no conteúdo extraído.

A aplicação foi desenvolvida como solução para um desafio técnico proposto em um processo seletivo, com o objetivo de demonstrar domínio técnico em desenvolvimento.

### Tecnologias Usadas
- **Backend:** NestJS
- **OCR:** Tesseract.js
- **IA:** Google Gemini 2.0 Flash
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Armazenamento local** de arquivos
- **PDFKit** para exportação de conversas

## Instruções de Instalação
### Pré-requisitos
**1.** Node (versão 18 ou superior)
**2.** npm ou yarn
**3.** PostgreSQL
**4.** API Key do Gemini

### Instalação
```bash
# Instale as dependências
npm install
```

**Configure as variáveis de ambiente**
Edite o arquivo `.env` com sua URL do banco de dados, chave da API do Gemini e uma chave de caracteres para codificação da senha do usuário.

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:porta/ocr_db"
GOOGLE_API_KEY=sua_api_key
JWT_SECRET=sequencia_de_caracteres
```

```bash
# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
```

#### Observações
* O Tesseract.js já será instalado automaticamente com as dependências e não requer instalação nativa do Tesseract OCR.
* Certifique-se de que o PostgreSQL esteja rodando e acessível na URL fornecida no `.env`.
* A chave da API do Gemini pode ser obtida em: https://makersuite.google.com/app/apikey.

## API Endpoints

### Autenticação

| Método | Rota            | Descrição                       |
|--------|------------------|----------------------------------|
| POST   | `/auth/signup`   | Cria um novo usuário e retorna um token JWT (via cookie) |
| POST   | `/auth/signin`   | Autentica um usuário existente e retorna token JWT (via cookie) |
| GET    | `/auth/profile`  | Retorna os dados do usuário logado (requer token via cookie) |

---

### OCR (Reconhecimento de Imagens)

| Método | Rota            | Descrição                                 |
|--------|------------------|--------------------------------------------|
| POST   | `/ocr/upload`    | Envia imagem ou documento para extração de texto via OCR (arquivo: `file`) |

---

### Conversas

| Método | Rota                    | Descrição                                      |
|--------|--------------------------|-------------------------------------------------|
| GET    | `/conversation`          | Retorna todas as conversas do usuário logado   |
| POST   | `/conversation`          | Cria uma nova conversa                         |

---

### Mensagens

| Método | Rota                                  | Descrição                                      |
|--------|----------------------------------------|-------------------------------------------------|
| GET    | `/conversation/messages?conversationId=ID` | Retorna as mensagens da conversa informada por ID |

---

## Autenticação

- A maioria das rotas protegidas requer o **token JWT via cookie HTTP Only**.
- O login define automaticamente o cookie `token`.
- Use `credentials: 'include'` no frontend para enviar o cookie.

---

## Upload de Arquivo

- Rota `/ocr/upload` aceita `multipart/form-data`
- Campo esperado: `file`
- Arquivos são salvos localmente em `./uploads`

---


## Licença
Este projeto está licenciado sob os termos da [MIT License](LICENSE).
