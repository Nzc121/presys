const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const path = require('path');

app.use('/',express.static('public'))
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


app.listen(10121)