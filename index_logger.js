import express from 'express';
import path from 'node:path';
import members from './members.js';
import myDir from './mydir.js';
import logger from './middleware/logger.js';

const app = express();

// init middleware
app.use(logger);
// route for dynamicly serving to get all
app.get('/api/members', (req,res)=>{
    // express take care about stringify
    res.json(members); 
});
// creting of route for static serving
const pubFolder = path.join(myDir(),'public');
app.use(express.static(pubFolder));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{ console.log(`app started on port ${PORT}`);
});