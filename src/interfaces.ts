export interface InputOptions {
  as?: 'input' | 'textarea'
}

export interface ITemplateOptions {
  fieldName: string
  fieldValue: string
  attributes?: Record<string, unknown>
  fieldType: 'textarea' | 'input' | 'submit'
}
