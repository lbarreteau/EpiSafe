function getChart1 (repo, id) {
    let compilation_good = 0;
    let compilation_bad = 0;
    for (let j = 0; j < repo[id][1].compilation_log.length; j++) {
        if (repo[id][1].compilation_log[j].status == 0) {
            compilation_good++;
        } else {
            compilation_bad++;
        }
    }
    // make average in percent of compilation good results and rounding to 2 decimal points
    let compilation_good_percent = compilation_good / (compilation_bad + compilation_good) * 100;
    compilation_good_percent = Math.round(compilation_good_percent);
    return { good: compilation_good, bad: compilation_bad, percent: compilation_good_percent };
}

module.exports = { getChart1 };