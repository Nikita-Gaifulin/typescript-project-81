class HexletCodeBuilder {
    template;
    formFields = [];
    constructor(template) {
        this.template = template;
    }
    input(fieldName, attributes = {}) {
        if (!this.template || !(fieldName in this.template)) {
            throw new Error(`Field '${fieldName}' does not exist in the template.`);
        }
        const fieldValue = this.template[fieldName];
        const fieldType = attributes.as ?? 'input';
        delete attributes.as;
        if (fieldType === 'textarea') {
            this.generateTextarea(fieldName, fieldValue, attributes);
        }
        else {
            this.generateInput(fieldName, fieldValue, attributes);
        }
    }
    submit(value) {
        this.formFields.push(`<input type="submit" value="${value}">`);
    }
    generateInput(name, value, attributes) {
        const attrs = this.buildAttributes({ ...attributes, type: 'text', name, value });
        this.formFields.push(`<label for="${name}">${name.charAt(0).toUpperCase() + name.slice(1)}</label>\n<input${attrs}>`);
    }
    generateTextarea(name, value, attributes) {
        const defaultAttrs = { cols: '20', rows: '40' };
        const mergedAttrs = { ...defaultAttrs, ...attributes, name };
        const attrs = this.buildAttributes(mergedAttrs);
        this.formFields.push(`<textarea${attrs}>${value}</textarea>`);
    }
    buildAttributes(attributes) {
        return Object.entries(attributes)
            .filter(([value]) => value !== undefined)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
    }
}
class HexletCode {
    static formFor(template, options, _callback) {
        const form = new HexletCodeBuilder(template);
        _callback(form);
        const action = options.url ?? '#';
        const method = options.method ?? 'post';
        const fieldsHtml = form.formFields.join('\n');
        // Если нет полей, возвращаем форму без переносов
        if (form.formFields.length === 0) {
            return `<form action="${action}" method="${method}"></form>`;
        }
        return `<form action="${action}" method="${method}">\n${fieldsHtml}\n</form>`;
    }
}
export default HexletCode;
