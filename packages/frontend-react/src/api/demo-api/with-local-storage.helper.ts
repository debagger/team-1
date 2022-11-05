export function withLocalStorage<Item>(name: string) {
    return function <T>(cb: (items: { [key: string]: Item }) => T): T {
        const value = localStorage.getItem(name)

        const users: { [key: string]: Item } = value ? (JSON.parse(value) as any) : {}

        const result = cb(users)

        localStorage.setItem(name, JSON.stringify(users, undefined, 2))
        return result
    }
}
