class GlobalInput {
    constructor(onChange, onSubmit, options = {}){
        if (!document) throw Error('`document` not found')

        this.options = Object.assign({
            submitKey: 'Enter',
            debug: false,
            excludeNodes: [],
            excludeNodeNames: [],
            preventDefault: false,
            mountInitial: true,
        }, options)
        this.onChange = onChange
        this.onSubmit = onSubmit
        this.inputCache = ''
        this.mounted = false

        this.mount = this.mount.bind(this)
        this.unmount = this.unmount.bind(this)
        this.setValue = this.setValue.bind(this)
        this.action = this.action.bind(this)

        if (this.options.mountInitial) this.mount()
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
        if (this.mounted) return console.warn('Input already mounted')
        document.body.addEventListener('keydown', this.action)
        this.mounted = true
        if (this.options.debug) console.warn('mounted')
    }

    unmount() {
        if (!this.mounted) return console.warn('Input already unmounted')
        document.body.removeEventListener('keydown', this.action)
        this.mounted = false
        if (this.options.debug) console.warn('unmounted')
    }

    setValue(value) {
        this.inputCache = value
    }

    action(e) {
        if (
            this.options.excludeNodes.includes(document.activeElement) ||
            this.options.excludeNodeNames.includes(document.activeElement.nodeName) ||
            typeof e.getModifierState === 'function' && (
                e.getModifierState('Alt') ||
                e.getModifierState('Control') ||
                e.getModifierState('OS') ||
                e.getModifierState('Fn') ||
                e.getModifierState('Meta') ||
                e.getModifierState('Win') ||
                e.getModifierState('Hyper') ||
                e.getModifierState('Super')
            )
        ) {
            return
        }

        if (this.options.preventDefault) e.preventDefault()

        switch(e.key) {
            case this.options.submitKey:
                const value = String(this.inputCache);
                this.handle('Submit', value)

                this.inputCache = ''

                return value
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
