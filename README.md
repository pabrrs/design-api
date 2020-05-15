# Design API | Estário B2W 📚

Projeto para aulas práticas de **Design de API**, no programa de estágio da B2W Digital.

# Ferramentas Necessárias

Durante as aulas iremos utilizar as ferramentas citadas abaixo:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)

# Instruções iniciais

As instruções abaixo irão preparar o projeto para o desenvolvimento, portanto basta que sejam executadas apenas uma vez.

## Faça um fork do projeto

Entre na página do projeto no Github [b2wads/design-api](https://github.com/b2wads/design-api) e clique no botão **Fork**:

![image](https://user-images.githubusercontent.com/20517508/82049862-7d99ad80-968d-11ea-9786-a2c11a91b6c9.png)

Dessa forma você terá uma cópia sua do projeto, para utilizar nas aulas.

**Obs:** Caso você não possua uma conta no Github, [clique aqui](https://github.com/join?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home) para criar.

## Baixe o projeto localmente na sua máquina

Na página do seu projeto na sua conta do Github, clique no botão **Clone or Download**, então copie a URL exibida:

![image](https://user-images.githubusercontent.com/20517508/82050276-3b24a080-968e-11ea-9fb8-3a56ab9e43cd.png)

Depois, basta usar o seguinte comando para copiar o projeto na sua máquina:

```sh
git clone git@github.com:<seu_usuario>/design-api.git
```

## Instalando a versão do Node

Na pasta do projeto, execute o seguinte comando para instalar a versão **v12.14.0** do Nodejs utilizada no projeto:

```sh
nvm install
```

Em seguida, rode o seguinte comando:

```sh
nvm use
```

Logo, no seu terminal deve ser exibida uma mensagem parecida com:
```sh
Now using node v12.14.0 (npm v6.13.4)
```

## Instalando as dependências

Na pasta do projeto, execute o seguite comando para instalar as bibliotecas que o projeto irá utilizar:

```sh
npm install
```

# Como rodar

Para inicializar a aplicação, certifique-se de ter executado todas as etadas descritas em [Instruções inciais](#instruções-iniciais), então execute os:

Inicialize as dependências:
```
npm run deps
```

Mude para a versão do Node utilizada no projeto:
```
nvm use
```

Inicie a API:
```
npm start
```

Assim, você pode acessar [http://localhost:3000/docs](http://localhost:3000/docs) no seu navegador.

# Validações das aulas

Para cada aula, teremos uma bateria de testes automatizados que irão validar o código e mostrar se a implementação da atividade prática da aula foi efetuada com sucesso.

Para rodar as validações de cada aula, siga as instruções abaixo:

## Validações Aula 1

Execute o comando:

```sh
npm run test:v1
```

Resultado deve ser parecido com:

```sh
[Acceptance] Products V1
  GET /v1/products
    without params
      ✓ should return status 200 (OK)
      ✓ should return list of products
      ✓ should default limit be 10
      ✓ should default offset be 0
      ✓ should default sort by id with order ASC
    with params
      pagination
        when use limit
          ✓ should limit results
        when use offset
          ✓ should start from offset
      sorting
        when sort by id:asc
          ✓ should return products ordered by id:asc
        when sort by id:desc
          ✓ should return products ordered by id:desc
        when sort by name:asc
          ✓ should return products ordered by name:asc
        when sort by name:desc
          ✓ should return products ordered by name:asc
        when sort by price:asc
          ✓ should return products ordered by price:asc
        when sort by price:desc
          ✓ should return products ordered by price:asc
        when sort is invalid
          ✓ should return status 422 (Unprocessable Entity)
          ✓ should return error message
        when order is invalid
          ✓ should return status 422 (Unprocessable Entity)
          ✓ should return error message
      filters
        when filter by name
          ✓ should return with exact name
        when filter by name__contains
          ✓ should return with partial name matching
        when filter by price
          ✓ should return with exact price
        when filter by price__gte
          ✓ should return with price great then or equal
        when filter by price__lte
          ✓ should return with price less then or equal
  GET /products/:id
    when product exists
      ✓ should return status 200 (Ok)
      ✓ should return matching product
    when product not exists
      ✓ should return status 404 (Not Found)
      ✓ should return error message

  26 passing
```

## Validações Aula 2

Execute o comando:

```sh
npm run test:v2
```

Resultado deve ser parecido com:

```sh
[Acceptance] Products V2
  POST /v2/products
    when all fields was given
      ✓ should return 201 (Created)
      ✓ should return created product
    when name is missing
      ✓ should return 422 (Unprocessable Entity)
      ✓ should return error message
    when price is missing
      ✓ should return 422 (Unprocessable Entity)
      ✓ should return error message
    when category_id is missing
      ✓ should return 422 (Unprocessable Entity)
      ✓ should return error message
  PUT /v2/products/:id
    when product exists
      ✓ should return status 200 (Ok)
      ✓ should return updated product
      ✓ should update product in database
    when product not exists
      ✓ should return status 404 (Not Found)
      ✓ should return error message
    when name is empty
      ✓ should return 422 (Unprocessable Entity)
      ✓ should return error message
  DELETE /v2/products/:id
    when product exists
      ✓ should return status 204 (No Content)
      ✓ should return empty body
      ✓ should not find product in database
    when product not exists
      ✓ should return status 404 (Not Found)
      ✓ should return error message

 20 passing
```

## Validações Aula 3

Execute o comando:

```sh
npm run test:v3
```

Resultado deve ser parecido com:

```sh
[Acceptance] Products V3
  GET /v3/products
    ✓ should return status 200 (OK)
    ✓ should return relations between categories (hateoas)
  GET /v3/products/:id
    ✓ should return status 200 (OK)
    ✓ should return relations between categories (hateoas)
  /docs
    ✓ should document /v1/products
    ✓ should document /v2/products
    ✓ should document /v3/products

  7 passing
```

# Salvando as alterações

Ao final de cada aula, você pode executar os seguintes comandos para salvar suas alterações no seu repositório:

```sh
git commit -am "descreva aqui o que foi feito"
git push
```

# Comandos auxiliares

- `npm run test`: Executa todos os testes da aplicação
- `npm run fmt`: Formata o código
- `npm run cli`: Acessa a aplicação em modo CLI
