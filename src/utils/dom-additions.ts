export const injectHTML = (
    html: string
) => {
    const fileref = document.createElement('div')

    fileref.innerHTML = html

    document.body.insertBefore(fileref, document.body.firstChild)
}

export const injectCSS = (
    location: string
) => {
    return new Promise((resolve, reject) => {

        const fileref = document.createElement('link')

        fileref.setAttribute('rel', 'stylesheet')
        fileref.setAttribute('type', 'text/css')
        fileref.setAttribute('href', location)

        document.getElementsByTagName('head')[0].appendChild(fileref)

        resolve()
    })
}

export const injectJS = (
    location: string
) => {
    return new Promise((resolve, reject) => {

        const fileref = document.createElement('script')
        fileref.setAttribute('type', 'text/javascript')
        fileref.setAttribute('src', location)
        fileref.async = false

        // @ts-ignore
        fileref.onload = () => {
            resolve()
        }

        // @ts-ignore
        fileref.onerror = () => {
            reject()
        }

        document.getElementsByTagName('head')[0].appendChild(fileref)
    })
}
