class Form
{
  formFor(template: { name: string, job: string, gender: string }, options: { url?: string }, _callback: (f: unknown) => void): string {
    const action = options.url || '#'
    const method = 'post'
    return `<form action="${action}" method="${method}"></form>`
  }
}

export default Form