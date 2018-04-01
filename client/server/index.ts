import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as fetch from 'isomorphic-unfetch';
import * as jwtDecode from 'jwt-decode';
import * as next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(cookieParser());

        server.use(bodyParser.urlencoded({ extended: true }));

        server.use(bodyParser.json());

        // Dummy login backend
        server.post('/api/session', async (req, res) => {
            const response = await fetch('http://localhost:3001/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            const token = await response.headers.get('Authorization');

            if (response.status === 200) {
                const decoded = jwtDecode(token);

                res.cookie('session_id', token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                });

                res.send(decoded.guid);
            } else {
                res.status(404).send({ message: 'Wrong user or pass' });
            }
        });

        // Removes the session cookie and sends an empty response
        server.get('/api/logout', (req, res) => {
            res.clearCookie('session_id');
            res.send({});
        });

        // Returns the current logged in user or 404 based on the session cookie.
        // This is called server side the first page load.
        server.get('/api/whoami', (req, res) => {
            try {
                const decoded = jwtDecode(req.cookies.session_id);

                res.send(decoded);
            } catch (err) {
                res.status(404).send();
            }
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            // tslint:disable-next-line:no-console
            console.log('> Ready on http://localhost:' + port);
        });
    })
    .catch(ex => {
        // tslint:disable-next-line:no-console
        console.error(ex.stack);
        process.exit(1);
    });
