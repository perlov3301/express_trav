import express from 'express';
import path from 'node:path';
import members from './array_members.js';
import myDir from './mydir.js';
import logger from './middleware/logger.js';
import router from './routes/api/members.js'
import { engine } from 'express-handlebars';
import { ExpressHandlebars } from 'express-handlebars';

const app = express();
// init middleware
// app.use(logger);

// handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


//body parser middleware
app.use(express.json());
//choosing between parsing URL encoding data(extended: false) 
// and qs library(extended:true)
app.use(express.urlencoded({ extended: false }));

// home Page route with index.handlebars
app.get('/', (req, res) => {
  // res.render('home'); // or res.render('index')
  res.render('index.handlebars', {
    title: "a Title (send from res.render)",
    members:members
  });
});

// creting of route for static serving
const pubFolder = path.join(myDir(),'public');
app.use(express.static(pubFolder));
// router is  like static folder with '/api/members'
// members API routes
app.use('/api/members', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{ console.log(`app started on port ${PORT}`);
});