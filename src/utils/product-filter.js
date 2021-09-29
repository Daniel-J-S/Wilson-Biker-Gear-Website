export function productFilter(arr, filter) {
    return arr.filter(({ node }) => node.category.name === filter);
}