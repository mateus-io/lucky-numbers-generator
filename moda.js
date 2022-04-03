'use strict'
 /**/

 function moda (arr) {
   return ((arr.sort((a, b) =>
   (arr.filter(v => v === a).length) - (arr.filter(v => v === b).length))
 ).pop())
 }
module.exports = moda