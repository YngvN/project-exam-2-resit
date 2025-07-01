import MessageModalComponent from "../../components/modal/messageModal/messageModalComponent";
import ModalComponent from "../../components/modal/modalComponent";

const baseURL = "https://v2.api.noroff.dev/";

const apiKey = "9448450f-e334-42ab-b07d-76bf3129b9ba";

/**
 * Generates headers, conditionally including Authorization header
 * @param {boolean} authRequired - Whether to include the Authorization header
 */
function getDefaultHeaders(authRequired: boolean = true): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        "X-Noroff-API-Key": apiKey
    };
    if (authRequired) {
        headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return headers;
}

// Function to get the token from storage or throw if missing
function getAccessToken(): string {
    const userData =
        localStorage.getItem("userData") || sessionStorage.getItem("userData");

    if (!userData) {
        throw new Error("Access token not found: userData is missing from storage.");
    }

    try {
        const parsed = JSON.parse(userData);
        const token = parsed?.data?.accessToken;
        if (!token) {
            throw new Error("Access token not found in userData.");
        }
        return token;
    } catch (error) {
        throw new Error("Failed to parse userData or retrieve access token.");
    }
}

/**
 * Utility function to create request options based on method, body, and auth requirement
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
    if (body) options.body = JSON.stringify(body);
    return options;
}

/**
 * Makes a request with optional ID, subcategory, parameters, and auth flag
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
        console.log(url);
        const options = createRequestOptions(method, body, authRequired);
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            handleAPIError(errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error with ${method} request to ${url}:`, error);
        throw error;
    }
}

/**
 * Parses API error response and displays it using ModalComponent.
 */
function handleAPIError(errorData: any): void {
    let errorMessage = `Status: ${errorData.status}\nStatus Code: ${errorData.statusCode}\n`;

    if (errorData.errors && Array.isArray(errorData.errors)) {
        errorData.errors.forEach((error: any) => {
            errorMessage += `\nError Message: ${error.message}`;
            if (error.code) errorMessage += `\nError Code: ${error.code}`;
            if (error.path) errorMessage += `\nError Path: ${error.path.join(" > ")}`;
        });
    } else {
        errorMessage += "Unknown error format.";
    }

    console.error(errorMessage);

    // Use ModalComponent to display the error message
    <MessageModalComponent isOpen={true} onClose={() => { }}>
        <p>{errorMessage}</p>
    </MessageModalComponent>;
}

/**
 * Searches listings by title, description, or tags
 */
export async function searchVeneus(
    searchTerm: string,
    additionalParams: Record<string, any> = {}
): Promise<any> {
    const params = { q: searchTerm, ...additionalParams };
    return await makeRequest("venues/search", '', '', 'GET', null, params);
}
