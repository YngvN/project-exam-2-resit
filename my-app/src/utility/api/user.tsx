interface UserData {
    data: {
        [key: string]: any;
    };
    meta?: {
        [key: string]: any;
    };
}

/**
 * Stores user data and authentication details in either localStorage or sessionStorage.
 *
 * @param {UserData} userData - The complete user data object to store.
 * @param {boolean} [persistent=true] - If true, stores data in localStorage; otherwise, in sessionStorage.
 *
 * Also extracts and stores `authData` containing the username and access token.
 */
export function storeUserData(userData: UserData, persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(userData));

    const username = userData.data?.name || "";
    const accessToken = userData.data?.accessToken || "";

    if (username && accessToken) {
        const authData = { username, accessToken };
        storage.setItem("authData", JSON.stringify(authData));
    }
}

/**
 * Updates and merges existing user data in localStorage or sessionStorage.
 *
 * @param {UserData} newUserData - The new user data to merge with existing data.
 * @param {boolean} [persistent=true] - If true, uses localStorage; otherwise, sessionStorage.
 *
 * This function merges `data` and `meta` fields from `newUserData` into the existing stored user data.
 */
export function updateUserData(newUserData: UserData, persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    const existingRaw = storage.getItem("userData");
    const existingData: UserData = existingRaw
        ? JSON.parse(existingRaw)
        : { data: {}, meta: {} };

    const updatedData: UserData = {
        data: {
            ...existingData.data,
            ...newUserData.data
        },
        meta: {
            ...existingData.meta,
            ...newUserData.meta
        }
    };

    storage.setItem("userData", JSON.stringify(updatedData));
    
}

/**
 * Deletes userData and authData from both localStorage and sessionStorage.
 */
export function deleteUserData(): void {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    localStorage.removeItem("authData");
    sessionStorage.removeItem("authData");
    console.log("Deleted userData and authData from both storages");
}

/**
 * Checks if userData exists in either storage.
 */
export function isUserLoggedIn(): boolean {
    return !!(localStorage.getItem("userData") || sessionStorage.getItem("userData"));
}

/**
 * Retrieves userData from either storage.
 */
export function getUserData(): any {
    const localData = localStorage.getItem("userData");
    const sessionData = sessionStorage.getItem("userData");

    const parsedData: UserData | null = localData
        ? JSON.parse(localData)
        : sessionData
        ? JSON.parse(sessionData)
        : null;

    return parsedData?.data || null;
}

/**
 * Retrieves authData from either storage.
 */
export function getAuthData(): { username: string; accessToken: string } | null {
    const localData = localStorage.getItem("authData");
    const sessionData = sessionStorage.getItem("authData");

    const parsed = localData
        ? JSON.parse(localData)
        : sessionData
        ? JSON.parse(sessionData)
        : null;

    return parsed || null;
}
