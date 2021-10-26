export function processSizeAndPrice(data) {
    const prices = data.map(d => Number(d.split(' ')[1]));
    const sizes = data.map(d => d.split(' ')[0]);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const sizeAndPriceStr = sizes.map((s, i) => `${s}${prices[i] - minPrice ? `[+${prices[i] - minPrice}.00]` : ''}`).join('|');
    
    const lookup = {};

    sizes.forEach((v, i) => {
        lookup[v] = prices[i];
    });

    function getSizePriceStr(size) {
        return `${size}${prices[sizes.indexOf(size)] - minPrice ? `[+${prices[sizes.indexOf(size)] - minPrice}.00]` : ''}|` + sizes.filter(s => s !== size).map((s, i) => `${s}${prices[i] - minPrice ? `[+${prices[i] - minPrice}.00]` : ''}`).join('|');
    }
    
    return [
        lookup,
        prices,
        sizes,
        maxPrice,
        minPrice,
        sizeAndPriceStr, getSizePriceStr];
}

