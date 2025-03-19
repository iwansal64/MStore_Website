export function number_to_rp(num: number): string {
    let result = Array.from(num.toString()).reverse().map((value, index) => (!(index % 3) && index) ? value+"." : value).reverse().join("");
    return result;
}