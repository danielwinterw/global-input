# global-input
A browser library for detecting input without an input.

## Installation
```
npm install --save global-input
```

## Usage
### Standard Behaviour

Two callbacks are provided by default in this library. An `onChange` and an `onSubmit`.
`onChange` will provide the current input each time a key is pressed.
`onSubmit` will provide the current input and clear the input after the value is returned. This is triggered by default on the enter key press.

```
import input from 'global-input';

const options = {}

function onChange(value) {
    // do something
}

function onSubmit(value) {
    // do something
}

const globalInput = new GlobalInput(onChange, onSubmit, options)
```

### Debug
You can see when the input is mounted, unmounted, and all key events.
```
const options {
    debug: true
}
```

### Submit Key
You can specify the key that will submit the input
```
const options {
    submitKey: 'Tab'
}
```

### Excluding Focused Elements
You can disable the global input when other elements are in focus. You can pass in elements or node names.
```
const options {
    excludeNodes: [el1, el2],
    excludeNodeNames: ['INPUT']
}
```

### Preventing Default Key Behaviour
You can prevent page jumps and default behaviour.
```
const options {
    preventDefault: false
}
```

### Unmounting and Remounting an Input

You can stop/start the global listener and halt the input in it's current state.
```
globalInput.unmount();
globalInput.mount();

console.log(globalInput.mounted) // true or false
```

### Default Mount State 
You can disable the global input when other elements are in focus. You can pass in elements or node names.
```
const options {
    mountInitial: false
}
```