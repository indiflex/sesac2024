import assert from 'assert';
// const assert = require('assert');
type TPropertyKeyType = string | number | symbol;

type TUser = { [key: string]: string | number };

function deleteArrayOrg<T>(
  arr: T[],
  startOrKey: TPropertyKeyType,
  endOrValue?: unknown
): T[] {
  if (typeof startOrKey === 'number') {
    if (typeof endOrValue === 'number') {
      return arr.filter((_, i) => i < startOrKey || i > endOrValue - 1);
    }
    return arr.slice(0, startOrKey);
  }

  /**
   * 이 부분이 막힌 부분입니다.
   *
   * 전달 되는 startOrKey가 string이라 객체[startOrKey] 가 불가능합니다.
   *
   * 보통 이런 상황에서 어떻게 타입을 할당 할 수 있을까요?
   * 또는 e에 대한 접근을 어떻게 할 수 있을까요?
   * e에 대해서 좀 더 상세하게 타입을 줄 수 있는 방법이 있을까요?!
   */
  if (typeof startOrKey === 'string') {
    arr.filter(e => {
      if (e && typeof e === 'object') {
        // e['id']; // error
        // e[startOrKey]; // error
      }
    });
  }

  return [];
}

function deleteArray<T>(
  arr: T[],
  startOrKey: number | keyof T,
  endOrValue?: unknown
) {
  if (typeof startOrKey === 'number') {
    return arr.filter(
      (_, i) =>
        i < startOrKey ||
        i >
          (typeof endOrValue === 'number'
            ? endOrValue
            : Number.MAX_SAFE_INTEGER) -
            1
    );
  }

  return arr.filter(
    a => a && typeof a === 'object' && a[startOrKey] !== endOrValue
  );
}

const arr = [1, 2, 3, 4];
// assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
// assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
// assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users: TUser[] = [Hong, Kim, Lee];

// assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
// assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
// assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);
