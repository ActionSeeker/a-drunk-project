const fs = require('fs');
const path = require('path');
const EEXISTS = 'EEXISTS';

exports.removeDirectory = function(dirname){
    console.log(dirname);
    return new Promise((resolve, reject)=>{
        fs.rmdir(dirname, (err, data)=>{
            if(err){
                resolve("EEXIST");
            } else {
                resolve("SUCCESS");
            }
        });
    });
}

exports.createDirectory = function(dirname){
    return new Promise((resolve, reject)=>{
        // Create a new directory
        fs.mkdir(dirname, (err, data)=>{
            if(err){
                resolve("EEXIST");
            } else {
                resolve("DONE");
            }
        });      
    });
}

exports.getFileNames = function(dirname){
    return new Promise((resolve, reject)=>{
        fs.readdir(dirname, (err, files)=>{
            if(err){
                reject("ERROR while fetching files");
            } else {
                var jsons = files.filter((file)=>{
                    if(path.extname(file) === ".json"){
                        return file;
                    }
                })
                resolve(jsons);
            }
        });
    });
}

exports.getFileData = function(filename){
    return fs.readFileSync(filename, 'utf-8');
}

exports.saveFile = function(filename, data){
    return fs.writeFileSync(filename, data, 'utf-8');
}