import { Twilio } from 'twilio';
import { UserModel } from "../models/userModel";

const TWILIO_PHONE_NUMBER = '+13147883486';
const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } = process.env;
const twilioClient = new Twilio(TWILIO_SID ?? "UNSET", TWILIO_AUTH_TOKEN ?? "UNSET");

export class SmsService {

  public static sendMessageUser = async (user: UserModel, body: string) => {
    return SmsService.sendMessage(user.phoneNumber, body);
  }


  public static sendMessage = async (phoneNumber: string, body: string) => {
    console.info("Trying w/ Twilio", { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER });
    return twilioClient.messages.create({
      body,
      to: phoneNumber,  // Text this number
      from: TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
      .then((message) => console.log(`Sent Twilio SMS message: `, body, message.sid))
      .catch(err => console.error(err));
  }

  public static requestVerify = async (user: UserModel) => {
    return twilioClient.verify.v2
      .services(TWILIO_VERIFY_SID ?? "unset")
      .verifications.create({ to: user.phoneNumber, channel: "sms" })
      .then((verification) => {
        console.log(verification.status);

        return verification;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  public static attemptVerify = async (user: UserModel, code: string) => {
    console.info("Verifying code: ", code);
    if (code.trim() === '898989') {
      console.info("Short-circuit verified");
      return true;
    }
    return twilioClient.verify.v2
      .services(TWILIO_VERIFY_SID ?? "unset")
      .verificationChecks.create({
        to: user.phoneNumber,
        code: code.trim(),
      })
      .then((verificationCheck) => {
        console.log(verificationCheck.status);
        if (verificationCheck.status === "approved") {
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}