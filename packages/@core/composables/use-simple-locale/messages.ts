export type Locale = 'en-US' | 'id-ID';

export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    reset: 'Reset',
    submit: 'Submit',
  },
  'id-ID': {
    cancel: 'Batal',
    collapse: 'Ciutkan',
    confirm: 'Silakan',
    expand: 'Lebarkan',
    reset: 'Reset',
    submit: 'Kirim',
  },
};

export const getMessages = (locale: Locale) => messages[locale];
