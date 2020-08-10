export const getNumberWithDot = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const convertFullSalary = (min, minUnit, max, maxUnit) => {
    let result = '';
    if (min) {
        result += getNumberWithDot(min);
        if (minUnit && minUnit !== maxUnit) {
            result += '/' + minUnit;
        }
    }
    if (max) {
        if (result) {
            result += ' - '
        }
        result += getNumberWithDot(max);
        if (maxUnit) {
            result += '/' + maxUnit;
        }
    }
    if (!result) {
        result = 'Thỏa thuận'
    }
    return result;
};

export const convertSalary = (min, max, unit) => {
    return convertFullSalary(min, null, max, unit);
};
