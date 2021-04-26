/**
 * IoC 依赖注入
 * @param value
 * @returns
 */
export default function Inject<T, U>(module: { new (): T }) {
  return function (target: { new (): U }) {
    target.prototype[module.name] = new module();
  };
}
