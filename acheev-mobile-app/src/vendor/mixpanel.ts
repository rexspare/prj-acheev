import { Platform, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Buffer } from "buffer";

const { width, height } = Dimensions.get("window");

const MIXPANEL_API_URL = "https://api.mixpanel.com";
const MIXPANEL_TOKEN = "73564e03f68c4ba9bd33dbd248c7df9e";
const isIosPlatform = Platform.OS === "ios";

export enum MixpanelEvent {
  PUSH_NOTIFICATION_CLICKED = 'PUSH_NOTIFICATION_CLICKED',
}

export const trackEvent = (userId: string | null | undefined, event: MixpanelEvent, properties?: Object) => {
  return new Mixpanel().track(event,
    {
      distinct_id: userId,
      ...(properties ?? {})
    })
}

export class Mixpanel {
  token: string;
  clientId?: string;
  userAgent?: string | null;
  appName?: string;
  appId?: string;
  appVersion?: string;
  screenSize?: string;
  deviceName?: string;
  platform?: string;
  model?: string;
  osVersion: string | number;
  queue: any[];
  superProps: any = {};


  constructor() {
    this.queue = [];

    this.token = MIXPANEL_TOKEN;
    this.clientId = Constants.deviceId;
    this.osVersion = Platform.Version;
    this.superProps;

    Constants.getWebViewUserAgentAsync().then(userAgent => {
      this.userAgent = userAgent;
      this.appName = Constants.manifest.name;
      this.appId = Constants.manifest.slug;
      this.appVersion = Constants.manifest.version;
      this.screenSize = `${width}x${height}`;
      this.deviceName = Constants.deviceName;
      if (isIosPlatform && Constants.platform && Constants.platform.ios) {
        this.platform = Constants.platform.ios.platform;
        this.model = Constants.platform.ios.model;
      } else {
        this.platform = "android";
      }
    }).catch(err => {
      console.warn('mixpanel error', err);
    });
  }


  track(name: string, props?: any) {
    console.info("Tracking event", { name, props, timestamp: new Date().toLocaleTimeString() });
    this._pushEvent({
      name,
      props
    });
  }

  // ===========================================================================================

  _pushEvent(event: { name: string; props: Object }) {
    let data = {
      event: event.name,
      properties: {
        ...(event.props || {}),
        ...this.superProps
      }
    };
    data.properties.token = this.token;
    data.properties.user_agent = this.userAgent;
    data.properties.app_name = this.appName;
    data.properties.app_id = this.appId;
    data.properties.app_version = this.appVersion;
    data.properties.screen_size = this.screenSize;
    data.properties.client_id = this.clientId;
    data.properties.device_name = this.deviceName;
    if (this.platform) {
      data.properties.platform = this.platform;
    }
    if (this.model) {
      data.properties.model = this.model;
    }
    if (this.osVersion) {
      data.properties.os_version = this.osVersion;
    }

    const buffer = new Buffer(JSON.stringify(data)).toString("base64");

    return fetch(`${MIXPANEL_API_URL}/track/?data=${buffer}`).catch(console.error);
  }

  _pushProfile(data: Object) {
    data = new Buffer(JSON.stringify(data)).toString("base64");
    return fetch(`${MIXPANEL_API_URL}/engage/?data=${data}`).catch(console.error);
  }
}
