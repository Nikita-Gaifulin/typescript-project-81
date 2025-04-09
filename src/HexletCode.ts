import Tag from '../src/Tag.js'

class HexletCodeBuilder {
  private template!: Record<string, unknown>
  public formFields: string[] = []

  constructor(template: Record<string, unknown>) {
    this.template = template
  }

  input(fieldName: string, attributes: Record<string, unknown> = {}): void {
    if (!this.template || !(fieldName in this.template)) {
      throw new Error(`Field '${fieldName}' does not exist in the template.`)
    }

    const fieldValue = this.template[fieldName]
    const fieldType = attributes.as ?? 'input'
    delete attributes.as

    if (fieldType === 'textarea') {
      this.generateTextarea(fieldName, fieldValue, attributes)
    }
    else {
      this.generateInput(fieldName, fieldValue, attributes)
    }
  }

  submit(value: string): void {
    this.formFields.push(new Tag('input', { type: 'submit', value: value }).toString())
  }

  private convertToStringRecord(obj: Record<string, unknown>): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key in obj) {
      if (typeof obj[key] !== 'string') {
        result[key] = String(obj[key])
      }
      else {
        result[key] = obj[key]
      }
    }

    return result
  }

  private generateInput(name: string, value: unknown, attributes: Record<string, unknown>): void {
    this.formFields.push(new Tag('label', { for: name }, name.charAt(0).toUpperCase() + name.slice(1)).toString() + new Tag('input', this.convertToStringRecord({ ...attributes, name, type: 'text', value })).toString())
  }

  private generateTextarea(name: string, value: unknown, attributes: Record<string, unknown>): void {
    const defaultAttrs = { cols: '20', rows: '40' }
    this.formFields.push(new Tag('label', { for: name }, name.charAt(0).toUpperCase() + name.slice(1)).toString() + new Tag('textarea', this.convertToStringRecord({ ...defaultAttrs, ...attributes, name }), value as string).toString())
  }
}

class HexletCode {
  static formFor(template: { name: string, job: string, gender: string }, options: { url?: string, method?: string }, _callback: (f: HexletCodeBuilder) => void): string {
    const form = new HexletCodeBuilder(template)
    _callback(form)
    const action = options.url ?? '#'
    const method = options.method ?? 'post'
    const fieldsHtml = form.formFields.join('')

    // Если нет полей, возвращаем форму без переносов
    if (form.formFields.length === 0) {
      return new Tag('form', { method: method, action: action }).toString()
    }

    return new Tag('form', { method: method, action: action }, fieldsHtml).toString()
  }
}

export default HexletCode
