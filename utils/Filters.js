import calculateAge from './CalculateAge';
import _ from 'lodash';

export function GenderFilter(array, gender = 'both') {
    if (gender === 'both') {
        return array;
    } else {
        return _.filter(array, function (item) {
            return item.gender === gender;
        });
    }
}

export function AgeFrom(array, ageFrom = 0) {
    return _.filter(array, function (item) {
        let age = calculateAge(item.dob);
        return age >= ageFrom;
    });
}

export function AgeTo(array, ageTo = 500) {
    return _.filter(array, function (item) {
        let age = calculateAge(item.dob);
        return age < ageTo;
    });
}

export function Search(array, search = '') {
    let searchStr = search.toUpperCase();
    if (isEmpty(search)) {
        return array;
    }
    if (searchStr.length < 2) {
        return array;
    }
    if (searchStr.length > 1) {
        return array.filter(item => {
            let lc = item.first_name.toUpperCase() + ' ' + item.last_name.toUpperCase();
            return lc.includes(searchStr);
        });
    }
}

function isEmpty(val) {
    if (!val) {
        return false;
    }
    let str = val.replace(/\s+/, '');
    return str.length === 0;
}
