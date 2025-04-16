import { ITemplateOptions } from './interfaces'
import Tag from './Tag'

export class Form {
  static getHtml(fieldsOptions: ITemplateOptions[], options: { url?: string, method?: string }): string {
    const action = options.url ?? '#'
    const method = options.method ?? 'post'
    const defaultAttrs = { cols: '20', rows: '40' }
    const fieldsHtml = fieldsOptions.map((field) => {
      switch (field.fieldType) {
        case 'input':
          return new Tag('label', { for: field.fieldName }, field.fieldName.charAt(0).toUpperCase() + field.fieldName.slice(1)).toString() + new Tag('input', { ...field.attributes, name: field.fieldName, type: 'text', value: field.fieldValue }).toString()
          break
        case 'submit':
          return new Tag('input', { type: 'submit', value: field.fieldValue }).toString()
          break
        case 'textarea':
          return new Tag('label', { for: field.fieldName }, field.fieldName.charAt(0).toUpperCase() + field.fieldName.slice(1)).toString() + new Tag('textarea', { ...defaultAttrs, ...field.attributes, name: field.fieldName }, field.fieldValue).toString()
          break
      }
    })

    // Если нет полей, возвращаем форму без переносов
    if (fieldsHtml.length === 0) {
      return new Tag('form', { method: method, action: action }).toString()
    }

    return new Tag('form', { method: method, action: action }, fieldsHtml.join('')).toString()
  }
}
