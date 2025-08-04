type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
}
class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options
        const defautltHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response = await fetch(`/api/${endpoint}`, {
            method,
            headers: defautltHeaders,
            body: body ? JSON.stringify(body)
        })
        return response.json()
    }
}