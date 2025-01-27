import SendGridMail from '@sendgrid/mail';

import { isDevEnvironment } from '../shared/utilities';

const FROM_EMAIL = 'team@acheevapp.io';
const FROM_NAME = 'The Acheev Team';

export enum EmailTemplateIds {
  NEW_NOTIFICATION = 'd-XX',
}

export type IEmptyEmailParams = {}
export type INotificationParams = {
  message: string;
  type: string;
}

interface EmailParams<T> {
  params?: T;
}

// interface ITemplateParams {
//   id?: string;
//   params?: {
//     message?: string;
//     code?: string;
//   };
// }

export type SendGridEmail =
  ({ id: EmailTemplateIds.NEW_NOTIFICATION } & EmailParams<INotificationParams>);


const { SENDGRID_KEY, ADMIN_EMAIL } = process.env;
SendGridMail.setApiKey(SENDGRID_KEY ?? "DNE");

// Configure the substitution tag wrappers globally
SendGridMail.setSubstitutionWrappers('{{', '}}');


export class EmailService {

  public static sendgridSendEmail = async (emailAddress: string, name: string | undefined, email: SendGridEmail, failSilently = true) => {
    console.log("Sending email to: ", email);
    const substitutions = {
      name: name,
      ...email.params
    }

    const message = {
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME
      },
      to: {
        email: (isDevEnvironment() && !!ADMIN_EMAIL) ? ADMIN_EMAIL : emailAddress,
        name: name,
      },
      templateId: email.id,
      dynamicTemplateData: substitutions,
      html: "Please enable HTML"
    }

    return SendGridMail.send(message).then((res) => {
      console.log(res);
    }).catch(error => {
      if (failSilently) {
        console.error(error.response.body);
        return console.error(error);
      }

      console.error(error);

      throw new Error(error);
    });
  }

  public static sendgridSendUserEmail = (
    email: string,
    name: string | undefined,
    emailContent: SendGridEmail,
    failSilently = true
  ) => {
    return EmailService.sendgridSendEmail(email, name, emailContent, failSilently);
  }
}
