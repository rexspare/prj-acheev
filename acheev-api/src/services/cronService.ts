import cron from 'node-cron';

const localInfo = (message?: any, ...optionalParams: any[]) => {
  console.info(new Date().toLocaleString() + ":", message, ...optionalParams);
}

export const startCronService = () => {
  localInfo("Starting cron service");

  // Every 2 minutes
  cron.schedule('*/2 * * * *', () => undefined);

}