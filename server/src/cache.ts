/**
 * Cache Manager
 * 
 * {
 * 	 src/styles/variables.css: {
 * 	 },
 *   all: {
 * 			--red: #355324,
 *      --green: #664435
 * 	 }
 * }
 */

export default class Cache<T> {
	private cachedVariables: Record<string, Map<string, T>> = {};
	private allVariables: Map<string, T>
	
	public get(key: string, filePath?: string) {
		if (filePath) {
			return this.cachedVariables[filePath]?.get(key);
		}

		return this.allVariables?.get(key);
	}

	public getAll() {
		return this.allVariables;
	}

	public set(filePath: string, key: string, value: T) {
		if (!this.cachedVariables[filePath]) {
			this.cachedVariables[filePath] = new Map();
		}
		if (!this.allVariables) {
			this.allVariables = new Map();
		}

		this.allVariables?.set(key, value);
    this.cachedVariables[filePath].set(key, value);
	}

	public clearFileCache(filePath: string) {
		this.cachedVariables[filePath]?.forEach((_, key) => {
			this.allVariables?.delete(key);
		});
		this.cachedVariables[filePath]?.clear();
	}

	public clearAllCache() {
		this.allVariables?.clear();
		this.cachedVariables = {};
	}
}