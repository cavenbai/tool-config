// 数组中所有排列组合
export function permutationCombination(array) {
    let resultArr = [];
    array.forEach((arrItem) => {
        if (resultArr.length === 0) {
            const firstItem = [];
            arrItem.forEach(item => { firstItem.push([item]);})
            resultArr = firstItem
        } else {
            const emptyArray = [];
            resultArr.forEach((item) => {
                arrItem.forEach((value) => {
                    emptyArray.push([...item, value])
                })
            })
            resultArr = emptyArray
        }
    });
    return resultArr;
}