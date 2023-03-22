import db from "../../server/database/Index";

export default  async function handler(req, res){
    db().catch(error=> res.json({error:"Connection Failed...!"}))

    // Only post method is accepted
    if(req.method ==="POST"){

    }else{
        res.status(500).json({})
    }
}