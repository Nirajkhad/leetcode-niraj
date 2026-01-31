/**
 * Finds all unique quadruplets in the array that sum to the given target.
 *
 * A quadruplet [a, b, c, d] is valid if:
 *  - 0 <= a, b, c, d < nums.length
 *  - a, b, c, and d are distinct indices
 *  - nums[a] + nums[b] + nums[c] + nums[d] === target
 *
 * The solution avoids duplicates and returns results in any order.
 *
 * Time Complexity: O(n^3)
 * Space Complexity: O(1) extra space (excluding output array)
 *
 * @param {number[]} nums - Input array of integers
 * @param {number} target - Target sum
 * @returns {number[][]} Array of unique quadruplets
 */
function fourSum(nums, target) {
    const result = [];
    const n = nums.length;

    // Early exit for invalid input
    if (n < 4) return result;

    // Sort array to enable two-pointer technique and duplicate skipping
    nums.sort((a, b) => a - b);

    // Fix the first number
    for (let first = 0; first < n - 3; first++) {
        // Skip duplicate values for the first index
        if (first > 0 && nums[first] === nums[first - 1]) continue;

        // Fix the second number
        for (let second = first + 1; second < n - 2; second++) {
            // Skip duplicate values for the second index
            if (second > first + 1 && nums[second] === nums[second - 1]) continue;

            let left = second + 1;
            let right = n - 1;

            // Two-pointer search for remaining two numbers
            while (left < right) {
                const currentSum =
                    nums[first] +
                    nums[second] +
                    nums[left] +
                    nums[right];

                if (currentSum === target) {
                    result.push([
                        nums[first],
                        nums[second],
                        nums[left],
                        nums[right],
                    ]);

                    // Move both pointers and skip duplicates
                    left++;
                    right--;

                    while (left < right && nums[left] === nums[left - 1]) left++;
                    while (left < right && nums[right] === nums[right + 1]) right--;
                }
                else if (currentSum < target) {
                    left++;
                }
                else {
                    right--;
                }
            }
        }
    }

    return result;
}

/**
 * Runs test cases for the fourSum function
 */
function runTests() {
    const testCases = [
        {
            nums: [1, 0, -1, 0, -2, 2],
            target: 0,
            expected: [
                [-2, -1, 1, 2],
                [-2, 0, 0, 2],
                [-1, 0, 0, 1],
            ],
        },
        {
            nums: [2, 2, 2, 2, 2],
            target: 8,
            expected: [[2, 2, 2, 2]],
        },
    ];

    for (const { nums, target, expected } of testCases) {
        const output = fourSum([...nums], target);

        console.log("Input:", nums);
        console.log("Target:", target);
        console.log("Output:", output);
        console.log("Expected:", expected);
        console.log("--------------------------------------------------");
    }
}

// Execute tests
runTests();
