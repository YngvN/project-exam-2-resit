export const getInputClass = (
    value: string,
    error: string,
    successMessage: string
): string => {
    if (!value) return ""; // Neutral for empty inputs
    if (error) return "input-error"; // Red for errors
    if (successMessage) return "input-success"; // Green for success
    return ""; // Neutral for other cases
};
