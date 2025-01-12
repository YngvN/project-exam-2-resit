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

// Function to get the token from storage or fallback to the hardcoded token
function getAccessToken(): string {
    const userData = JSON.parse(localStorage.getItem("userData") || sessionStorage.getItem("userData") || "null");
    return userData?.data?.accessToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSG9saWRheXp6IiwiZW1haWwiOiJob2xpZGF5ekBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczNjcxMjQ0NH0.6NoPN8vaT8XopU9b_RVliYPLHaDQZOgzpq2Bx8qOPsE";
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
    <ModalComponent isOpen={true} onClose={() => { }}>
        <p>{errorMessage}</p>
    </ModalComponent>;
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
