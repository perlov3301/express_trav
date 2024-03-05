import express from 'express';
import path from 'node:path';
import members from './array_members.js';
import myDir from './mydir.js';
import logger from './middleware/logger.js';
import router from './routes/api/members.js'


const app = express();
// init middleware
// app.use(logger);

//body parser middleware
app.use(express.json());
//choosing between parsing URL encoding data(false) and qs library
app.use(express.urlencoded({ extended: false }));

/**
 app.get('/api/members', (req,res)=>{
    // express take care about stringify
    res.json(members); 
});

// get single member with url parameter 'id'
app.get(`/api/members/:id`, (req,res)=>{
    // we can use req Object to get id
    const allpar = req.params;
    const aId = allpar.id;
    const idNumber = parseInt(req.params.id);
    console.log(`indexjs: parse(id): ${idNumber} of type ${typeof idNumber}`);
    // members.forEach(obj=>{ console.log(obj);});
    let mysingle = {};
    const found = members.some(member=> member.id===idNumber);//true or false
    if (found) {
      const myfilter = members.filter((obj)=> obj.id===idNumber );
      mysingle = myfilter[0];
      console.log(`mysingle id:${mysingle.id}, name:${mysingle.name}`);
      res.json(mysingle);
    } else { // bad request
        res.status(400).json({msg:`Member with id of ${idNumber} not found`});
     }
    
}) ;
 */

// creting of route for static serving
const pubFolder = path.join(myDir(),'public');
app.use(express.static(pubFolder));
// router like static folder with '/api/members'
// members API routes
app.use('/api/members', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{ console.log(`app started on port ${PORT}`);
});