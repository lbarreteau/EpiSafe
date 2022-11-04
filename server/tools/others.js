function getDate() {
    let temp_date = new Date();
    let date = [];
    if (temp_date.getFullYear() < 10) {
        date['year'] = `0${temp_date.getFullYear()}`;
    } else {
        date['year'] = temp_date.getFullYear();
    }
    if (temp_date.getMonth() < 10) {
        date['month'] = `0${temp_date.getMonth()}`;
    } else {
        date['month'] = temp_date.getDate();
    }
    if (temp_date.getDate() < 10) {
        date['day'] = `0${temp_date.getDate()}`;
    } else {
        date['day'] = temp_date.getDate();
    }
    if (temp_date.getHours() < 10) {
        date['hour'] = `0${temp_date.getHours()}`;
    } else {
        date['hour'] = temp_date.getHours();
    }
    if (temp_date.getMinutes() < 10) {
        date['minute'] = `0${temp_date.getMinutes()}`;
    } else {
        date['minute'] = temp_date.getMinutes();
    }
    if (temp_date.getSeconds() < 10) {
        date['second'] = `0${temp_date.getSeconds()}`;
    } else {
        date['second'] = temp_date.getSeconds();
    }
    return date;
}

module.exports = { getDate };