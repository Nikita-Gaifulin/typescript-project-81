class Tag {
    tagName;
    attributes;
    text;
    constructor(tagName, attributes = {}, text = '') {
        this.tagName = tagName;
        this.attributes = attributes;
        this.text = text;
    }
    generateAttributes() {
        return Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
    }
    toString() {
        const attributes = this.generateAttributes();
        const openTag = `<${this.tagName}${attributes ? ' ' + attributes : ''}>`;
        const closingTags = ['br', 'img', 'input'];
        if (closingTags.includes(this.tagName)) {
            return openTag;
        }
        return `${openTag}${this.text}</${this.tagName}>`;
    }
}
export default Tag;
