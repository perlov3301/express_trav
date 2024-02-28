import moment from  './moment.js';
// middleware, that can manage req and/or res
const logger = (req,res,next) => {
    console.log(moment());
    // each and every time I send request through postman
    console.log('request has been send');
    console.log(`protocol of request:${req.protocol}`);
    console.log(`hosts parts of url:${req.get('host')}`);
    console.log(`originalUrl of request: ${req.originalUrl} ${moment()}`);
    next();
}
export default logger;