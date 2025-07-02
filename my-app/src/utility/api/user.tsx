interface UserData {
    data: {
        [key: string]: any;
    };
    meta?: {
        [key: string]: any;
    };
}

/**
 * Stores the user data object in either localStorage or sessionStorage based on the persistent flag.
 * @param {UserData} userData - The data to be stored.
 * @param {boolean} persistent - Determines whether to use localStorage (true) or sessionStorage (false).
 */
export function storeUserData(userData: UserData, persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(userData));
    // console.log("Stored userData");
}

/**
 * Updates the existing user data object in storage by merging it with new data.
 * New values will overwrite existing values with the same key.
 * @param {UserData} newUserData - The new data to be merged into the existing object.
 * @param {boolean} persistent - Determines whether to update data in localStorage (true) or sessionStorage (false).
 */
export function updateUserData(newUserData: UserData, persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    const existingRaw = storage.getItem("userData");
    const existingData: UserData = existingRaw ? JSON.parse(existingRaw) : { data: {} };

    const updatedData: UserData = {
        ...existingData,
        data: {
            ...(existingData.data || {}),
            ...(newUserData.data || {})
        },
        meta: {
            ...(existingData.meta || {}),
            ...(newUserData.meta || {})
        }
    };

    storage.setItem("userData", JSON.stringify(updatedData));
    // console.log("Updated userData");
}

/**
 * Deletes the user data from both localStorage and sessionStorage.
 */
export function deleteUserData(): void {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    console.log("Deleted userData from both storages");
}

/**
 * Checks if the user is logged in by verifying the presence of user data in storage.
 * @returns {boolean} - True if user data exists, otherwise false.
 */
export function isUserLoggedIn(): boolean {
    const localData = localStorage.getItem("userData");
    const sessionData = sessionStorage.getItem("userData");

    // console.log("Checking login status");

    return !!(localData || sessionData);
}

/**
 * Retrieves user data from either localStorage or sessionStorage.
 * @returns {any} - Parsed user data or null if not found.
 */
export function getUserData(): any {
    const localData = localStorage.getItem("userData");
    const sessionData = sessionStorage.getItem("userData");

    // console.log("Getting userData");

    const parsedData: UserData | null = localData
        ? JSON.parse(localData)
        : sessionData
        ? JSON.parse(sessionData)
        : null;

    return parsedData?.data || null;
}
