import fs from 'fs'
import path from 'path'
export default function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({success:false,error:'Only POST allowed'})
  try{
    const body = req.body || {}
    const {name,email,interest,message} = body
    if(!name || !email) return res.status(400).json({success:false,error:'Name and email required'})
    const dir = path.join(process.cwd(),'data')
    if(!fs.existsSync(dir)) fs.mkdirSync(dir)
    const file = path.join(dir,'submissions.json')
    let arr = []
    if(fs.existsSync(file)){
      try{ arr = JSON.parse(fs.readFileSync(file,'utf8')) }catch(e){ arr = [] }
    }
    const entry = {name,email,interest:interest||'',message:message||'',receivedAt:new Date().toISOString()}
    arr.push(entry)
    fs.writeFileSync(file, JSON.stringify(arr,null,2),'utf8')
    return res.status(200).json({success:true})
  }catch(err){
    return res.status(500).json({success:false,error:err.message})
  }
}
