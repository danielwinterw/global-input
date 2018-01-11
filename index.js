class GlobalInput {
    constructor(onChange, onSubmit, options = {}){
        if (!document) throw Error('`document` not found')

        this.options = Object.assign({
            submitKey: 'Enter',
            debug: false,
            excludeNodes: [],
            excludeNodeNames: [],
            preventDefault: false
        }, options)
        this.onChange = onChange
        this.onSubmit = onSubmit
        this.inputCache = ''

        this.mount = this.mount.bind(this)
        this.unmount = this.unmount.bind(this)
        this.setValue = this.setValue.bind(this)
        this.action = this.action.bind(this)

        this.mount()
    }

    handle(method, value) {
        if (this.options.debug) {
            console.info('Method: ' + method)
            console.info('Input Value: ' + this.inputCache)
            console.log('')
        }

        this['on' + method](value)
    }

    mount() {
        document.body.addEventListener('keydown', this.action)
        if (this.options.debug) console.warn('mounted')
    }

    unmount() {
        document.body.removeEventListener('keydown', this.action)
        if (this.options.debug) console.warn('unmounted')
    }

    setValue(value) {
        this.inputCache = value
        this.handle('Change', value)
    }

    action(e) {
        if (this.options.preventDefault) e.preventDefault()

        if (
            this.options.excludeNodes.includes(document.activeElement) ||
            this.options.excludeNodeNames.includes(document.activeElement.nodeName)
        ) {
            return
        }

        switch(e.key) {
            case this.options.submitKey:
                this.handle('Submit', this.inputCache)

                this.inputCache = ''
                this.handle('Change', this.inputCache)

                return
                break

            case 'Backspace':
                this.inputCache = this.inputCache.slice(0, -1)

                break

            default:
                const caps = e.getModifierState && (
                    e.getModifierState('CapsLock') ||
                    e.getModifierState('Shift')
                )

                this.inputCache += (
                    e.key.length === 1 ? e.key : ''
                )[caps ? 'toUpperCase' : 'toLowerCase']()

                break
        }

        this.handle('Change', this.inputCache)
    }
}

module.exports = GlobalInput
