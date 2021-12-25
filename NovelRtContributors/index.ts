import { AzureFunction, Context } from "@azure/functions";
import IApiResponse from "../shared/IApiResponse";
import get, { IContributor } from "./get";

const httpTrigger: AzureFunction = async (context: Context): Promise<void> => {
    context.log("HTTP trigger function processed a request.");

    const responseData = await get();
    const responseBody: IApiResponse<IContributor[]> = {
        functionName: "NovelRtContributors",
        route: "GET /",
        timestamp: new Date().toJSON(),
        data: responseData,
    };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseBody,
    };

    context.log("HTTP trigger function responded with a HTTP response.");
};

export default httpTrigger;
