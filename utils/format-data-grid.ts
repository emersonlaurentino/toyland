import type { Product } from "@/states/user";

type CustomProduct = Product & { empty?: boolean };

export const formatDataGrid = (data: CustomProduct[], numColumns: number) => {
  const dataClone = [...data];
  const numberOfFullRows = Math.floor(dataClone.length / numColumns);
  let numberOfElementsLastRow =
    dataClone.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    dataClone.push({ empty: true } as CustomProduct);
    numberOfElementsLastRow++;
  }

  return dataClone;
};
