export function number_to_rp(num: number|undefined, with_rp: boolean = false): string {
    if(!num) {
        return "";
        
    }
    let result = Array.from(num.toString()).reverse().map((value, index) => (!(index % 3) && index) ? value+"." : value).reverse().join("");
    return (with_rp?"Rp. ":"")+result;
}