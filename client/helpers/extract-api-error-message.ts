import { isEmpty } from '../../shared/helpers/is-empty';

/** `ky` の例外データから API が返したエラーメッセージを取得する・取得できなかったら指定のデフォルトメッセージを返す */
export const extractApiErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error == null || typeof error !== 'object' || !('data' in error)) return defaultMessage;
  const data = error.data;
  if (data == null || typeof data !== 'object' || !('error' in data)) return defaultMessage;
  const errorMessage = data.error;
  return typeof errorMessage !== 'string' || isEmpty(errorMessage) ? defaultMessage : errorMessage;
};
