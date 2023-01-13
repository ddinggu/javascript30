require('./types');

/**
 * 이 과제에서 유효하지 않은 숫자인지 여부를 출력하는 함수.
 * @param {?Number} num 숫자.
 * @returns {Boolean}
 */
function isUnuseableNumber(num) {
    return typeof num !== 'number' || Number.isNaN(num) || !Number.isFinite(num)
        ? true
        : false;
}

/**
 * 문자열 여부를 확인하는 함수 {@link https://stackoverflow.com/a/50569825} 참고.
 * @param {?String} str 문자
 * @returns {Boolean}
 */
function isString(str) {
    if (str === '') return true;

    return typeof str === 'string' || str instanceof String;
}

/**
 * 깊은복사를 하는 함수.
 * @todo Generater, Promise, AsyncFunction 등 추가 확인필요.
 * @param {*} obj copy하고자 하는 데이터.
 * @returns {*} DeepCopy된 데이터 출력.
 */
function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        // Array 체크
        return obj.reduce((arr, val, idx) => {
            arr[idx] = deepCopy(val);
            return arr;
        }, []);
    }

    if (obj instanceof Object) {
        // Object 체크
        return Object.keys(obj).reduce((clone, key) => {
            clone[key] = deepCopy(obj[key]);
            return clone;
        }, {});
    }

    // 사용빈도가 적을 것으로 예상되는 Date, Map은 후순위로 처리
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Map) return new Map(obj);
}

/**
 * inventors 데이터안의 발명가의 속성 값 중 year가 유효한 숫자인지 확인하기 위한 함수.
 * @deprecated 한 케이스에 국한된 로직으로, 이 케이스처럼 정답이 여러개가 아니라면 재사용성이 없어 함수화 하지 않을 것.
 * @param {Array<Inventor>} inventors 발명가들의 배열데이터.
 * @returns {Array<Inventor>} 유효한 숫자가 확인된 발명가들의 배열 데이터.
 */
function filterInventorsHaveCorrectYear(inventors) {
    return inventors.filter(({ year }) =>
        !year || isUnuseableNumber(year) ? false : true
    );
}

/**
 * inventors 데이터안의 발명가들을 비교하여 출생년도 기준 내림차순, 사망년도 기준 오름차순으로 정렬.
 * @deprecated 한 케이스에 국한된 로직으로, 만약 실무라면 재사용성이 없어 함수화 하지않는 것이 좋다고 생각.
 * @param {Inventor} inventor 발명가의 정보.
 * @param {Inventor} compared_inventor 비교대상인 발명가의 정보.
 * @returns {0 | 1 | 2} Array.prototype.sort의 정렬순서를 책정값.
 */
function sortByCompareInventordata(inventor, compared_inventor) {
    if (inventor.year > compared_inventor.year) return 1;
    if (inventor.year < compared_inventor.year) return -1;

    // 동년배인 경우
    if (inventor.passed > compared_inventor.passed) return -1;
    if (inventor.passed < compared_inventor.passed) return 1;
    return 0;
}

/**
 * people{@link Person} 데이터의 정렬을 위해 문자 분해 및 대문자처리한 Lastname의 첫글자를 반환하는 함수.
 * Lastname의 첫글자가 대문자가 아닌경우를 추가로 고려.
 * @deprecated 한 케이스에 국한된 로직으로, 만약 실무라면 재사용성이 없어 함수화 하지않는 것이 좋다고 생각.
 * @param {String} name people 데이터에 담긴 이름.
 * @returns {String | false} 대문자처리된 Lastname 혹은 string이 아닌경우 false 출력.
 * @todo non-ASCII 문자열인 경우를 추가로 고려할 필요가 있음{@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#%EB%B9%84_ascii_%EB%AC%B8%EC%9E%90_%EC%A0%95%EB%A0%AC} 참고.
 */
function getLastNameInPerson(name) {
    if (!isString(name)) return false;

    const [, lastName] = name.split(', ');
    return lastName.toUpperCase();
}

module.exports = {
    isUnuseableNumber,
    isString,
    deepCopy,
    filterInventorsHaveCorrectYear,
    sortByCompareInventordata,
    getLastNameInPerson,
};
