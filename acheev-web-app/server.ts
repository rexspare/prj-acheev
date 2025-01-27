import express from 'express';
import { redirectToHTTPS } from 'express-http-to-https';

const log = (message: string) => console.log(`[Startup] ${message}`);
const environment = process.env.NODE_ENV;

const app = express();
const port = process.env.PORT || 3022;

log(`Using static directory: static - maxAge=1y, immutable`);
app.use(express.static('static', {
  maxAge: '1y',
  immutable: true
}));

log(`Using static directory: ${__dirname} - maxAge=0, lastModified, etag`);
app.use(express.static(`${__dirname}`, {
  maxAge: 0,
  lastModified: true,
  etag: true,
}));

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));


app.get('*', function (req, res) {
  res.status(404).sendFile(`${__dirname}/index.html`)
});


app.listen(port, () => log(` Server started on port ${port} for environment: ${environment} `));