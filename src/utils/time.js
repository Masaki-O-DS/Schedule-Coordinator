export function dayStrToDateObj(dayStr) {
  const dateObjects = new Date(dayStr); //ISOstringからDateオブジェクトへ
  const month = dateObjects.getMonth();
  const day = dateObjects.getDate();
  return { month, day };
}
