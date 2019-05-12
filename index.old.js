const File = require('./file');
const ClassMaker = require('./class');
const INPUT = '/INPUT/';
const OUTPUT = '/OUTPUT/';
const path = require('path');

console.log("Picking up files from INPUT directory");

const THIS_INPUT = __dirname + INPUT;
const THIS_OUTPUT = path.join(__dirname, path.sep, '..', OUTPUT);//__dirname+OUTPUT;

File.createDirectory(THIS_INPUT).then(status => {
    return File.getFileNames(THIS_INPUT);
}).then(files => {
    var classes = new Set();
    files.forEach(file => {
        var jsonString = File.getFileData(THIS_INPUT + file);
        var jsonElement = JSON.parse(jsonString);
        var queue = [{
            "name": "Start",
            "json": jsonElement
        }];
        while (queue.length) {
            var top = queue.shift();
            var keys = Object.keys(top['json']);
            var newClass = new ClassMaker.ClassMaker();
            newClass.setName(top['name']);
            keys.forEach(key => {
                value = top['json'][key];
                if (value instanceof Array) {
                    queue.push({
                        "name": key,
                        "json": value[0]
                    });
                } else if (value instanceof Object) {
                    queue.push({
                        "name": key,
                        "json": value
                    });
                }
                newClass.setAttribute(key);
                classes.add(newClass);
            });
        }
    });
    return classes;
}).then(classes => {
    var classStrings = new Set();
    console.log(classes.size);
    classes.forEach(function (className) {
        classStrings.add({
            "title": className.getName(),
            "content": className.makeES6Class()
        });
    });
    return classStrings;
}).then(classStrings => {
    File.removeDirectory(THIS_OUTPUT).then(status => {
        File.createDirectory(THIS_OUTPUT).then(data => {
            classStrings.forEach((classString) => {
                if (classString !== "[object Object]") {
                    var status = File.saveFile(THIS_OUTPUT + classString.title + '.js', classString.content);
                }
            });
            console.log("DONE");
        });
    });
}).catch(err => {
    console.log(err);
});