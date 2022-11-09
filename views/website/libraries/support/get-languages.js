const fs = require("fs");

function numericCompare(a, b) {
    const lhs = parseInt(a, 10);
    const rhs = parseInt(b, 10);

    return lhs - rhs;
}

module.exports = function getLanguages() {
    let dirEntries = fs.readdirSync(`${__dirname}/../`);
    dirEntries = dirEntries.filter((e) => e.endsWith(".json"));
    dirEntries.sort(numericCompare);

    console.log("Found languages:\n", dirEntries);

    const result = [];
    dirEntries.forEach((entry) => {
        const data = JSON.parse(
            fs.readFileSync(`${__dirname}/../${entry}`).toString()
        );

        result.push(data);
    });

    result.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    })

    return result;
};
