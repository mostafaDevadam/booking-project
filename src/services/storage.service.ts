

const saveItem = async (key: string, value: any) => {
    const obj = JSON.stringify(value)
    await localStorage.setItem(key, obj)
}

const getItem = async (key: string) => {
    const res = await localStorage.getItem(key)
    if (res) {
        const obj = JSON.parse(res)
        return obj
    }
}

const removeItem = async (key: string) => localStorage.removeItem(key)

export const StorageService = {
    saveItem,
    getItem,
    removeItem,
}
