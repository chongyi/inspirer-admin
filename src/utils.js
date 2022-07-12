export function withPrefix(path) {
    if (path.startsWith('/')) {
        return `${process.env.REACT_APP_PREFIX}${path}`
    }

    return `${process.env.REACT_APP_PREFIX}/${path}`
}