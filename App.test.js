import { validateZipCode } from './App';

test('Given a valid zip code, validateZipCode returns true', () => {
    expect(validateZipCode('12345')).toBe(true);
})

test('Given a string with a length greater than 5, validateZipCode returns false', () => {
    expect(validateZipCode('12345678')).toBe(false);
})

test('Given a string with a length less than 5, validateZipCode returns false', () => {
    expect(validateZipCode('123')).toBe(false);
})

test('Given an alphanumeric string, validateZipCode returns false', () => {
    expect(validateZipCode('1j2k3')).toBe(false);
})

test('Given a float as a string, validateZipCode returns false', () => {
    expect(validateZipCode('12.34')).toBe(false);
})

test('Given a negative integer as a string, validateZipCode returns false', () => {
    expect(validateZipCode('-1234')).toBe(false);
})

test('Given a string with an exponent, validateZipCode return false', () => {
    expect(validateZipCode('432e8')).toBe(false);
})