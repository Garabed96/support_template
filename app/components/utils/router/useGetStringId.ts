export const useGetStringId = (query: string | string[] | null | undefined) =>
  typeof query === "string" ? query : null;
