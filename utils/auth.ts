/**
 * Auth.ts
 * This Auth Component is used for user session management.
 */

import { env } from "@/env";
import Utils from ".";
import apiUtil from "./api";
import { ApiToGetNewAccessToken } from "./api.constant";
import { eHTTPStatusCode } from "./enum";
import { StoreUtil } from "./store";

const NEXT_PUBLIC_ACCESS_TOKEN_KEY = env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "";
const NEXT_PUBLIC_REFRESH_TOKEN_KEY = env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "";
const NEXT_PUBLIC_TOKEN_TIMEOUT = env.NEXT_PUBLIC_TOKEN_TIMEOUT || "";
const NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT =
  env.NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT || "";

let lastRefreshToken: string | null = null;
class AuthUtil {
  static async setLoggedUserDetail() {
    // store token
    // StoreUtil.set(NEXT_PUBLIC_ACCESS_TOKEN_KEY, user.accessToken);
    // StoreUtil.set(NEXT_PUBLIC_REFRESH_TOKEN_KEY, user.refreshToken);

    // retrieve current logged user
    return await AuthUtil.getLoggedUserDetail();
  }

  static async getLoggedUserDetail<TUser>(): Promise<TUser | undefined> {
    // if (this.isTokenExist()) {
    // const { data: gqlData } = await AuthUtil.client.query<
    //   QGetUserProfileAllDetailsQuery,
    //   QGetUserProfileAllDetailsQueryVariables
    // >({
    //   query: QGetUserProfileAllDetailsDocument,
    // });
    //const { getUserProfile } = gqlData.userManagementQuery as any;
    //const { data } = getUserProfile;
    //return data?.[0] as TUser;
    // }
    return undefined;
  }

  static async fetchPreferences<TPreference>(): Promise<TPreference | null> {
    // const { data: gqlData } = await AuthUtil.client.query({
    //   query: GQLUser.fetchPreferencesByRole(),
    // });
    // const { fetchPreferencesByRole } = gqlData as any;
    // const { data } = fetchPreferencesByRole;
    // return data as TPreference;
    return null;
  }

  static async logout(
    locally = false,
    { history }: any = {}
  ): Promise<Boolean> {
    try {
      // either remove local or both server
      if (!locally) {
        // const { data: gqlData } = await AuthUtil.client.mutate({
        //   mutation: GQLUser.signOut(),
        //   variables: {},
        // });
      }
      // const { getLoggedUserDetail } = gqlData as any;
      // const { resultCode } = getLoggedUserDetail;
    } catch (e) {
    } finally {
      // remove token
      StoreUtil.removeCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
      StoreUtil.removeCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
      StoreUtil.removeCookie(NEXT_PUBLIC_TOKEN_TIMEOUT);
      StoreUtil.removeCookie(NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT);
      StoreUtil.removeAllCookies();
      Utils.redirectUrl(`/auth/sign-in`);

      // reload to site main page
      // Utils.redirectUrl(NEXT_PUBLIC_SITE_BASEURL);
      if (history) history.push("/");
      // else Utils.redirectUrl(NEXT_PUBLIC_SITE_BASEURL);
    }
    return true;
  }

  static isTokenExist() {
    const token = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return !Utils.isNullOrUndefined(token);
  }

  static setToken(token: string, timeout: number) {
    StoreUtil.setCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY, token);
    this.setApplicationTimeOut(timeout);
  }

  static setRefreshToken(refresh_Token: string, timeout: number) {
    StoreUtil.setCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY, refresh_Token);
    this.setRefreshTokenTimeout(timeout);
  }

  static getToken(): object {
    const token: any = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  static getRefreshToken() {
    const refresh_Token = StoreUtil.getCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
    return refresh_Token;
  }

  static getTokenWithOutBearer(): object {
    const token: any = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return token ? { Authorization: token } : {};
  }

  static setApplicationTimeOut(timeout: number) {
    const expiresIn = Date.now() + timeout * 1000;
    StoreUtil.setCookie(NEXT_PUBLIC_TOKEN_TIMEOUT, expiresIn.toString());
  }

  // The `10` ensures the string is parsed as a base-10 (decimal) number.
  static getApplicationTimeOut(): number {
    return parseInt(
      StoreUtil.getCookie(NEXT_PUBLIC_TOKEN_TIMEOUT) as string,
      10
    );
  }

  static isTokenExpired(): boolean {
    const expiresIn = this.getApplicationTimeOut();
    return Date.now() > expiresIn;
  }

  static setRefreshTokenTimeout(timeout: number) {
    const expiresIn = Date.now() + timeout * 1000;
    StoreUtil.setCookie(
      NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT,
      expiresIn.toString()
    );
  }

  // The `10` ensures the string is parsed as a base-10 (decimal) number.
  static getRefreshTokenTimeout(): number {
    return parseInt(
      StoreUtil.getCookie(NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT) as string,
      10
    );
  }

  static isRefreshTokenExpired(): boolean {
    const refreshTokenExpiresIn = this.getRefreshTokenTimeout();
    return Date.now() > refreshTokenExpiresIn;
  }

  static async getAccessToken() {
    try {
      if (this.isRefreshTokenExpired()) {
        this.logout();
        return { status: eHTTPStatusCode.UNAUTHORIZED };
      }

      const refreshToken = this.getRefreshToken();
      if (lastRefreshToken !== refreshToken) {
        lastRefreshToken = refreshToken;

        if (this.isTokenExpired()) {
          const payload = { refreshToken };

          try {
            const response = await apiUtil.post(
              ApiToGetNewAccessToken,
              payload
            );

            if (response && response.access_token) {
              return response;
            } else {
              this.logout();
              return { status: eHTTPStatusCode.UNAUTHORIZED };
            }
          } catch (error) {
            this.logout();
            return { status: eHTTPStatusCode.UNAUTHORIZED };
          }
        }
      }
    } catch (error) {
      this.logout();
      return { status: eHTTPStatusCode.UNAUTHORIZED };
    }
  }
}

export { AuthUtil as default };
