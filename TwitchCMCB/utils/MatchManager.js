export function CtrMatches(regexp, str) {
    const match = str.match(regexp)
    return match !== null
}