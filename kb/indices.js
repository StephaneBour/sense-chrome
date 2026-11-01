sense.kb.addEndpointDescription('_refresh', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_refresh"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_flush', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_flush"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_forcemerge', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_forcemerge?max_num_segments=1"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_open', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_open"
    ],
    indices_mode: "required_multi"
});

sense.kb.addEndpointDescription('_close', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_close"
    ],
    indices_mode: "required_multi"
});

sense.kb.addEndpointDescription('_stats', {
    def_method: "GET",
    methods: ["GET"],
    endpoint_autocomplete: [
        "_stats"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_segments', {
    def_method: "GET",
    methods: ["GET"],
    endpoint_autocomplete: [
        "_segments"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_recovery', {
    def_method: "GET",
    methods: ["GET"],
    endpoint_autocomplete: [
        "_recovery"
    ],
    indices_mode: "multi"
});

sense.kb.addEndpointDescription('_rollover', {
    def_method: "POST",
    methods: ["POST"],
    match: /^_rollover/,
    endpoint_autocomplete: [
        "_rollover"
    ],
    indices_mode: "single",
    types_mode: "none",
    data_autocomplete_rules: {
        conditions: {
            max_age: "7d",
            max_docs: 1000000,
            max_size: "50gb",
            max_primary_shard_size: "50gb",
            max_primary_shard_docs: 200000000
        },
        aliases: {},
        mappings: {
            __scope_link: "_mapping"
        },
        settings: {
            __scope_link: "_settings.index"
        }
    }
});

sense.kb.addEndpointDescription('_resize', {
    def_method: "POST",
    methods: ["POST", "PUT"],
    match: /^_(shrink|split|clone)\//,
    endpoint_autocomplete: [
        "_shrink/TARGET_INDEX", "_split/TARGET_INDEX", "_clone/TARGET_INDEX"
    ],
    indices_mode: "single",
    types_mode: "none",
    data_autocomplete_rules: {
        aliases: {},
        settings: {
            __scope_link: "_settings.index"
        }
    }
});

sense.kb.addEndpointDescription('__create_index__', {
    methods: ["PUT", "DELETE", "HEAD", "GET"],
    indices_mode: "single",
    types_mode: "none",
    match: "^/?$",
    endpoint_autocomplete: [
        ""
    ],
    data_autocomplete_rules: {
        mappings: {
            __scope_link: "_mapping"
        },
        settings: {
            __scope_link: "_settings.index"
        },
        aliases: {
            __template: {
                "ALIAS": {}
            },
            "*": {
                filter: {},
                routing: "",
                is_write_index: {__one_of: [true, false]},
                is_hidden: {__one_of: [false, true]}
            }
        }
    }
});
