import { resolveStatusDates } from './resolveStatusDates';

const TODAY = '2026-09-28';

describe('resolveStatusDates', () => {
  it('「読書中」に変更し、開始日が未設定なら today を設定する', () => {
    expect(
      resolveStatusDates({ startedAt: undefined, finishedAt: undefined }, 'reading', TODAY)
    ).toEqual({ startedAt: TODAY, finishedAt: undefined });
  });

  it('「読書中」に変更しても、開始日が設定済みなら上書きしない', () => {
    expect(
      resolveStatusDates({ startedAt: '2026-09-01', finishedAt: undefined }, 'reading', TODAY)
    ).toEqual({ startedAt: '2026-09-01', finishedAt: undefined });
  });

  it('「読了」に変更し、終了日が未設定なら today を設定する', () => {
    expect(
      resolveStatusDates({ startedAt: '2026-09-01', finishedAt: undefined }, 'finished', TODAY)
    ).toEqual({ startedAt: '2026-09-01', finishedAt: TODAY });
  });

  it('「読了」に変更しても、終了日が設定済みなら上書きしない', () => {
    expect(
      resolveStatusDates({ startedAt: '2026-09-01', finishedAt: '2026-09-10' }, 'finished', TODAY)
    ).toEqual({ startedAt: '2026-09-01', finishedAt: '2026-09-10' });
  });

  it('「これから読む」に変更しても、日付は変更しない', () => {
    expect(
      resolveStatusDates({ startedAt: '2026-09-01', finishedAt: '2026-09-10' }, 'to_read', TODAY)
    ).toEqual({ startedAt: '2026-09-01', finishedAt: '2026-09-10' });
  });
});
