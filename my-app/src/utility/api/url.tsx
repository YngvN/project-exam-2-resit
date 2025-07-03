const baseURL = "https://v2.api.noroff.dev/";
const apiKey = "9448450f-e334-42ab-b07d-76bf3129b9ba";

/**
 * Get the access token from authData in storage.
 */
function getAccessToken(): string {
    const authRaw =
        localStorage.getItem("authData") || sessionStorage.getItem("authData");

    if (!authRaw) {
        throw new Error("Access token not found: authData is missing from storage.");
    }

    try {
        const parsed = JSON.parse(authRaw);
        const token = parsed?.accessToken;
        if (!token) {
            throw new Error("Access token not found in authData.");
        }
        return token;
    } catch {
        throw new Error("Failed to parse authData or retrieve access token.");
    }
}

/**
 * Constructs the default headers for an API request.
 *
 * Includes the `Content-Type` and `X-Noroff-API-Key` headers by default.
 * Adds the `Authorization` header with a Bearer token if `authRequired` is true.
 *
 * @param {boolean} [authRequired=true] - Whether to include the Authorization header.
 * @returns {HeadersInit} The headers object to be used in a fetch request.
 * @throws Will throw an error if `authRequired` is true but no access token is available.
 */

function getDefaultHeaders(authRequired: boolean = true): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
    };

    if (authRequired) {
        try {
            const token = getAccessToken();
            headers.Authorization = `Bearer ${token}`;
        } catch (error) {
            console.warn("Auth required, but no token found.");
            throw error;
        }
    }

    return headers;
}

/**
 * Prepares request options for fetch API.
 */
function createRequestOptions(
    method: string,
    body: object | null = null,
    authRequired: boolean = true
): RequestInit {
    const options: RequestInit = {
        method,
        headers: getDefaultHeaders(authRequired),
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
}

/**
 * Universal function for making API requests to the Noroff API.
 *
 * Handles URL construction, HTTP method, request body, query parameters, and authentication.
 *
 * @param {string} category - The main endpoint category (e.g. "venues", "profiles").
 * @param {string} [id=''] - Optional ID to target a specific resource.
 * @param {string} [subcategory=''] - Optional sub-path appended after ID.
 * @param {string} [method='GET'] - HTTP method to use ("GET", "POST", "PUT", "DELETE", etc.).
 * @param {object|null} [body=null] - Optional body for POST/PUT requests.
 * @param {Record<string, any>} [params={}] - Optional query parameters as key-value pairs.
 * @param {boolean} [authRequired=true] - Whether to include an Authorization header with the request.
 * @returns {Promise<any>} Resolves with the parsed JSON response, or `null` if the response status is 204.
 * @throws {Error} If the request fails or the server returns a non-OK response.
 */
export async function makeRequest(
    category: string,
    id: string = '',
    subcategory: string = '',
    method: string = 'GET',
    body: object | null = null,
    params: Record<string, any> = {},
    authRequired: boolean = true
): Promise<any> {
    let url = `${baseURL}${category}`;

    if (!category.includes("search")) {
        if (id) url += `/${id}`;
        if (subcategory) url += `/${subcategory}`;
    }

    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) url += `?${queryParams}`;

    try {
        console.log(`[API]: ${method} ${url}`);
        const options = createRequestOptions(method, body, authRequired);
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            const message = parseAPIError(errorData);
            throw new Error(message);
        }

        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        const fallbackMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`[API Error] ${method} ${url}:`, fallbackMessage);
        throw new Error(fallbackMessage);
    }
}

/**
 * Parses structured API error data into a readable string.
 *
 * Formats status, statusCode, and any available error messages, codes, and paths
 * into a detailed string for display or logging.
 *
 * @param {any} errorData - The error response object returned from the API.
 * @returns {string} A formatted string describing the error details.
 */
function parseAPIError(errorData: any): string {
    let errorMessage = `Status: ${errorData.status ?? "N/A"}\nStatus Code: ${errorData.statusCode ?? "N/A"}`;

    if (Array.isArray(errorData.errors)) {
        for (const err of errorData.errors) {
            errorMessage += `\n\nMessage: ${err.message}`;
            if (err.code) errorMessage += `\nCode: ${err.code}`;
            if (err.path) errorMessage += `\nPath: ${err.path.join(" > ")}`;
        }
    } else {
        errorMessage += "\n\nUnknown error format.";
    }

    return errorMessage;
}

/**
 * Performs a search for venues using the provided search term and optional filters.
 *
 * @param {string} searchTerm - The query string to search for matching venues.
 * @param {Record<string, any>} [additionalParams={}] - Optional search filters (e.g., wifi, parking).
 * @returns {Promise<any>} A promise resolving to the search results from the API.
 */
export async function searchVenues(
    searchTerm: string,
    additionalParams: Record<string, any> = {}
): Promise<any> {
    const params = { q: searchTerm, ...additionalParams };
    return await makeRequest("venues/search", '', '', 'GET', null, params, false);
}
