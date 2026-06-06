# 📚 SaaS de Cursos — API CRUD

> **Disciplina:** Desenvolvimento de APIs | **Professor:** Pedro Borges | **Curso:** Sistemas de Informação

API RESTful com CRUD completo para uma plataforma onde professores postam materiais nos seus cursos.

---

## 🗂️ Entidades

| Entidade | Descrição |
|----------|-----------|
| **Curso** | Curso criado por um professor |
| **Material** | Arquivo/link postado pelo professor em um curso |

---

## 🚀 Como rodar localmente

### 1. Clone e instale

```bash
git clone https://github.com/seu-usuario/curso-saas-api
cd curso-saas-api
npm install
```

### 2. Configure o `.env`

Copie o exemplo e preencha com sua URI do MongoDB Atlas:

```bash
cp .env.example .env
```

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/curso-saas?retryWrites=true&w=majority
PORT=3000
```

### 3. Rode

```bash
npm run dev
```

Acesse: [http://localhost:3000/docs](http://localhost:3000/docs) → Swagger UI

---

## ☁️ Deploy no Vercel

1. Suba o código no GitHub
2. Acesse [vercel.com](https://vercel.com) → **New Project** → importe o repositório
3. Em **Environment Variables**, adicione:
   - `MONGODB_URI` = sua URI do MongoDB Atlas
   - `BASE_URL` = `https://seu-projeto.vercel.app`
4. Clique em **Deploy**

A documentação Swagger estará em: `https://seu-projeto.vercel.app/docs`

---

## 📋 Endpoints

### Cursos (`/api/cursos`)

| Método | Rota | Ação |
|--------|------|------|
| `GET` | `/api/cursos` | Lista todos os cursos |
| `GET` | `/api/cursos/:id` | Busca curso por ID |
| `POST` | `/api/cursos` | Cria novo curso |
| `PUT` | `/api/cursos/:id` | Atualiza curso |
| `DELETE` | `/api/cursos/:id` | Remove curso |

### Materiais (`/api/materiais`)

| Método | Rota | Ação |
|--------|------|------|
| `GET` | `/api/materiais` | Lista todos (ou filtra com `?cursoId=xxx`) |
| `GET` | `/api/materiais/:id` | Busca material por ID |
| `POST` | `/api/materiais` | Cria novo material |
| `PUT` | `/api/materiais/:id` | Atualiza material |
| `DELETE` | `/api/materiais/:id` | Remove material |

---

## 📝 Exemplos de requisição

### Criar curso
```http
POST /api/cursos
Content-Type: application/json

{
  "titulo": "Desenvolvimento Web com React",
  "descricao": "Do zero ao avançado com React e Node.js",
  "professor": "Pedro Borges",
  "categoria": "Programação"
}
```

### Criar material
```http
POST /api/materiais
Content-Type: application/json

{
  "titulo": "Aula 01 - Introdução ao React",
  "descricao": "Primeiros passos com JSX",
  "tipo": "video",
  "url": "https://youtube.com/watch?v=abc123",
  "cursoId": "665f1a2b3c4d5e6f7a8b9c0d"
}
```

---

## 🛠️ Tecnologias

- **Node.js** + **Express** — servidor
- **MongoDB** + **Mongoose** — banco de dados
- **Swagger UI** — documentação automática
- **Vercel** — deploy
