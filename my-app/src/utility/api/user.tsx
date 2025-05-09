interface Avatar {
    url: string;
    alt: string;
}

interface Banner {
    url: string;
    alt: string;
}

export interface User {
    name: string;
    email: string;
    bio: string | null;
    avatar: Avatar;
    banner: Banner;
    accessToken: string;
}

const STORAGE_KEY = "userData";

/**
 * Stores the user data in either localStorage or sessionStorage based on the persistent flag.
 * The data is wrapped inside an object: { data: user }.
 *
 * @param {User} userData - The user data object to store.
 * @param {boolean} [persistent=true] - Whether to store in localStorage (true) or sessionStorage (false).
 */
export function storeUserData(userData: User, persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    try {
        const wrapped = { data: userData };
        storage.setItem(STORAGE_KEY, JSON.stringify(wrapped));
        console.log("Stored userData");
    } catch (error) {
        console.error("Failed to store userData:", error);
    }
}

/**
 * Updates the stored user data by shallow-merging it with new data.
 * Does nothing if no existing data is found.
 *
 * @param {Partial<User>} newUserData - Partial user object to merge with the existing data.
 * @param {boolean} [persistent=true] - Whether to store the update in localStorage or sessionStorage.
 */
export function updateUserData(newUserData: Partial<User>, persistent: boolean = true): void {
    const existing = getUserData();
    if (!existing) return;

    const updated: User = { ...existing, ...newUserData };
    storeUserData(updated, persistent);
    console.log("Updated userData");
}

/**
 * Deletes user data from both localStorage and sessionStorage.
 * Useful for logout or reset.
 */
export function deleteUserData(): void {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    console.log("Deleted userData from both storages");
}

/**
 * Checks if the user is currently logged in by verifying presence of stored data.
 *
 * @returns {boolean} True if user data is present in either storage, false otherwise.
 */
export function isUserLoggedIn(): boolean {
    return !!(localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY));
}

/**
 * Retrieves the current user data from storage (local or session).
 *
 * @returns {User | null} The user object if found, otherwise null.
 */
export function getUserData(): User | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        return parsed?.data ?? null;
    } catch (error) {
        console.error("Failed to parse userData:", error);
        return null;
    }
}
