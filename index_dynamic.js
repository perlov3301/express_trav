import express from 'express';
import path from 'node:path';
// import fs from 'node:fs';
import { fileURLToPath } from "node:url";

function myDir () {
    const myurl = import.meta.url;
    const mypath = fileURLToPath(myurl);
    const mydir = path.dirname(mypath);
    console.log(`mydir: ${mydir}`);
    return mydir;
}

const app = express();
// creting of route for dynamic serving
app.get('/', (req,res)=>{
    // res.send("<h1 style='text-align:center' >Hello World:indexjs</h1>");
    const myfile = path.join(myDir(), 'public', 'index_dynamic.html');
    res.sendFile(myfile);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{ console.log(`app started on port ${PORT}`);
});