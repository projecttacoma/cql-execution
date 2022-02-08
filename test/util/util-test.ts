import { asyncMergeSort, typeIsArray } from '../../src/util/util';
import 'should';

describe('typeIsArray', () => {
  it('should properly identify arrays', () => {
    typeIsArray([1, 2, 3]).should.be.true();
    typeIsArray(['a', 'b', 'c']).should.be.true();
    typeIsArray([
      ['a', 'b', 'c'],
      [1, 2, 3]
    ]).should.be.true();
    typeIsArray([
      { a: 1, b: 2, c: 3 },
      { x: 24, y: 25, z: 26 }
    ]);
    typeIsArray([]).should.be.true();
  });

  it('should properly reject non-arrays', () => {
    typeIsArray(1).should.be.false();
    typeIsArray('a').should.be.false();
    typeIsArray('[]').should.be.false();
    typeIsArray({ a: 1, b: 2, c: 3 }).should.be.false();
    typeIsArray({ a: [] }).should.be.false();
    typeIsArray(null).should.be.false();
  });
});

describe('asyncMergeSort', () => {
  const sortAsc = async (a: number, b: number) => a - b;
  const sortDesc = async (a: number, b: number) => b - a;

  it('should not change empty array', async () => {
    const arr: any[] = [];
    const sorted = await asyncMergeSort(arr, sortAsc);

    sorted.should.eql([]);
  });

  it('should not change array with 1 element', async () => {
    const arr: any[] = [1];
    const sorted = await asyncMergeSort(arr, sortAsc);

    sorted.should.eql([1]);
  });

  it('should sort array with 2 elements ascending', async () => {
    const arr: any[] = [2, 1];
    const sorted = await asyncMergeSort(arr, sortAsc);

    sorted.should.eql([1, 2]);
  });

  it('should sort array with 2 elements descending', async () => {
    const arr: any[] = [1, 2];
    const sorted = await asyncMergeSort(arr, sortDesc);

    sorted.should.eql([2, 1]);
  });

  it('should sort array ascending', async () => {
    const arr: any[] = [3, -1, 0, 1, 5, 2];
    const sorted = await asyncMergeSort(arr, sortAsc);

    sorted.should.eql([-1, 0, 1, 2, 3, 5]);
  });

  it('should sort array descending', async () => {
    const arr: any[] = [3, -1, 0, 1, 5, 2];
    const sorted = await asyncMergeSort(arr, sortDesc);

    sorted.should.eql([5, 3, 2, 1, 0, -1]);
  });
});
