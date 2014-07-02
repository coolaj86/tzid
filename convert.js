'use strict';

var fs = require('fs')
  ;

function parse(str) {
  var lines = str.trim().split(/\n/)
    , header
    ;

  header = lines.shift();
  console.log('header', header);

  lines.forEach(function (line, i) {
    line = line.trim()
      .replace(/^([A-Zh]+)\s+/g, '$1_')
      .replace(/\s+(UTC)\s*([+-])?\s*([\d:]+)?.*$/g, '_$1_$2$3')
      .replace(/\s+((?:North|South|Indian|Central)\s)?(\w+)\s*_/g, '_$1$2_')
      .replace(/\s+/g, ' ')
      ;
    lines[i] = line.split(/_/g);
    lines[i].splice(3, 1);
  });

  //console.log(lines);
  return lines;
}

fs.readFile('./timezones.txt', 'utf8', function (err, data) {
  var db
    ;

  if (err) {
    console.error(err);
    return;
  }

  db = parse(data);
  db.forEach(function (line) {
    if (4 !== line.length) {
      console.log(line);
    }
  });

  console.log('done');
});
