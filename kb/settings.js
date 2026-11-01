sense.kb.addEndpointDescription('_settings', {
    match: /^_settings/,
    methods: ["GET", "PUT"],
    endpoint_autocomplete: ['_settings'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        index: {
            number_of_shards: 1,
            number_of_replicas: 1,
            auto_expand_replicas: {__one_of: [false, "0-1", "0-all"]},
            refresh_interval: "1s",
            max_result_window: 10000,
            max_inner_result_window: 100,
            max_terms_count: 65536,
            max_regex_length: 1000,
            "mapping.total_fields.limit": 1000,
            "mapping.depth.limit": 20,
            "mapping.nested_fields.limit": 50,
            "mapping.ignore_malformed": {__one_of: [false, true]},
            codec: {__one_of: ["default", "best_compression"]},
            hidden: {__one_of: [false, true]},
            default_pipeline: "",
            final_pipeline: "",
            "blocks.read_only": {__one_of: [false, true]},
            "blocks.read_only_allow_delete": {__one_of: [false, true]},
            "blocks.read": {__one_of: [true, false]},
            "blocks.write": {__one_of: [true, false]},
            "blocks.metadata": {__one_of: [true, false]},
            "translog.durability": {__one_of: ["request", "async"]},
            "translog.sync_interval": "5s",
            "translog.flush_threshold_size": "512mb",
            "unassigned.node_left.delayed_timeout": "1m",
            "lifecycle.name": "",
            "lifecycle.rollover_alias": "",
            "sort.field": "$FIELD$",
            "sort.order": {__one_of: ["asc", "desc"]},
            routing: {
                allocation: {
                    include: {_tier_preference: "", _name: "", _ip: ""},
                    exclude: {_name: "", _ip: ""},
                    require: {_name: "", _ip: ""},
                    enable: {__one_of: ["all", "primaries", "new_primaries", "none"]},
                    total_shards_per_node: -1
                }
            },
            analysis: {
                analyzer: {},
                normalizer: {},
                tokenizer: {},
                filter: {},
                char_filter: {}
            }
        }
    }
});
