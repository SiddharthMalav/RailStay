/**
 * Api.ts
 * In this Component All fetch methods like GET,POST,PATCH are defined commonly so we can use ApiUtil class throughout the Project.
 */
import { eHTTPStatusCode } from "@/enums/shared-enums";
import { getCookie } from "@/utils";
export const BASEURL = "/api" || "/";

const DEFAULT_HEADERS: RequestInit = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrer: "no-referrer",
};
class ApiUtil {
  static getClientInstance() {
    return new ApiUtil();
  }
  private validateRequest(data: any) {
    return data;
  }
  private getQueryString = (q: any = {}) => {
    const qParams = Object.keys(q).filter(
      (param) => ![null, undefined, 0, ""].includes(q[param])
    );
    return qParams.length
      ? qParams
          .map(
            (param) =>
              `${encodeURIComponent(param)}=${encodeURIComponent(q[param])}`
          )
          .join("&")
      : "";
  };
  private async apiFetch(
    url: string,
    requestInit: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    requestData: object | undefined = undefined
  ): Promise<any> {
    try {
      const token: string = (await getCookie("token")) as string;
      if (!url) throw "No url provided";

      const init = {
        ...DEFAULT_HEADERS,
        ...requestInit,
        Authorization: token,
        ...(requestData
          ? { body: JSON.stringify(this.validateRequest(requestData)) }
          : {}),
      };
      init.headers = {
        ...(init.headers ?? {}),
      };

      const response = await fetch(`${BASEURL}${url}`, init);

      // Handle successful responses
      if (
        response.status >= eHTTPStatusCode.OK &&
        response.status <= eHTTPStatusCode.VALID_REQUEST
      ) {
        return response;
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  public post = async (url: string, data = {}, headers?: any): Promise<any> => {
    return await this.apiFetch(
      url,
      {
        ...(headers ? { headers } : {}),
        method: "POST",
      },
      data
    );
  };
  public async patch(url: string, data = {}, headers?: any): Promise<any> {
    return await this.apiFetch(
      `${url}`,
      {
        ...(headers ? { headers } : {}),
        method: "PATCH",
      },
      data
    );
  }
  public async delete(url: string, data = {}, headers?: any): Promise<any> {
    return await this.apiFetch(
      `${url}${this.getQueryString(data)}`,
      {
        ...(headers ? { headers } : {}),
        method: "DELETE",
      },
      data
    );
  }

  public async get(url: string, data = {}, headers?: any): Promise<any> {
    return await this.apiFetch(
      `${url}${this.getQueryString(data)}`,
      {
        ...(headers ? { headers } : {}),
        method: "GET",
      },
      data
    );
  }
}
const apiUtil: ApiUtil = ApiUtil.getClientInstance();
export { apiUtil as default };
