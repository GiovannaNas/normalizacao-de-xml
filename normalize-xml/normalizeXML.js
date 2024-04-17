import fs from 'fs';
import xml2js from 'xml2js';
import { fixImageUrl } from './utils/image.js';
import { colors } from './utils/colors.js';

const xmlFilePath = './products.xml';
const xmlFixedFilePath = './productsFixed.xml';

// Lê o XML do arquivo
const xmlToNormalize = fs.readFileSync(xmlFilePath, 'utf-8');

const parser = new xml2js.Parser({ trim: true });
const builder = new xml2js.Builder();

const removeQuotesRegex = (str) => str.replace(/^"|"$/g, '');

parser.parseString(xmlToNormalize, (err, result) => {
    if (err) {
        throw err;
    }

    result.produtos.item = result.produtos.item.filter(product => {
        const availability = removeQuotesRegex(product.availability[0]);
        const title = removeQuotesRegex(product.title[0]);
        const color = removeQuotesRegex(product.color[0]);
        const image = removeQuotesRegex(product.image_link[0]);

        // Verifica se o produto está em estoque
        const isInStock = availability !== "Fora de estoque";

        // Se estiver fora de estoque, o produto é removido
        if (!isInStock) {
            console.log(`❌ Produto removido do catálogo:
                ${title}, ID: ${product.id[0]},
                Motivo: Fora de estoque`);
            return false;
        }

        // Verifica se o campo de cor está marcado como null e tenta encontrar a cor no título
        if (color === 'null' || color === null) {
            const colorMatch = colors.find(color => title.includes(color));
            if (colorMatch) product.color[0] = colorMatch;
        }

        // Corrige a URL da imagem se necessário
        if (product.image_link && image) {
            product.image_link[0] = fixImageUrl(image);
        }

        console.log(`🚀 ~ Produto normalizado com sucesso ->
            ${title}
            ID: ${product.id[0]}
            Cor: ${color}
            Imagem: ${product.image_link[0]}`);

        return true;
    });

    // Converte de volta para XML e remove os caracteres especiais
    const updatedXml = builder.buildObject(result).replace(/&gt;/g, '>');

    // Escreve o conteúdo corrigido em um novo arquivo XML
    fs.writeFileSync(xmlFixedFilePath, updatedXml, 'utf-8');

    console.log('O arquivo XML foi atualizado e salvo.');
});
