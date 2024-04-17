// Função para corrigir URL da imagem
// Caso a extensão da imagem não seja válida, substitui por .jpg
function fixImageUrl(imageUrl) {
    const validImageExtensions = ['jpg', 'png', 'jpeg'];
    const imageExtension = imageUrl.split('.').pop();
    const isValidExtension = validImageExtensions.includes(imageExtension);

    if (!isValidExtension) {
        return imageUrl.replace(imageExtension, 'jpg');
    }

    return imageUrl;
}

export { fixImageUrl };
