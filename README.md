# node-apis

Motor de RESTful APIs em Node.js.

## Requerimentos

1. Node.js versão >= 6.0 (Recomendado a versão LTS);

## Instruções de uso

1.  Baixar todas as dependencias utilizando o comando: "npm install";
2.  Iniciar o servidor com o comando: "npm start";

## Servidor

- **URL (default):** http://localhost:3000

## RESTful APIs:

### 1. Consultar usuario

**Metodo:** GET  
**URI:** users/:id  
**Exemplos:**   
1. **Status 200:** http://localhost:3000/users/0001   
Body de retorno:
~~~json
{
    "data":{
        "id": "0001",
        "nome": "Robert Jones",
        "idade": 25
    }
}
~~~
2. **Status 204:** http://localhost:3000/users/0002  
Não retorna body.

