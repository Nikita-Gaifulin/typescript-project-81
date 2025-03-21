class Tag
{
    private tagName: string
    private attributes: Record<string, string>
    private text: string


    constructor(tagName: string, attributes: Record<string, string> = {}, text: string = '')
    {
        this.tagName = tagName
        this.attributes = attributes
        this.text = text
    }

    private generateAttributes() : string
    {
        return Object.entries(this.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')
    }

    public toString()
    {
        const attributes = this.generateAttributes()

        const openTag = `<${this.tagName}${attributes ? ' ' + attributes : ''}>`

        const closingTags = ['br', 'img', 'input']

        if (closingTags.includes(this.tagName))
        {
            return openTag
        }

        return `${openTag}${this.text}</${this.tagName}>`
    }
}

export default Tag