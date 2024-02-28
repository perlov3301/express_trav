const myTime = () => {
    const myT = new Date();
    const myH = myT.getHours();
    const myM = myT.getMinutes();
    let myTt = "";
    if (myM<9) { myTt = `${myH}:0${myM}`; }
    else { myTt = `${myH}:${myM}`; }
    return myTt;
};

export default myTime;