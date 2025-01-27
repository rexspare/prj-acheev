import { Application, NextFunction, Request, Response, Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import { bodyParserGraphQL } from 'body-parser-graphql';
import compression from 'compression';

export const handleCors = (app: Router | Application) =>
  app.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (app: Router | Application) => {
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.use(bodyParserGraphQL())
};

export const handleCompression = (app: Router | Application) => {
  app.use(compression());
};

export const errorDelivery = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err, req, res);
  next(err);
};
