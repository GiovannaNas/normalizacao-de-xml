## Projeto Normalização de XML

### Objetivo do Projeto

O objetivo deste projeto é realizar a normalização de um arquivo XML que contém dados de produtos. A normalização visa garantir a consistência e qualidade dos dados, aplicando transformações específicas conforme as diretrizes estabelecidas.

### Normalizações Realizadas
O processo de normalização inclui as seguintes etapas:

1 - Remoção de Produtos com Estoque Indisponível:

Produtos que possuem a propriedade `inStock` definida como `false` são removidos do XML, pois não estão disponíveis para compra.

2 - Preenchimento de Cores Ausentes:

Produtos que têm a propriedade `color` como `null` passam por uma verificação adicional. Se o título do produto contiver o nome de uma cor, essa cor será preenchida na propriedade `color`. Isso visa melhorar a precisão e a utilidade dos dados, garantindo que todos os produtos tenham uma cor associada, sempre que possível.

3 - Normalização de URLs de Imagem Inválidas:

Produtos com a propiedade `image_link` inválidas devem ser normalizados para uma extensão de arquivo válida (jpg)

### Executando o projeto

1 - Baixar as dependências
```
npm install
```

2 - Executar o projeto

No terminal execute o seguinte comando:
```
npm run start
```
ou
```
node ./normalizeXML.js
```

### Estrutura do projeto

#### Arquivos Entregáveis:
Os arquivos entregáveis estão dentro da pasta de documentação, e o projeto está dentro da pasta normalize-xml.

1 - Arquivo `normalizeXML.js`

Responsável por ler o XML, executar as funções de normalização e salvar o XML normalizado.

2 - Arquivo `utils/colors.js`

Mapeamento das possíveis cores de produtos para ser feita a troca da propiedade `color`.

É um Array de cores, que deve fazer um match com o título do produto para preencher a propiedade, vale ressaltar que para a correta identificação a cor do nome do produto deve ser exatamente igual a um dos valores mapeados no Array.

3 - Arquivo `utils/image.js`

Arquivo responsável pela normalização da URL da propiedade `image_link`, verifica se a extensão do arquivo é válido, caso não seja realiza a troca para uma extensão de imagem válida (.jpg).

4 - Arquivos `XML`

O arquivo `products.xml` representa todos os produtos antes da normalização.
Já o arquivo `productsFixed.xml` representa os produtos em estoque e já com as devidas normalizações.

5 - Arquivo `package.json`

O arquivo package.json é um componente crucial do projeto, contendo metadados e informações sobre as dependências necessárias para o seu funcionamento. Ele inclui detalhes como o nome do projeto, versão, descrição, scripts de inicialização e testes, além das dependências necessárias para o desenvolvimento e execução do projeto. Este arquivo é fundamental para gerenciar e compartilhar o ambiente de desenvolvimento e garantir a reprodutibilidade do projeto em diferentes ambientes.

6 - Arquivo `.gitignore`

Arquivos que não devem ser enviados para o Git.


