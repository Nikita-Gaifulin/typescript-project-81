import { ITemplateOptions, InputOptions } from './interfaces'

export class HexletCodeAccumulator {
  private template!: Record<string, string>
  private templateOptions: ITemplateOptions[] = []

  constructor(template: Record<string, string>) {
    this.template = template
  }

  get getTemplateOptions() {
    return this.templateOptions
  }

  input(fieldName: string, attributes: InputOptions & Record<string, string | number> = {}): void {
    if (!this.template || !(fieldName in this.template)) {
      throw new Error(`Field '${fieldName}' does not exist in the template.`)
    }

    const fieldValue = this.template[fieldName]
    const fieldType = attributes.as ?? 'input'
    delete attributes.as

    this.templateOptions.push({ fieldName, fieldValue, attributes, fieldType })
  }

  submit(value: string): void {
    this.templateOptions.push({ fieldName: 'input', fieldValue: value, fieldType: 'submit' })
  }
}
