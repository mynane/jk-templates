export interface IBase {
  command?: string;
  options?: string[][];
  description?: string;
  alias?: string;
  action?: (type: any, name: any) => void;
  [key: string]: any;
}
