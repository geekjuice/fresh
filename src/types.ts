export interface Flags {
  wanted: boolean;
  latest: boolean;
  exact: boolean;
  force: boolean;
}

export interface Dependencies {
  [dependency: string]: string;
}

export interface PackageDependencies {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  optionalDependencies?: Dependencies;
}

export interface Outdated {
  [dependency: string]: Versions;
}

export interface Versions {
  current: string;
  wanted: string;
  latest: string;
}
