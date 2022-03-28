

export const findClosest = (arr: number[], target = 1) => {
  let closest = arr[0];
  let closestDiff = Math.abs(target - closest);
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(target - arr[i]);
    if (diff < closestDiff) {
      closest = arr[i];
      closestDiff = diff;
    }
  }
  return closest;
}


