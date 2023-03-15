export const postOnLocalStorage = (key: string, content: string) => {
    localStorage.setItem(key, content);
};

export const getFromLocalStorage = (key: string) => {
    const token = localStorage.getItem(key);
    if(token) return token;
    else return null;
};

export const deleteOnLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}