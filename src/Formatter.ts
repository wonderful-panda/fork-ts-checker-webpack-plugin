import { NormalizedMessage } from './NormalizedMessage';

export type Formatter = (message: NormalizedMessage, useColors: boolean) => string;
