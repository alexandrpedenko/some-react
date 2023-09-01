function set<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function get<T>(key: string): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function deleteItem(key: string): void {
  localStorage.removeItem(key);
}

export {
  set,
  get,
  deleteItem
}
