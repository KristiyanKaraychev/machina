const request = async (method, url, data, options = {}) => {
    if (method !== "GET") {
        options.method = method;
    }

    //for cookie
    options.credentials = "include";

    if (data) {
        options = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(data),
        };
    }

    const response = await fetch(url, options);
    const responseContentType = response.headers.get("Content-Type");

    if (!responseContentType) {
        return;
    }

    const result = await response.json();

    if (!response.ok) {
        const errorMessage = result.message;
        throw new Error(errorMessage);
    }

    return result;
};

export default {
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    delete: request.bind(null, "DELETE"),
    baseRequest: request,
};
