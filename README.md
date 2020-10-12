<h2 align="center">
  caixa-virtual
</h2>
<p align="left">
  <a>A api foi desenvolvida em node.js com typescript.</a></br>
  <a>Para utilizar a api execute os comandos abaixo:</a>
</p>
<p align="left" >
  * <a>yarn install</a></br>
  * <a>yarn dev:server</a>
</p>
</br>
<h3><strong> Rotas disponíveis</strong></h3>
<p align="left" >
  <a><strong>Cadastro de categoria:</strong></a></br>
  POST: <strong>localhost:3333/transactions/categories</strong></br>
  A requisição do cadastro de categoria no postman deve ser enviada via JSON com o formato abaixo:

```json
{
  "title": "Receitas"
}
```

  <a><strong>Lista de categorias:</strong></a></br>
  GET: <strong>localhost:3333/transactions/categories</strong></br>

```json
{
    "categories": [
        {
            "id": "971fd4c4-ef8e-4c9a-9b68-851ad6873ab8",
            "title": "Receitas"
        },
        {
            "id": "d269cdbd-46a5-4ba8-ba6e-c799269d363e",
            "title": "Despesas"
        }
    ]
}
```

  <a><strong>Cadastro da movimentação:</strong></a></br>
  POST: <strong>localhost:3333/transactions</strong></br>
  A requisição do cadastro da movimentação no postman deve ser enviada via JSON com o formato abaixo:

```json
{
  "id_categoria": "971fd4c4-ef8e-4c9a-9b68-851ad6873ab8", 
  "data": "2020-10-12T11:25:34",
  "title": "Venda mercadoria",
  "value": 4500,
  "type": "Entrada"  
}
```
  <a><strong>Lista de movimentações:</strong></a></br>
  GET: <strong>localhost:3333/transactions</strong></br>
 
```json  
  {
    "totais": {
        "entrada": 4500,
        "saida": 2500,
        "saldoTotal": 2000
    },
    "movimentacoes": [
        {
            "data": "2020-10-12T11:25:34",
            "id": "3277ac06-4ce0-49e3-ad17-4c557e8fa88b",
            "id_categoria": "971fd4c4-ef8e-4c9a-9b68-851ad6873ab8",
            "categoria": {
                "id": "971fd4c4-ef8e-4c9a-9b68-851ad6873ab8",
                "title": "Receitas"
            },
            "title": "Venda de mercadoria",
            "value": 4500,
            "type": "Entrada"
        },
        {
            "data": "2020-10-12T11:25:34",
            "id": "003bc7ba-6bdd-4b03-8076-adc7d1a22635",
            "id_categoria": "d269cdbd-46a5-4ba8-ba6e-c799269d363e",
            "categoria": {
                "id": "d269cdbd-46a5-4ba8-ba6e-c799269d363e",
                "title": "Despesas"
            },
            "title": "Compra de mercadoria",
            "value": 2500,
            "type": "Saída"
        }
    ]
}

```
</p>



