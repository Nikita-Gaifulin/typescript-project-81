import { Form } from './Form.js'
import { HexletCodeAccumulator } from './HexletCodeAccumulator.js'

class HexletCode {
  static formFor(template: { name: string, job: string, gender: string }, options: { url?: string, method?: string }, _callback: (f: HexletCodeAccumulator) => void): string {
    const form = new HexletCodeAccumulator(template, options)
    _callback(form)
    return Form.getHtml(form.templateOptions, form.formOptions)
  }
}

export default HexletCode
