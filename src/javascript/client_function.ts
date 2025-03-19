export function number_to_rp(num: number|undefined): string {
    if(!num) {
        return "";
        
    }
    let result = Array.from(num.toString()).reverse().map((value, index) => (!(index % 3) && index) ? value+"." : value).reverse().join("");
    return result;
}