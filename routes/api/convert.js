import { parse as uuidParse } from 'uuid';

const convertInt = (aId) => {
    const parsed = uuidParse(aId) ; //Uint8Array[16]
    console.log(`convertjs;uuid ${aId} parsed as ${parsed}`);
    const buffered =Buffer.from(parsed);
    const result = buffered.readUInt32BE(0);
    console.log(`result integer is ${result}`);
    return result;
};
export default convertInt;