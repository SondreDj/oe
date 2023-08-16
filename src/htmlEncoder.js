module.exports = function(string) {
    // this function is used on the server to html encode string to avoid XSS
    return (""+string).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}