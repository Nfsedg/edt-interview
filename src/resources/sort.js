export const nameSort = (arr = [], sort = 'desc') => {
  const sortedArray = [...arr]
  if(sort === 'desc') {
    sortedArray.sort((a, b) => a.name.localeCompare(b.name));
  } else if(sort === 'asc') {
    sortedArray.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedArray
}

export const ratingSort = (arr = [], sort = 'desc') => {
  const sortedArray = [...arr]
  if(sort === 'desc') {
    sortedArray.sort((a, b) => a.rating - b.rating);
  } else if(sort === 'asc') {
    sortedArray.sort((a, b) => b.rating - a.rating);
  }
  return sortedArray
}