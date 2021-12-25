interface IApiResponse<T> {
    functionName: string;
    route: string;
    timestamp: string;
    data: T;
}

export default IApiResponse;
