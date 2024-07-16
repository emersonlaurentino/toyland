type Custom<T> = T & { empty?: boolean };

export const formatDataGrid = <T extends Object>(
  data: Custom<T>[],
  numColumns: number
) => {
  const dataClone = [...data];
  const numberOfFullRows = Math.floor(dataClone.length / numColumns);
  let numberOfElementsLastRow =
    dataClone.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    dataClone.push({ empty: true } as Custom<T>);
    numberOfElementsLastRow++;
  }

  return dataClone;
};
