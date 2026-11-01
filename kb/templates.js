// Templates "legacy" (dépréciés en ES 8 mais toujours disponibles)
sense.kb.addEndpointDescription('_template', {
    match: /^_template/,
    def_method: "PUT",
    methods: ["GET", "PUT", "DELETE", "HEAD"],
    endpoint_autocomplete: [
        "_template/TEMPLATE_ID"
    ],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",

    data_autocomplete_rules: {
        index_patterns: ["index*"],
        order: 0,
        version: 1,
        aliases: {},
        mappings: {
            __scope_link: "_mapping"
        },
        settings: {
            __scope_link: "_settings.index"
        }
    }
});

sense.kb.addEndpointDescription('_index_template', {
    match: /^_index_template/,
    def_method: "PUT",
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    endpoint_autocomplete: [
        "_index_template/TEMPLATE_ID"
    ],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",

    data_autocomplete_rules: {
        __template: {
            index_patterns: ["index*"],
            template: {
                settings: {},
                mappings: {}
            }
        },
        index_patterns: ["index*"],
        composed_of: [],
        priority: 100,
        version: 1,
        _meta: {},
        data_stream: {},
        allow_auto_create: {__one_of: [true, false]},
        template: {
            aliases: {},
            mappings: {
                __scope_link: "_mapping"
            },
            settings: {
                __scope_link: "_settings.index"
            }
        }
    }
});

sense.kb.addEndpointDescription('_component_template', {
    match: /^_component_template/,
    def_method: "PUT",
    methods: ["GET", "PUT", "DELETE", "HEAD"],
    endpoint_autocomplete: [
        "_component_template/TEMPLATE_ID"
    ],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",

    data_autocomplete_rules: {
        __template: {
            template: {
                settings: {},
                mappings: {}
            }
        },
        version: 1,
        _meta: {},
        template: {
            aliases: {},
            mappings: {
                __scope_link: "_mapping"
            },
            settings: {
                __scope_link: "_settings.index"
            }
        }
    }
});
