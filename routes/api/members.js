import express from 'express';
import path from 'node:path';
import myDir from '../../mydir.js';
import members from '../../array_members.js';
import crypto from 'node:crypto'; // crypto.randomUUID()

const app = express();
const router = express.Router();
// route for dynamicly serving to get all members
router.get('/', (req,res)=>{
    // express take care about stringify
    res.json(members); 
});

// get single member with url parameter 'id'
router.get(`/:id`, (req,res)=>{
    // we can use req Object to get id
    const allpar = req.params;
    const aId = allpar.id;
    const idNumber = parseInt(req.params.id);
    console.log(`indexjs;get; parse(id): ${idNumber} of type ${typeof idNumber}`);
    // members.forEach(obj=>{ console.log(obj);});
    let mysingle = {};
    const found = members.some(member=> member.id===idNumber);//true or false
    if (found) {
      const myfilter = members.filter((obj)=> obj.id===idNumber );
      mysingle = myfilter[0];
      console.log(`mysingle id:${mysingle.id}, name:${mysingle.name}`);
      res.json(mysingle);
    } else { 
        res.status(400).json({msg:`Member with id of ${idNumber} not found`});
     }
}) ;// get
// create a Member
router.post('/', (req,res)=>{
  const newMember = {
    id: crypto.randomUUID(), //or uuid.v4(),
    name:req.body.name, 
    email: req.body.email,
    status:'active'
  };
  if(!newMember.name || !newMember.email){
    return res.status(400).json({msg:'Please include a name and email'});
  }
  // in the case of mongoDb: members.save(newMember)
  // in this cours its only file with array:
  members.push(newMember);
  // res.send(req.body);
  res.json(members);
});//post
// update member
router.put(`/:id`, (req,res)=>{
  // we can use req Object to get id
  const aId = req.params.id;
  const idNumber = parseInt(aId);
  console.log(`indexjs;put; update parse(id): ${idNumber} of type ${typeof idNumber}`);
  const found = members.some(member=> member.id===idNumber);//true or false
  if (found) {
    const updMember = req.body; // name and email
    console.log(`updMember id:${updMember.id}, name:${updMember.name}`);
    members.forEach(mem=>{
      if(mem.id===idNumber) {
         mem.name = updMember.name ? updMember.name : mem.name;
         mem.email= updMember.email ? updMember.email : mem.email;
         res.json({msg: 'Member updated',member:mem});
      }
    });
  } else { 
      res.status(400).json({msg:`Member with id of ${idNumber} not found`});
   }
}) ;//put
//delete
router.delete(`/:id`, (req,res)=>{
  // we can use req Object to get id
  const aId = req.params.id;
  const idNumber = parseInt(aId);
  console.log(`indexjs;delete; parse(id): ${idNumber} of type ${typeof idNumber}`);
  // members.forEach(obj=>{ console.log(obj);});
  let mysingle = {};
  const found = members.some(member=> member.id===idNumber);//true or false
  if (found) {
    const myfiltered = members.filter((obj)=> obj.id !== idNumber );
    res.json({
      msg: 'Member deleted',
      members: myfiltered
    });
  } else { 
      res.status(400).json({msg:`Member with id of ${idNumber} not found`});
   }
}) ;


export default router;