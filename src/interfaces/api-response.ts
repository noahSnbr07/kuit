export default interface APIResponse {
    success: boolean;
    status: 200 | 400 | 403 | 404 | 500;
    data: unknown | null;
    error?: Error | string | null;
    message: string | null;
}