/**
 * Utility function to pick specific fields from an object.
 * This is useful for creating a new object with only the desired properties.
 * @param obj
 * @param fields
 */
export function pickFields(obj: any, fields: string[]) {
  return fields.reduce((result, field) => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
    return result;
  }, {} as any);
}
