import pkg from 'talk-like-a';
// import {chef} from 'talk-like-a';
// const { chef }= require('talk-like-a');
const {chef} = pkg;
const greeting = process.argv[2];
console.log(chef(greeting))
