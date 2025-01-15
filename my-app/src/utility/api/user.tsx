import React from "react";

/**
 * Stores the user data array in either localStorage or sessionStorage based on the persistent flag.
 * @param {any[]} userData - The data to be stored.
 * @param {boolean} persistent - Determines whether to use localStorage (true) or sessionStorage (false).
 */
export function storeUserData(userData: any[], persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem("userData", JSON.stringify(userData));
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
}

/**
 * Deletes the user data array from either localStorage or sessionStorage.
 * @param {boolean} persistent - Determines whether to delete data from localStorage (true) or sessionStorage (false).
 */
export function deleteUserData(persistent: boolean = true): void {
    const storage = persistent ? localStorage : sessionStorage;
    storage.removeItem("userData");
}


/**
 * Checks if the user is logged in by verifying the presence of user data in storage.
 * @returns {boolean} - True if user data exists, otherwise false.
 */
export function isUserLoggedIn(): boolean {
    const localData = localStorage.getItem("userData");
    const sessionData = sessionStorage.getItem("userData");

    return !!(localData || sessionData);
}

