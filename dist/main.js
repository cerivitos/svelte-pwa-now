
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    function noop() {}

    function add_location(element, file, line, column, char) {
    	element.__svelte_meta = {
    		loc: { file, line, column, char }
    	};
    }

    function run(fn) {
    	return fn();
    }

    function blank_object() {
    	return Object.create(null);
    }

    function run_all(fns) {
    	fns.forEach(run);
    }

    function is_function(thing) {
    	return typeof thing === 'function';
    }

    function safe_not_equal(a, b) {
    	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
    	target.appendChild(node);
    }

    function insert(target, node, anchor) {
    	target.insertBefore(node, anchor || null);
    }

    function detach(node) {
    	node.parentNode.removeChild(node);
    }

    function element(name) {
    	return document.createElement(name);
    }

    function text(data) {
    	return document.createTextNode(data);
    }

    function space() {
    	return text(' ');
    }

    function listen(node, event, handler, options) {
    	node.addEventListener(event, handler, options);
    	return () => node.removeEventListener(event, handler, options);
    }

    function children(element) {
    	return Array.from(element.childNodes);
    }

    function set_data(text, data) {
    	data = '' + data;
    	if (text.data !== data) text.data = data;
    }

    let current_component;

    function set_current_component(component) {
    	current_component = component;
    }

    const dirty_components = [];

    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];

    function schedule_update() {
    	if (!update_scheduled) {
    		update_scheduled = true;
    		resolved_promise.then(flush);
    	}
    }

    function add_render_callback(fn) {
    	render_callbacks.push(fn);
    }

    function flush() {
    	const seen_callbacks = new Set();

    	do {
    		// first, call beforeUpdate functions
    		// and update components
    		while (dirty_components.length) {
    			const component = dirty_components.shift();
    			set_current_component(component);
    			update(component.$$);
    		}

    		while (binding_callbacks.length) binding_callbacks.shift()();

    		// then, once components are updated, call
    		// afterUpdate functions. This may cause
    		// subsequent updates...
    		while (render_callbacks.length) {
    			const callback = render_callbacks.pop();
    			if (!seen_callbacks.has(callback)) {
    				callback();

    				// ...so guard against infinite loops
    				seen_callbacks.add(callback);
    			}
    		}
    	} while (dirty_components.length);

    	while (flush_callbacks.length) {
    		flush_callbacks.pop()();
    	}

    	update_scheduled = false;
    }

    function update($$) {
    	if ($$.fragment) {
    		$$.update($$.dirty);
    		run_all($$.before_render);
    		$$.fragment.p($$.dirty, $$.ctx);
    		$$.dirty = null;

    		$$.after_render.forEach(add_render_callback);
    	}
    }

    function mount_component(component, target, anchor) {
    	const { fragment, on_mount, on_destroy, after_render } = component.$$;

    	fragment.m(target, anchor);

    	// onMount happens after the initial afterUpdate. Because
    	// afterUpdate callbacks happen in reverse order (inner first)
    	// we schedule onMount callbacks before afterUpdate callbacks
    	add_render_callback(() => {
    		const new_on_destroy = on_mount.map(run).filter(is_function);
    		if (on_destroy) {
    			on_destroy.push(...new_on_destroy);
    		} else {
    			// Edge case - component was destroyed immediately,
    			// most likely as a result of a binding initialising
    			run_all(new_on_destroy);
    		}
    		component.$$.on_mount = [];
    	});

    	after_render.forEach(add_render_callback);
    }

    function destroy(component, detaching) {
    	if (component.$$) {
    		run_all(component.$$.on_destroy);
    		component.$$.fragment.d(detaching);

    		// TODO null out other refs, including component.$$ (but need to
    		// preserve final state?)
    		component.$$.on_destroy = component.$$.fragment = null;
    		component.$$.ctx = {};
    	}
    }

    function make_dirty(component, key) {
    	if (!component.$$.dirty) {
    		dirty_components.push(component);
    		schedule_update();
    		component.$$.dirty = blank_object();
    	}
    	component.$$.dirty[key] = true;
    }

    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
    	const parent_component = current_component;
    	set_current_component(component);

    	const props = options.props || {};

    	const $$ = component.$$ = {
    		fragment: null,
    		ctx: null,

    		// state
    		props: prop_names,
    		update: noop,
    		not_equal: not_equal$$1,
    		bound: blank_object(),

    		// lifecycle
    		on_mount: [],
    		on_destroy: [],
    		before_render: [],
    		after_render: [],
    		context: new Map(parent_component ? parent_component.$$.context : []),

    		// everything else
    		callbacks: blank_object(),
    		dirty: null
    	};

    	let ready = false;

    	$$.ctx = instance
    		? instance(component, props, (key, value) => {
    			if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
    				if ($$.bound[key]) $$.bound[key](value);
    				if (ready) make_dirty(component, key);
    			}
    		})
    		: props;

    	$$.update();
    	ready = true;
    	run_all($$.before_render);
    	$$.fragment = create_fragment($$.ctx);

    	if (options.target) {
    		if (options.hydrate) {
    			$$.fragment.l(children(options.target));
    		} else {
    			$$.fragment.c();
    		}

    		if (options.intro && component.$$.fragment.i) component.$$.fragment.i();
    		mount_component(component, options.target, options.anchor);
    		flush();
    	}

    	set_current_component(parent_component);
    }

    class SvelteComponent {
    	$destroy() {
    		destroy(this, true);
    		this.$destroy = noop;
    	}

    	$on(type, callback) {
    		const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
    		callbacks.push(callback);

    		return () => {
    			const index = callbacks.indexOf(callback);
    			if (index !== -1) callbacks.splice(index, 1);
    		};
    	}

    	$set() {
    		// overridden by instance, if it has props
    	}
    }

    class SvelteComponentDev extends SvelteComponent {
    	constructor(options) {
    		if (!options || (!options.target && !options.$$inline)) {
    			throw new Error(`'target' is a required option`);
    		}

    		super();
    	}

    	$destroy() {
    		super.$destroy();
    		this.$destroy = () => {
    			console.warn(`Component was already destroyed`); // eslint-disable-line no-console
    		};
    	}
    }

    /* src\Button.svelte generated by Svelte v3.4.0 */

    const file = "src\\Button.svelte";

    function create_fragment(ctx) {
    	var button, t0, t1, t2, t3_value = ctx.clicks === 1 ? 'time' : 'times', t3, dispose;

    	return {
    		c: function create() {
    			button = element("button");
    			t0 = text("Clicked ");
    			t1 = text(ctx.clicks);
    			t2 = space();
    			t3 = text(t3_value);
    			button.className = "color space border-none bg-purple-700 hover:bg-blue-400  rounded";
    			add_location(button, file, 6, 0, 88);
    			dispose = listen(button, "click", ctx.handleClick);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, button, anchor);
    			append(button, t0);
    			append(button, t1);
    			append(button, t2);
    			append(button, t3);
    		},

    		p: function update(changed, ctx) {
    			if (changed.clicks) {
    				set_data(t1, ctx.clicks);
    			}

    			if ((changed.clicks) && t3_value !== (t3_value = ctx.clicks === 1 ? 'time' : 'times')) {
    				set_data(t3, t3_value);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(button);
    			}

    			dispose();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let clicks = 0;

      const handleClick = () => { const $$result = (clicks += 1); $$invalidate('clicks', clicks); return $$result; };

    	return { clicks, handleClick };
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, []);
    	}
    }

    /* src\App.svelte generated by Svelte v3.4.0 */

    const file$1 = "src\\App.svelte";

    function create_fragment$1(ctx) {
    	var main, h1, t_1, current;

    	var button = new Button({ $$inline: true });

    	return {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Hello !";
    			t_1 = space();
    			button.$$.fragment.c();
    			h1.className = "text-3xl text-red-600";
    			add_location(h1, file$1, 8, 2, 109);
    			add_location(main, file$1, 7, 0, 99);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, main, anchor);
    			append(main, h1);
    			append(main, t_1);
    			mount_component(button, main, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			button.$$.fragment.i(local);

    			current = true;
    		},

    		o: function outro(local) {
    			button.$$.fragment.o(local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(main);
    			}

    			button.$destroy();
    		}
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$1, safe_not_equal, []);
    	}
    }

    const app = new App({
        target: document.body
    });

}());
//# sourceMappingURL=main.js.map
