export function processColors(colors, color) {
    if(!colors) return colors;
    if(color) {
        colors = colors.filter(c => c !== color);
        colors.unshift(color);
    }
    return colors.join("|");
}