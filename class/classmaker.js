const beautify = require('js-beautify').js_beautify

class ClassMaker{
    constructor(){
        this._set = new Set();
    }

    setName(_name){
        this.name = this.normalize(_name);
    }

    getName(){
        return this.name;
    }

    setAttribute(_attribute){
        this._set.add(_attribute);
    }  
     
    normalize(_name){
        return _name.charAt(0).toUpperCase() + _name.slice(1);
    }

    makeSetter(_var){
        var _upVar = this.normalize(_var);
        return `set${_upVar}(_${_var}){
            this.${_var}=_${_var};
        }`;
    }

    makeGetter(_var){
        var _upVar = this.normalize(_var);        
        return `get${_upVar}(){
            return this.${_var};
        }`;
    }

    makeConstructor(){
        return `constructor(){
            //Empty Constructor
        }`;
    }

    makeES6Class(){
        var header = `class ${this.name}`;
        var getSetMethods = "";
        this._set.forEach((value)=>{
            getSetMethods += "    "+this.makeSetter(value)+"\n";
            getSetMethods += "    "+this.makeGetter(value)+"\n";
        });
        var finalClass = `${header}{
            ${this.makeConstructor()}
            ${getSetMethods}}`;
        return beautify(finalClass, {indent_size:2});
    }
}

module.exports = ClassMaker;
