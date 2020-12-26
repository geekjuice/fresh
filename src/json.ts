import * as utils from './utils';

export const read = async (
  filepath: string
): Promise<Record<string, unknown>> => {
  const stuff = await utils.read(filepath);
  return JSON.parse(stuff.toString());
};

export const write = async (filepath: string, object = {}): Promise<void> => {
  const json = JSON.stringify(object, null, 2);
  await utils.write(filepath, json);
};
