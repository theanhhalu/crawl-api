
// exports.getText = $ => $.remove().end().text().trim();

exports.getText = ($,i) => $.eq(i).find("td").text().trim();