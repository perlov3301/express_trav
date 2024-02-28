import path from 'node:path';
import { fileURLToPath } from "node:url";

const myDir = () => {
    const myurl = import.meta.url;
    const mypath = fileURLToPath(myurl);
    const mydir = path.dirname(mypath);
    console.log(`mydir: ${mydir}`);
    return mydir;
}
export default myDir;