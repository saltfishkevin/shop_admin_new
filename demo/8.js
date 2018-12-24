const fs=require('fs')
let p=new Promise (function(resolve,reject){
  fs.readFile('./a.txt','utf8',(err,data)=>{
    if(err){
      reject(err)
    }else{
      resolve(data)
    }
  })
})

p.then(function(data){
  console.log(data)
})
