// Imports.
import './config/database';
import express from 'express';

// Express config.
const port = process.env.PORT || 5000;
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Express plugins.
app.use(require('helmet')());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true, limit: '50mb' }));
app.use(require('cors')());

// Routes.
require('./router').default(app);

// Listener.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
