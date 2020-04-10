export const pad = {
  top: (value: string): string => `\n${value}`,
  bottom: (value: string): string => `${value}\n`,
  both: (value: string): string => `\n${value}\n`,
};
