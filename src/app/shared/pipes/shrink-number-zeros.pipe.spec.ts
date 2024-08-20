import { ShrinkNumberZerosPipe } from './shrink-number-zeros.pipe';

describe('ShrinkNumberZerosPipe', () => {
  it('create an instance', () => {
    const pipe = new ShrinkNumberZerosPipe();
    expect(pipe).toBeTruthy();
  });
});
