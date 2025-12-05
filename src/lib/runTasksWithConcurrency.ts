/**
 * 并发执行一组异步任务
 * @param tasks - 任务数组，每个任务都是一个返回 Promise 的函数
 * @param concurrency - 允许的最大并发数
 * @returns 一个包含所有任务结果的 Promise 数组
 */
export async function runTasksWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const runningTasks: Promise<T>[] = [];
  const results: T[] = [];
  let taskIndex = 0;

  const startNextTask = async () => {
    if (taskIndex < tasks.length) {
      const task = tasks[taskIndex++];
      const promise = task()
        .then((result) => {
          results.push(result);
          return startNextTask();
        })
        .catch((error) => {
          console.error('任务执行出错:', error);
          return startNextTask();
        });

      // 将 promise 转换为 Promise<T> 类型
      const typedPromise = promise.then(() => undefined as T);

      runningTasks.push(typedPromise);

      if (runningTasks.length >= concurrency) {
        await Promise.race(runningTasks);
      }
    }
  };

  for (let i = 0; i < concurrency; i++) {
    await startNextTask();
  }

  await Promise.all(runningTasks);

  return results;
}
