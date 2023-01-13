const {
    deepCopy,
    filterInventorsHaveCorrectYear,
    sortByCompareInventordata,
    getLastNameInPerson,
} = require('./helper');
const { inventors, people, cars } = require('./data');

// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
let answer1_1 = filterInventorsHaveCorrectYear(inventors).filter(
    ({ year }) => year >= 1500 && year < 1600
);
let answer1_2 = filterInventorsHaveCorrectYear(inventors).filter(
    ({ year }) => Math.floor(year / 100) === 15
);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
// map을 이용하기 때문에 first, last 존재 여부는 체크 X
let answer2_1 = inventors.map(({ first, last }) => ({
    first,
    last,
}));

// Array.prototype.sort() --> Mutable하므로, copy된 배열이 필요함.
// 3. Sort the inventors by birthdate, oldest to youngest
let answer3_1 = [].concat(inventors).sort(sortByCompareInventordata);

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
let answer4_1 = inventors.reduce((year, inventor) => {
    return year + inventor.passed - inventor.year;
}, 0);

// 5. Sort the inventors by years lived
let answer5_1 = deepCopy(inventors).sort((a, b) => {
    const inventor = a.passed - a.year;
    const compared_inventor = b.passed - b.year;

    if (inventor > compared_inventor) return -1;
    if (inventor < compared_inventor) return 1;

    // 동갑인 경우 먼저 태어난 사람을 내림차순으로 정렬
    if (inventor.year > compared_inventor.year) return -1;
    if (inventor.year < compared_inventor.year) return 1;

    return 0;
});

// 6. sort Exercise
// Sort the people alphabetically by last name
let answer6_1 = structuredClone(people).sort((person, compared_person) => {
    const personLastName = getLastNameInPerson(person);
    const comparedPersonLastName = getLastNameInPerson(compared_person);

    // 문자가 아닌경우에는 기본 sort 메소드 로직처럼 마지막으로 밀어버림
    if (!personLastName || !comparedPersonLastName) return 1;

    // 첫글자가 동일한 경우에는 sort 메소드가 자동으로 다음 문자순으로 배열
    return personLastName > comparedPersonLastName ? 1 : -1;
});

// 7. Reduce Exercise
// Sum up the instances of each of these
let answer7_1 = cars.reduce((obj, car) => {
    // hasOwn은 Object의 prototype에 접근하는 hasOwnProperty와 in 보다 범용성(단, IE에서 실행 불가)이 있으며, 직관적
    Object.hasOwn(obj, car) ? obj[car]++ : (obj[car] = 1);

    return obj;
}, {});
