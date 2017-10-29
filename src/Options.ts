
import { Formatter } from './Formatter';

export interface Options {
  tsconfig?: string;
  tslint?: string | true;
  watch?: string | string[];
  async?: boolean;
  ignoreDiagnostics?: number[];
  ignoreLints?: string[];
  colors?: boolean;
  logger?: Console;
  formatter?: 'default' | 'codeframe' | Formatter;
  formatterOptions?: any;
  silent?: boolean;
  checkSyntacticErrors?: boolean;
  memoryLimit?: number;
  workers?: number;
}
