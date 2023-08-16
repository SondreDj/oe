const fs = require('fs');
const htmlEncode = require('./htmlEncoder');

functions = {
    render,
    renderRaw
}
function render(filePathRelative, args, options) {
    // this function is used on the server to render the page
    // filePathRelative is the relative path to the file
    // args is an object of arguments
    // this function is called on the server
    options = options || {
        ignoreFileNotFound: false,
        error404: "404 Page not found"
    };
    // first check if the file exists
    if (!fs.existsSync("pages/"+filePathRelative+".ø")) {
        if (options.ignoreFileNotFound) {
            return options.error404;
        }
        throw new Error(`File ${filePathRelative} does not exist`);
    }
    // then read the file
    file = fs.readFileSync("pages/"+filePathRelative+".ø", 'utf8');
    // then render the file
    return renderRaw(file, args);
}
function renderRaw(string, args){
    let file = string;
    let tmpString = ""
    // loop through the file looking for "ø<"
    for (let i = 0; i < file.length; i++) {
        if (file[i] === "ø"&&i<file.length-1) {
            i++
            if (i<file.length-1) {
                tmpString = ""
                while (file[i] !== ">") {
                    i++;
                    if (i>file.length-1){
                        throw new Error("Unclosed ø<>");
                    }
                    if (file[i] !== ">"){
                        tmpString+=file[i];
                    }
                }
                i++;
                // evaluate the expression and replace the ø{}
                argsString = JSON.stringify(args).replaceAll('"',"\\\"")
                evaluationString = `args=JSON.parse("${argsString}");(()=>{${tmpString}})()`
                file = file.replaceAll("ø<"+tmpString+">", htmlEncode(eval(evaluationString)));
            }
        }
    }
    return file;
}
module.exports = functions;