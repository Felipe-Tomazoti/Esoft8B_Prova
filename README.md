## Prova - Semestre VIII

 

Sistema de gerenciamento de imóveis e cômodos.

- Criar, editar e excluir imóveis e cômodos de forma independente.
- Associar e desassociar cômodos a imóveis de maneira intuitiva.
- Operações completas de CRUD para imóveis e cômodos.


### Trabalho realizado por:

- Felipe Cesar Tomazoti de Souza - RA: 22019977-2

#
### Programa Necessário
#### Postgresql: [Download](https://www.postgresql.org/download/)  

![image.png](./image.png)
 

#
### Iniciando o projeto
#### Clone o repositírio na sua maquina: 
`$ git clone https://github.com/Felipe-Tomazoti/Esoft8B_Prova.git`

#### Executando a aplicação

Com o PostgreSQL rodando e após clonar o repositório, abra dois terminais e execute os comandos abaixo.

No terminal 1 (API):
```
cd api/
yarn install
yarn start:dev
```

No terminal 2 (Web):
```
cd web/
yarn install
yarn start
```

Observação: verifique se as variáveis de ambiente da API estão configuradas para conectar ao PostgreSQL antes de iniciar.


