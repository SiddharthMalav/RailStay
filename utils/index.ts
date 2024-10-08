/**
 * Index.ts
 * This Component is used to write common function to used them throughout the project..
 */

declare const document: any;
declare const Element: any;

export default class Utils {
  static routeCreate(data: any, queryParams: any, router: any) {
    for (let i = 0; i < data.length; i++) {
      queryParams.append(
        `${Object.keys(data[i])[0]}`,
        Object.values(data[i])[0]
      );
    }

    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  }

  // //return params from query string
  // static getQuery() {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const paramsObject: { [key: string]: string } = {};
  //   queryParams.forEach((value: string, key: string) => {
  //     paramsObject[key] = value;
  //   });
  //   return paramsObject;
  // }

  static getQuery() {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const paramsObject: { [key: string]: string } = {};
      queryParams.forEach((value: string, key: string) => {
        paramsObject[key] = value;
      });
      return paramsObject;
    }

    // Return an empty object or handle server-side logic here if needed
    return {};
  }

  //for creating new route
  static updateQueryParams(
    filterModel: {
      [key: string]: string | number;
    },
    router: any
  ) {
    const queryParams = new URLSearchParams(window.location.search);
    Object.entries(filterModel).forEach(([key, value]) => {
      queryParams.set(key, value.toString()); // Convert value to string if it's a number
    });
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  }

  //reseting route to initial stage
  static resetRoute(router: any) {
    router.push(`${window.location.pathname}`);
  }

  // fullscreen mode
  static upFullScreen() {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
  }

  //   // close fullscreen mode
  static downFullScreen() {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  /**
   * is null or undefined
   * @param value
   * @returns
   */
  static isNullOrUndefined = (value: any) => [null, undefined].includes(value);

  // static isFalsy = (value: any) =>
  //   [undefined, null, '', 0, false].includes(value);
  //   static getInterval = (startTime = Date.now(), endTime = Date.now()) =>
  //     DateUtils.getIntervalString(
  //       DateUtils.getInterval(new Date(startTime), new Date(endTime))
  //     );

  static deepClone = (value: any = {}) => JSON.parse(JSON.stringify(value));

  static getBase64FromByteString = (bytesInString: string = "") => {
    return `data:image/png;base64,${bytesInString}`;
  };

  static getFloatValue = (value: any) =>
    typeof value == "number"
      ? value
      : isNaN(parseFloat(value))
      ? 0
      : parseFloat(value);

  static toUpper = (value: any) =>
    value && typeof value == "string" ? value.toUpperCase() : "";

  static scrollToTop = (top = document.documentElement.scrollHeight) => {
    if (typeof window !== "undefined") {
      window.scroll({
        top: top,
        behavior: "smooth",
      });
    }
  };

  static splittedBase64String = (value: string) => {
    if (!value) {
      return {
        error: "Please provide image base 64 string",
      };
    }
    return /,(.+)/.exec(value)?.[1];
  };

  static preventDefault = (event: any = {}) => {
    event?.preventDefault();
    event?.stopPropagation();
    return false;
  };

  static redirectUrl = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };

  static isFalsy = (value: any) =>
    [undefined, null, "", 0, false].includes(value);

  static sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  static generateIntRandomBetweenMinMax = (
    min: number = 0,
    max: number = 100
  ) => Math.floor(Math.random() * (max - min + 1) + min);

  static getQueryString = (q: any = {}) => {
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

  static delaySetFocus = (key: string, setFocus: any) => {
    return setTimeout(() => {
      setFocus(key);
    }, 100);
  };
  static getDate = (date: string | Date) => {
    const parsedDate = new Date(date); // Convert to Date object if it's a string
    return parsedDate.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
  };

  static dropdownValuebyKey = (
    options: { value: number; label: string }[],
    id: number[] | undefined
  ) => {
    return options.find(
      (item: { value: number | undefined; label: string }) => item?.value === id
    );
  };

  static SUCCESS: any;
}
