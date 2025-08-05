import { POST } from "./api/video/route"

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
        if (!response.ok) {
            throw new Error(await response.text())
        }
        return response.json()
    }
    async getVideos() {
        return this.fetch("/videos")
    }

    async createVideo(videoData){
        return this.fetch("/videos",{
            method:"POST",
                body:videoData
        })
    }
}