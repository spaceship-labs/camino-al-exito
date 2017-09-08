//rename 's/ /_/g' *
//rename 's/JPG/jpg/g' *

var fs = require('fs');

function process(prefix, cct) {
  var files = fs.readdirSync('./app/images/winners/' + cct)
    .filter((f) => {
    return f.indexOf('png') != -1 || f.indexOf('jpg') != -1;
  }).map((f) => {
    return prefix+cct+'/'+f;
  });

  console.log('files', files);
}

process('/images/winners/', '11ETV0320L');
