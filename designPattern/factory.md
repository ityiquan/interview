# 工厂模式

`试一下试一下大概是因为这个原，这样也行，我擦，(debugName?, predicate: () => boolean, effect: () => void, scope?)`

`when` observes & runs the given `predicate` until it returns true.
Once that happens, the given `effect` is executed and the autorunner is disposed.
The function returns a disposer to cancel the autorunner prematurely.

This function is really useful to dispose or cancel stuff in a reactive way.
For example:

```javascript
class MyResource {
	constructor() {
		when(
			// once...
			() => !this.isVisible,
			// ... then
			() => this.dispose()
		);
	}

	@computed get isVisible() {
		// indicate whether this item is visible
	}

	dispose() {
		// dispose
	}
}

```

_In MobX 1.0 this method was called `autorunUntil`._