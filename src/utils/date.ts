/** 今日の日付を 'YYYY-MM-DD' 形式で返す */
export function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}
