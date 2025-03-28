class Form
{
  private formFields: string[] = []
  private template!: Record<string, unknown>

  formFor(template: { name: string, job: string, gender: string }, options: { url?: string, method?: string }, _callback: (f: Form) => void): string {
    this.template = template
    const form = new Form()
    form.template = this.template
    _callback(form)
    const action = options.url || '#'
    const method = options.method || 'post'
    const fieldsHtml = form.formFields.join('\n');

    // Если нет полей, возвращаем форму без переносов
    if (form.formFields.length === 0) {
      return `<form action="${action}" method="${method}"></form>`;
    }

    return `<form action="${action}" method="${method}">\n${fieldsHtml}\n</form>`
  }

  input(fieldName: string, attributes: Record<string, unknown> = {}): void {
    if (!this.template || !(fieldName in this.template)) {
      throw new Error(`Field '${fieldName}' does not exist in the template.`);
    }

    const fieldValue = this.template[fieldName];
    const fieldType = attributes.as || 'input';
    delete attributes.as

    if (fieldType === 'textarea') {
      this.generateTextarea(fieldName, fieldValue, attributes);
    } else {
      this.generateInput(fieldName, fieldValue, attributes);
    }
  }

  private generateInput(name: string, value: unknown, attributes: Record<string, unknown>): void {
    const attrs = this.buildAttributes({ ...attributes, type: 'text', name, value });
    this.formFields.push(`<input${attrs}>`);
  }

  private generateTextarea(name: string, value: unknown, attributes: Record<string, unknown>): void {
    const defaultAttrs = { cols: '20', rows: '40' };
    const mergedAttrs = { ...defaultAttrs, ...attributes, name };
    const attrs = this.buildAttributes(mergedAttrs);
    this.formFields.push(`<textarea${attrs}>${value}</textarea>`);
  }

  private buildAttributes(attributes: Record<string, unknown>): string {
    return Object.entries(attributes)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('')
  }
}

export default Form
