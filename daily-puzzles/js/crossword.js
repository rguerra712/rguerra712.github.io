var exports = exports || {};
var crossword = crossword || {};

(function(crossword) {

    crossword.getCrosswordUrl = function(date) {
        if (!date) {
            date = new Date();
        }
        let dd = ("0" + date.getDate()).slice(-2);
        let mm = ("0" + (date.getMonth() + 1)).slice(-2);
        let yyyy = date.getFullYear();
        let yy = (yyyy % 100).toString().slice(-2);
        return `http://www.mirroreyes.com/crossword/${yyyy}/c${yy}${mm}${dd}.html`;
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('crossword').src = crossword.getCrosswordUrl();
    });

    exports.getCrosswordUrl = crossword.getCrosswordUrl;
})(crossword);