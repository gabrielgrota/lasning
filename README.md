# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---
obj. do projeto: consumir somente conteúdos bons e de qualidade

projeto derivado de readingbooks-js feito em javascript apenas com a lógica funcionando

---
## first of all: the form to just add.
### definição dos dados:

- content: book, movie, series, podcast - obrigatório
- title - obrigatório
- author (if book, podcast)
- year of the thing
- pages (if book)
- type of: physical, epub, pdf (if book)
- cover (url (do the download of the photo and keep on bd (firebase)))
- date started or watched
- date finished (if book, podcast and series)

<button>submit</button> button to submit and add to bd 

todos os dados vão para formData de uma vez.

prevenção de erros: ao clicar no botão, alguns campos são necessáriamente obrigatórios.

---

### arquivo **FormToAdd.jsx** explicação:

Usando um único objeto de estado (formData): formData armazena os valores de content e title em um único estado como propriedades do objeto.
handleChange genérico: A função handleChange usa name e value do evento target para atualizar a chave específica dentro de formData.
Acessando valores com formData.content e formData.title: Cada campo acessa o valor correto de formData usando o name correspondente.


---

- dependendo do select no content aparecer determinados inputs

exemplo: no podcast não precisamos do ano, tipo, capa, e data finished.

- pensar em uma opção de resumo sobre o conteúdo, o que pensou ouvindo ou vendo. (poderá ser editado depois)

- the page will have the translation to svenska, portuguese and english (main).


---

fazer app com visual de ia 
link:https://dribbble.com/shots/25267869-Ai-app-design

tela de get started mostrando os objetivos de tracking de seu conteudo
tela de login e registro

com isso react router

- firebase instalado 03/11
- "enviar dados para firebase" no gpt para continuar
- aarrumar regra no firestore para mais restritivas (somente logados poderão realizar o submit)

- firestore funcionando e dados sendo enviados 06/12 ooh14


componentes na tela inicial frontend:

adicionar conteudo

movies
series
books
podcasts
youtube favs


função handleSubmit em FormToAdd
mudar: alert("Erro ao enviar os dados. Tente novamente.");
para uma mensagem no html




281224
fazendo com que um input só apareça quando um option(select) for escolhido

- ter um estado (React state) que salva o valor do select quando atualizado
- dependendo do valor aparece determinados inputs
- cada bloco de form com input será envolvido por um div que é exibido quando a condição é satisfeita

usar configurações dinamicas:

- criar objeto para mapear os tipos de conteudo e seus campos especificos
Como Funciona:
O usuário escolhe um tipo de conteúdo (ex: "book" ou "movie").
A função renderFields renderiza os campos específicos para o tipo de conteúdo selecionado.
Ao enviar o formulário, os dados relacionados ao tipo de conteúdo selecionado são enviados para o Firestore.