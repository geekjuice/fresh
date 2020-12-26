import Exception from './exception';
import { Flags } from './types';

export default ({ wanted, latest }: Partial<Flags>): void => {
  if (wanted && latest) {
    throw Exception('cannot use both wanted and latest...');
  }
};
