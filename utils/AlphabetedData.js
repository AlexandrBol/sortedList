import _ from 'lodash';

function toAlphabetList(usersData) {
    let AlphabetArray = [
        {data: [], key: 'A'},
        {data: [], key: 'B'},
        {data: [], key: 'C'},
        {data: [], key: 'D'},
        {data: [], key: 'E'},
        {data: [], key: 'F'},
        {data: [], key: 'G'},
        {data: [], key: 'H'},
        {data: [], key: 'I'},
        {data: [], key: 'J'},
        {data: [], key: 'K'},
        {data: [], key: 'L'},
        {data: [], key: 'M'},
        {data: [], key: 'N'},
        {data: [], key: 'O'},
        {data: [], key: 'P'},
        {data: [], key: 'Q'},
        {data: [], key: 'R'},
        {data: [], key: 'S'},
        {data: [], key: 'T'},
        {data: [], key: 'U'},
        {data: [], key: 'V'},
        {data: [], key: 'W'},
        {data: [], key: 'X'},
        {data: [], key: 'Y'},
        {data: [], key: 'Z'},
    ];

    let data = _.cloneDeep(AlphabetArray);

    let usersDataSorted = _.sortBy(usersData, ['first_name', 'last_name']);

    usersDataSorted.map((item, index) => {
        for (let i = 0; i < data.length; i++) {
            if (i === data.length - 1) {
                data[i].data.push(item);
                break;
            } else if (data[i].key === item.first_name.charAt(0).toUpperCase()) {
                data[i].data.push(item);
                break;
            } else {
                continue;
            }
        }
    });

    let delData = [];
    for (let i in data) {
        if (data[i].data.length !== 0) {
            delData.push(data[i]);
        }
    }

    return {
        delData: delData,
    };
}

export default toAlphabetList;
