const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

    res.write('1. You have to group the below words by having the same letter but different position\n');
    res.write(groupWords());
    res.write('\n');
    res.write('2. You have to remove the parentheses and reverse the word inside.\n');
    res.write(reverseRemoveParen());
    res.end();

});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const words = ['AMOR', 'XISELA', 'JAMON', 'ROMA', 'OMAR', 
            'MORA', 'ESPONJA', 'RAMO', 'JAPONES', 'ARMO', 
            'MOJAN', 'MARO', 'ORAM', 'MONJA', 'ALEXIS'];

function groupWords() { 
    var output = "";

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    var wordToGroups = [];

    words.forEach(function(value) {
        wordToGroups.push({ length: value.length, value: value });
    })

    var groupedWords = groupBy(wordToGroups, 'length');

    for (var key in groupedWords) {
        var arr = groupedWords[key];

        console.log(arr[0]['value']);
        output += matchWord(arr[0]['value']) + '\n';
     }

    return output; 
} 

function matchWord(word) {
    var array;
    var sortString = function(str) {
        array = word.split("");
        array.sort();
        str = array.join("");

        return str;
    }

    var text = "";
    var matched = [];
    words.forEach(function(value) {
        if (sortString(value) == sortString(word) && value.length == word.length) {
            if (text.length == 0) {
                text = value;  
            } else {
                text = text + ' - ' + value;
            }

            matched.push(value);
        }
    })

    return text;
}

function reverseRemoveParen() {
    var array;
    var reversString = function (str) {
        array = str.replace("(","").replace(")","").split("");
        array.reverse();
        str = array.join('');
        return str.replace("(","").replace(")","");
    }

    var output = "";
    const fooWords = ['foo(bar)','(bar)','foo(bar)blim','foo(foo(bar))blim'];

    fooWords.forEach(function(value) {
        var start = value.indexOf('(');
        var end = value.lastIndexOf(')') + 1;
        var str = value.substr(start, end - start);
        console.log(str);
        var rvStr = reversString(str);

        //console.log(value + ' => ' + value.replace(str, rvStr));
        output += value + ' => ' + value.replace(str, rvStr) + '\n';
    })

    return output;
}

