const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const path = require('path');
const db = require('./services/database'); //database
const cors = require('cors');
const authenticationService = require("./services/authentication");
const fs = require('fs')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'requests.log'), { flags: 'a' })
// write detailed logs into the specified file
app.use(morgan('combined', { stream: accessLogStream }))
// write short logs into the console
app.use(morgan('short'))

// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://hannahfrank.at https://www.hannahfrank.at");
//     return next();
// });

const allowedOrigins = [
    'https://www.hannahfrank.at/blourish-and-flotts',
    'https://hannahfrank.at/blourish-and-flotts',
    'https://www.hannahfrank.at',
    'https://hannahfrank.at',
    'https://blourish.hannahfrank.at',
    /\.onrender\.com$/  // Allow all Render domains
  ];

app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // check if the origin is one of the allowed origins (supports strings and regex)
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return allowed === origin;
      });

      if (!isAllowed) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

// app.use(cors({
//     /*origin: 'https://cc221009-10130.node.fhstp.io',*/
//    origin: 'https://hannahfrank.at/blourish-and-flotts',
//    credentials: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//app.use(authenticationService.getLoggedMember);

app.use('/images', express.static('/images'));


app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./routes/index'));
app.use('/api/members', require('./routes/members'));
app.use('/api/shop', require('./routes/books'));
app.use('/api/cart', require('./routes/cart'));


// Serve Vue app for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
