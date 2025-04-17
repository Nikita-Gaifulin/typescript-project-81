import { ITemplateOptions, InputOptions } from './interfaces'

export class HexletCodeAccumulator {
  private _template!: Record<string, string>
  private _templateOptions: ITemplateOptions[] = []
  private _options: { url?: string, method?: string }

  constructor(template: Record<string, string>, options: { url?: string, method?: string }) {
    this._template = template
    this._options = options
  }

  get templateOptions() {
    return this._templateOptions
  }

  get formOptions() {
    return this._options
  }

  input(fieldName: string, attributes: InputOptions & Record<string, string | number> = {}): void {
    if (!this._template || !(fieldName in this._template)) {
      throw new Error(`Field '${fieldName}' does not exist in the template.`)
    }

    const fieldValue = this._template[fieldName]
    const fieldType = attributes.as ?? 'input'
    delete attributes.as

    this._templateOptions.push({ fieldName, fieldValue, attributes, fieldType })
  }

  submit(value: string): void {
    this._templateOptions.push({ fieldName: 'input', fieldValue: value, fieldType: 'submit' })
  }
}
