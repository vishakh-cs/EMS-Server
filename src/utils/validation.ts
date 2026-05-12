export const getMissingRequiredFields = <T extends object>(
  data: Partial<T>,
  requiredFields: Array<keyof T>
): string[] =>
  requiredFields
    .filter((field) => {
      const value = data[field];

      return value === undefined || value === null || value === "";
    })
    .map(String);
