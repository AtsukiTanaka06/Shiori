import { isReadingOnDate } from './isReadingOnDate';

describe('isReadingOnDate', () => {
  it('startedAt が未設定なら false', () => {
    expect(isReadingOnDate({ startedAt: undefined, finishedAt: undefined }, '2026-09-20')).toBe(
      false
    );
  });

  it('startedAt が対象日より後なら false', () => {
    expect(
      isReadingOnDate({ startedAt: '2026-09-21', finishedAt: undefined }, '2026-09-20')
    ).toBe(false);
  });

  it('startedAt が対象日と同じで finishedAt 未設定なら true', () => {
    expect(
      isReadingOnDate({ startedAt: '2026-09-20', finishedAt: undefined }, '2026-09-20')
    ).toBe(true);
  });

  it('startedAt が対象日より前で finishedAt 未設定なら true', () => {
    expect(
      isReadingOnDate({ startedAt: '2026-09-01', finishedAt: undefined }, '2026-09-20')
    ).toBe(true);
  });

  it('finishedAt が対象日より前なら false', () => {
    expect(isReadingOnDate({ startedAt: '2026-09-01', finishedAt: '2026-09-19' }, '2026-09-20')).toBe(
      false
    );
  });

  it('finishedAt が対象日と同じなら true', () => {
    expect(isReadingOnDate({ startedAt: '2026-09-01', finishedAt: '2026-09-20' }, '2026-09-20')).toBe(
      true
    );
  });

  it('finishedAt が対象日より後なら true', () => {
    expect(isReadingOnDate({ startedAt: '2026-09-01', finishedAt: '2026-09-25' }, '2026-09-20')).toBe(
      true
    );
  });
});
