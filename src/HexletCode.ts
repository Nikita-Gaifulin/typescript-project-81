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
    this.formFields.push(`<input type="submit" value="${value}">`)
  }

  private generateInput(name: string, value: unknown, attributes: Record<string, unknown>): void {
    const attrs = this.buildAttributes({ ...attributes, type: 'text', name, value })
    this.formFields.push(`<label for="${name}">${name.charAt(0).toUpperCase() + name.slice(1)}</label>\n<input${attrs}>`)
  }

  private generateTextarea(name: string, value: unknown, attributes: Record<string, unknown>): void {
    const defaultAttrs = { cols: '20', rows: '40' }
    const mergedAttrs = { ...defaultAttrs, ...attributes, name }
    const attrs = this.buildAttributes(mergedAttrs)
    this.formFields.push(`<textarea${attrs}>${value as string}</textarea>`)
  }

  private buildAttributes(attributes: Record<string, unknown>): string {
    return Object.entries(attributes)
      .filter(([value]) => value !== undefined)
      .map(([key, value]) => ` ${key}="${value as string}"`)
      .join('')
  }
}

class HexletCode {
  static formFor(template: { name: string, job: string, gender: string }, options: { url?: string, method?: string }, _callback: (f: HexletCodeBuilder) => void): string {
    const form = new HexletCodeBuilder(template)
    _callback(form)
    const action = options.url ?? '#'
    const method = options.method ?? 'post'
    const fieldsHtml = form.formFields.join(' ')

    // Если нет полей, возвращаем форму без переносов
    if (form.formFields.length === 0) {
      return `<form action="${action}" method="${method}"></form>`
    }

    return `<form action="${action}" method="${method}">${fieldsHtml}</form>`
  }
}

export default HexletCode
