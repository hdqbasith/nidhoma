import { FetchError } from 'ofetch'
import { toast } from 'vue-sonner'
// import type { FormError } from '#ui/types'

export interface FormError<T extends string = string> {
  path: T
  message: string
}
const VALIDATION_ERROR_CODE = 401
const SERVER_ERROR_CODE = 500

function mapLaravelErrorsIntoFormErrors(errors: Record<string, string[]>): FormError[] {
  return Object
    .entries(errors)
    .map(([key, messages]) => ({
      path: key,
      message: messages[0] ?? '',
    }))
}

export const useSanctumError = (error: unknown) => {
  const isFetchError = error instanceof FetchError
  if(isFetchError && !error.response) {
    toast.error('Anda sedang offline, mohon cek koneksi internet Anda');
  }
  const isValidationError
        = isFetchError && error.response?.status

  const code = isFetchError ? error.response?.status : SERVER_ERROR_CODE

  const bag = isValidationError
    ? mapLaravelErrorsIntoFormErrors(error.response?._data.errors)
    : []

  return {
    isValidationError,
    code,
    bag,
  }
}
