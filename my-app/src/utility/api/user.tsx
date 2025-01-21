/**
 * Stores the user data array in either localStorage or sessionStorage based on the persistent flag.
 * @param {any[]} userData - The data to be stored.
 * @param {boolean} persistent - Determines whether to use localStorage (true) or sessionStorage (false).
 */
export function storeUserData(userData: any[], persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(userData));
    console.log("Stored userData");

}

/**
 * Updates the existing user data array in storage by merging it with new data.
 * @param {any[]} newUserData - The new data to be merged into the existing array.
 * @param {boolean} persistent - Determines whether to update data in localStorage (true) or sessionStorage (false).
 */
export function updateUserData(newUserData: any[], persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    const existingData = JSON.parse(storage.getItem("userData") || "[]");

    const updatedData = [...existingData, ...newUserData];

    storage.setItem("userData", JSON.stringify(updatedData));
    console.log("Updated userData");

}

/**
 * Deletes the user data array from either localStorage or sessionStorage.
 * @param {boolean} persistent - Determines whether to delete data from localStorage (true) or sessionStorage (false).
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
    console.log("Checking login status");


    return !!(localData || sessionData);
}

/**
 * Retrieves user data from either localStorage or sessionStorage.
 * @returns {any} - Parsed user data or null if not found.
 */
export function getUserData(): any {
    const localData = localStorage.getItem("userData");
    const sessionData = sessionStorage.getItem("userData");

    console.log("Getting userData");

    // Parse the stored data and return the nested 'data' object
    const parsedData = localData
        ? JSON.parse(localData)
        : sessionData
            ? JSON.parse(sessionData)
            : null;

    return parsedData?.data || null;
}
