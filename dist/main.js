
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

    function svg_element(name) {
    	return document.createElementNS('http://www.w3.org/2000/svg', name);
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

    function attr(node, attribute, value) {
    	if (value == null) node.removeAttribute(attribute);
    	else node.setAttribute(attribute, value);
    }

    function children(element) {
    	return Array.from(element.childNodes);
    }

    let current_component;

    function set_current_component(component) {
    	current_component = component;
    }

    function get_current_component() {
    	if (!current_component) throw new Error(`Function called outside component initialization`);
    	return current_component;
    }

    function onDestroy(fn) {
    	get_current_component().$$.on_destroy.push(fn);
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

    function noop$1() {}

    function safe_not_equal$1(a, b) {
    	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal$1(value, new_value)) {
                value = new_value;
                if (!stop) {
                    return; // not ready
                }
                subscribers.forEach((s) => s[1]());
                subscribers.forEach((s) => s[0](value));
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe$$1(run$$1, invalidate = noop$1) {
            const subscriber = [run$$1, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop$1;
            }
            run$$1(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                }
            };
        }
        return { set, update, subscribe: subscribe$$1 };
    }

    const searchLocation = writable("");
    const currentLat = writable("");
    const currentLong = writable("");

    /* src\components\Searchbar.svelte generated by Svelte v3.4.0 */

    const file = "src\\components\\Searchbar.svelte";

    function create_fragment(ctx) {
    	var div, input, t, button, svg, circle, line0, line1, line2, line3, dispose;

    	return {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t = space();
    			button = element("button");
    			svg = svg_element("svg");
    			circle = svg_element("circle");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			line2 = svg_element("line");
    			line3 = svg_element("line");
    			input.placeholder = "Where are you?";
    			input.className = "inline bg-transparent p-4 w-full outline-none";
    			attr(input, "type", "text");
    			add_location(input, file, 33, 2, 888);
    			attr(circle, "cx", "12");
    			attr(circle, "cy", "12");
    			attr(circle, "r", "10");
    			add_location(circle, file, 52, 6, 1514);
    			attr(line0, "x1", "22");
    			attr(line0, "y1", "12");
    			attr(line0, "x2", "18");
    			attr(line0, "y2", "12");
    			add_location(line0, file, 53, 6, 1555);
    			attr(line1, "x1", "6");
    			attr(line1, "y1", "12");
    			attr(line1, "x2", "2");
    			attr(line1, "y2", "12");
    			add_location(line1, file, 54, 6, 1603);
    			attr(line2, "x1", "12");
    			attr(line2, "y1", "6");
    			attr(line2, "x2", "12");
    			attr(line2, "y2", "2");
    			add_location(line2, file, 55, 6, 1649);
    			attr(line3, "x1", "12");
    			attr(line3, "y1", "22");
    			attr(line3, "x2", "12");
    			attr(line3, "y2", "18");
    			add_location(line3, file, 56, 6, 1695);
    			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr(svg, "viewBox", "0 0 24 24");
    			attr(svg, "fill", "none");
    			attr(svg, "stroke-width", "2");
    			attr(svg, "stroke-linecap", "round");
    			attr(svg, "stroke-linejoin", "round");
    			attr(svg, "class", "stroke-current text-gray-500 inline-block w-10 h-10");
    			add_location(svg, file, 43, 4, 1255);
    			button.className = "absolute right-0 top-0 p-1 m-1 rounded-full items-center bg-transparent focus: outline-none hover:bg-gray-300";
    			add_location(button, file, 39, 2, 1084);
    			div.className = "relative shadow bg-gray-200 appearance-none border h-auto mt-2 pr-12 rounded-full w-full sm:w-1/2";
    			add_location(div, file, 30, 0, 768);

    			dispose = [
    				listen(input, "input", ctx.input_handler),
    				listen(button, "click", getLocation)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, input);
    			append(div, t);
    			append(div, button);
    			append(button, svg);
    			append(svg, circle);
    			append(svg, line0);
    			append(svg, line1);
    			append(svg, line2);
    			append(svg, line3);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			run_all(dispose);
    		}
    	};
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(handlePosition, handleError);
      } else {
        console.log("geolocation not supported");
      }
    }

    function handlePosition(currentPosition) {
      currentLat.set(currentPosition.coords.latitude);
      currentLong.set(currentPosition.coords.longitude);
    }

    function handleError(error) {
      console.log(`Error: ${error.code}`);
    }

    function instance($$self) {
    	

      onDestroy(() => {
        if (navigator.geolocation) {
          navigator.geolocation.clearWatch();
          currentLat.set("");
          currentLong.set("");
        }
      });

    	function input_handler(input) {
    		return searchLocation.set(input.srcElement.value);
    	}

    	return { input_handler };
    }

    class Searchbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, []);
    	}
    }

    /* src\App.svelte generated by Svelte v3.4.0 */

    const file$1 = "src\\App.svelte";

    function create_fragment$1(ctx) {
    	var main, current;

    	var searchbar = new Searchbar({ $$inline: true });

    	return {
    		c: function create() {
    			main = element("main");
    			searchbar.$$.fragment.c();
    			main.className = "p-4";
    			add_location(main, file$1, 6, 0, 115);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, main, anchor);
    			mount_component(searchbar, main, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			searchbar.$$.fragment.i(local);

    			current = true;
    		},

    		o: function outro(local) {
    			searchbar.$$.fragment.o(local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(main);
    			}

    			searchbar.$destroy();
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
