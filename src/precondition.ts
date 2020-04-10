import Exception from './exception';

interface PreconditionParameters {
  wanted: boolean;
  latest: boolean;
}

export default ({ wanted, latest }: PreconditionParameters): void => {
  if (wanted && latest) {
    throw Exception('cannot use both wanted and latest...');
  }
};
