import { dependencies } from './constants';
import { Dependencies, PackageDependencies } from './types';

export default (
  json: PackageDependencies = {},
  changes: Dependencies = {},
  exact = false
): PackageDependencies =>
  dependencies
    .filter((field): boolean => Boolean(json[field]))
    .reduce(
      (updated, field) => ({
        ...updated,
        [field]: Object.entries(changes).reduce(
          (memo, [name, version]) => ({
            ...memo,
            ...(json[field]?.[name]
              ? {
                  [name]: `${!exact ? '^' : ''}${version}`,
                }
              : {}),
          }),
          json[field]
        ),
      }),
      json
    );
