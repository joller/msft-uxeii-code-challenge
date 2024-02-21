export function findSearchMatch(searchKey: string, obj: any): any | undefined {
    const matchKey = Object.keys(obj).filter(key => key.includes(searchKey));
    if (matchKey) {
        return matchKey;
    } else {
        return undefined;
    }
}