import { pickBy, size } from 'lodash'
export const cleanBody = (data) => {
  const filtered = pickBy(
    data, i => i?.length > 0 || 
    size(i) > 0 || 
    (typeof(i) === 'number' && i >= 0)
  );
  return filtered
}