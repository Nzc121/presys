const express = require('express')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose');
const http = require('http')
const fs = require('fs')
const path = require('path');
 
mongoose.connect('mongodb://172.21.2.236:27017/190110910121');

const schema = {
    patno: String,
    outnum : String,
    comment : String,
}

const hos = mongoose.model('docsys', schema);

const schema_pat = {
  patname: String,
  patpwd : String,
}

const pat = mongoose.model('patsys', schema_pat);

const schema_doc = {
  docname: String,
  docpwd : String,
}

const doc = mongoose.model('docnumsys', schema_doc)

app.use('/',express.static('public'))
app.get('/LoginController', function (req, res, next) {
    uname=req.query.username;
    pwd=req.query.password;
    people=req.query.type;
    // res.send("next")
    console.log(people)
    next()
  })

  app.get('/LoginController', function (req, res, next) {
    if(people=="patient"){
        pat.find({'patname':uname},(err,user)=>{
          if(user.length!=0){

          
          if(user[0].patname==uname&&user[0].patpwd==pwd){
            ejs.renderFile('./public/patientindex.html', {uname:uname, chudata:user[0]},  function(err, str){
              // str => 输出渲染后的 HTML 字符串
              if(err){console.log("File is not error.")}
              else{
                res.statusCode=200
                res.setHeader('Content-type', 'text/html');
                res.end(str);
              
              }
            });
          }else{
            ejs.renderFile('./public/login.html', {result:'1'},  function(err, str){
                  // str => 输出渲染后的 HTML 字符串
                  if(err){console.log("File is not error.")}
                  else{
                    res.send(str)
                  }
                });
          }
        }else{
          ejs.renderFile('./public/login.html', {result:'1'},  function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log("File is not error.")}
                else{
                  res.send(str)
                }
              });
        }
        })
   
      
    }
    else{

        doc.find({'docname':uname},(err,user)=>{
          if(user.length!=0){

          
          if(user[0].docname==uname&&user[0].docpwd==pwd){
            ejs.renderFile('doctor_index.html', {result:'1'},  function(err, str){
              // str => 输出渲染后的 HTML 字符串
              if(err){console.log("File is not error.")}
              else{
                res.statusCode=200
                res.setHeader('Content-type', 'text/html');
                res.end(str);
              
              }
            });
          }else{
            ejs.renderFile('./public/login.html', {result:'1'},  function(err, str){
                  // str => 输出渲染后的 HTML 字符串
                  if(err){console.log("File is not error.")}
                  else{
                    res.send(str)
                  }
                });
          }
        }else{
          ejs.renderFile('./public/login.html', {result:'1'},  function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log("File is not error.")}
                else{
                  res.send(str)
                }
              });
        }
        })


     
      
    }
  // next();
  })

  app.get("/AddprescriptionController", (req, res)=>{
    // res.send(req.query)
    // console.log(req.query)
    const chuf = new hos({ patno: req.query.patient, outnum: req.query.inpatientNumber, comment: req.query.content});
    chuf.save()

  
    
    ejs.renderFile("addprescription.html", {returnVal: "success"}, function(err,str){
        res.send(str)
    });
})
// var i =0 ;




  app.listen(10121)