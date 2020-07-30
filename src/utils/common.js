// 数组中所有排列组合
export function permutationCombination(arr, index) {
    var actions = [];
    var result = [];
    doExchange(arr, index)
    function doExchange(arr, index){
        for (var i = 0; i<arr[index].length; i++) {
            result[index] = arr[index][i];
            if (index != arr.length - 1) {
                doExchange(arr, index + 1)
            } else {
                actions.push(result.join('-'))
            }
        }
    }
	return actions;
}