import { format, generateId, clamp, debounce } from './utils';

describe('Core Utils', () => {
  describe('format', () => {
    it('should format with all three parts', () => {
      expect(format('Hello', 'World', 'Test')).toBe('Hello World Test');
    });

    it('should format with first and middle only', () => {
      expect(format('Hello', 'World')).toBe('Hello World');
    });

    it('should format with first and last only', () => {
      expect(format('Hello', undefined, 'Test')).toBe('Hello Test');
    });

    it('should format with only first', () => {
      expect(format('Hello')).toBe('Hello');
    });

    it('should return empty string when no arguments', () => {
      expect(format()).toBe('');
    });

    it('should handle undefined first with middle', () => {
      expect(format(undefined, 'World')).toBe(' World');
    });

    it('should handle undefined first with last', () => {
      expect(format(undefined, undefined, 'Test')).toBe(' Test');
    });

    it('should handle empty strings', () => {
      expect(format('', '', '')).toBe('');
    });
  });

  describe('generateId', () => {
    it('should generate ID with default prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^sg-[a-z0-9]{7}$/);
    });

    it('should generate ID with custom prefix', () => {
      const id = generateId('custom');
      expect(id).toMatch(/^custom-[a-z0-9]{7}$/);
    });

    it('should generate unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateId());
      }
      expect(ids.size).toBe(100);
    });

    it('should generate ID with empty prefix', () => {
      const id = generateId('');
      expect(id).toMatch(/^-[a-z0-9]{7}$/);
    });
  });

  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should return min when value equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('should return max when value equals max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it('should work with negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
      expect(clamp(0, -10, -1)).toBe(-1);
    });

    it('should work with decimal values', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5);
      expect(clamp(1.5, 0, 1)).toBe(1);
      expect(clamp(-0.5, 0, 1)).toBe(0);
    });

    it('should handle min equal to max', () => {
      expect(clamp(5, 5, 5)).toBe(5);
      expect(clamp(0, 5, 5)).toBe(5);
      expect(clamp(10, 5, 5)).toBe(5);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on subsequent calls', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();
      jest.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should only call once for multiple rapid calls', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should use the last arguments when called multiple times', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('first');
      debouncedFn('second');
      debouncedFn('third');

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('third');
    });

    it('should work with zero delay', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 0);

      debouncedFn();
      jest.advanceTimersByTime(0);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
