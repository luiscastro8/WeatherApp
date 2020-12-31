import { TestScheduler } from 'jest';
import { isInt } from './App';

test('isInt test', () => {
    expect(isInt('74jjj')).toBe(false);
})