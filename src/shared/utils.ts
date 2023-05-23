export const generateNextId = (array: any[], prefix: string) => {
  if (array.length < 1) return `${prefix}1`;
  const maxId = array.reduce((prevData: any, currData: any) => {
    const prevId = extractNumber(prevData['id']);
    const currId = extractNumber(currData['id']);
    return prevId > currId ? prevId : currId;
  });
  return `${prefix}${Number(maxId) + 1}`;
};

const extractNumber = (str: string) => {
  return Number(str?.replace(/[^0-9]/g, ''));
};
