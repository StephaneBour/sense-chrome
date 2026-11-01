sense.kb.addEndpointDescription('_aliases', {
    match: /^_aliases/,
    def_method: "GET",
    methods: ["GET", "POST"],
    endpoint_autocomplete: [
        "_aliases"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        "actions": {
            __template: [
                {"add": {"index": "test1", "alias": "alias1"}}
            ],
            __any_of: [
                {
                    add: {
                        index: "$INDEX$",
                        indices: ["$INDEX$"],
                        alias: "",
                        aliases: [],
                        filter: {},
                        routing: "1",
                        search_routing: "1,2",
                        index_routing: "1",
                        is_write_index: {__one_of: [true, false]},
                        is_hidden: {__one_of: [false, true]},
                        must_exist: {__one_of: [false, true]}
                    },
                    remove: {
                        index: "$INDEX$",
                        indices: ["$INDEX$"],
                        alias: "",
                        aliases: [],
                        must_exist: {__one_of: [false, true]}
                    },
                    remove_index: {
                        index: "$INDEX$",
                        indices: ["$INDEX$"]
                    }
                }
            ]
        }
    }
});

sense.kb.addEndpointDescription('_alias', {
    match: /^_alias(\/|$)/,
    def_method: "GET",
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    endpoint_autocomplete: [
        "_alias", "_alias/ALIAS"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        filter: {},
        routing: "",
        is_write_index: {__one_of: [true, false]}
    }
});
