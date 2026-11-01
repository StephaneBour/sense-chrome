// ES >= 7 : les mappings n'ont plus de type, les champs sont directement sous "properties"
sense.kb.addEndpointDescription('_mapping', {
    def_method: "GET",
    methods: ["GET", "PUT"],
    indices_mode: "multi",
    types_mode: "none",
    data_autocomplete_rules: {
        __template: {
            properties: {
                "FIELD": {
                    "type": "keyword"
                }
            }
        },
        "dynamic": {__one_of: [true, false, "strict", "runtime"]},
        "date_detection": {__one_of: [true, false]},
        "numeric_detection": {__one_of: [true, false]},
        "dynamic_date_formats": ["strict_date_optional_time"],
        "_source": {
            enabled: {__one_of: [true, false]},
            includes: [],
            excludes: []
        },
        "_routing": {
            required: {__one_of: [true, false]}
        },
        "_meta": {},
        "dynamic_templates": [
            {
                __template: {
                    "NAME": {
                        "match_mapping_type": "string",
                        "mapping": {
                            "type": "keyword"
                        }
                    }
                }
            }
        ],
        "runtime": {
            __template: {
                "FIELD": {
                    "type": "keyword",
                    "script": {
                        "source": "emit(doc['FIELD'].value)"
                    }
                }
            },
            "*": {
                type: {__one_of: ["boolean", "composite", "date", "double", "geo_point", "ip", "keyword", "long", "lookup"]},
                script: {
                    __scope_link: "GLOBAL.SCRIPT_ENV"
                }
            }
        },
        "properties": {
            "*": {
                type: {
                    __one_of: ["text", "keyword", "constant_keyword", "wildcard", "match_only_text",
                        "long", "integer", "short", "byte", "double", "float", "half_float", "scaled_float", "unsigned_long",
                        "date", "date_nanos", "boolean", "binary", "ip", "version",
                        "object", "nested", "flattened", "join", "alias",
                        "geo_point", "geo_shape", "point", "shape",
                        "integer_range", "float_range", "long_range", "double_range", "date_range", "ip_range",
                        "completion", "search_as_you_type", "token_count", "dense_vector", "sparse_vector",
                        "rank_feature", "rank_features", "percolator", "histogram", "semantic_text"]
                },

                // common
                index: {__one_of: [true, false]},
                store: {__one_of: [false, true]},
                doc_values: {__one_of: [true, false]},
                null_value: "",
                copy_to: ["$FIELD$"],
                meta: {},

                // text / keyword
                analyzer: "standard",
                search_analyzer: "standard",
                search_quote_analyzer: "standard",
                normalizer: "",
                ignore_above: 256,
                index_options: {__one_of: ["docs", "freqs", "positions", "offsets"]},
                index_prefixes: {min_chars: 2, max_chars: 5},
                index_phrases: {__one_of: [false, true]},
                norms: {__one_of: [true, false]},
                term_vector: {__one_of: ["no", "yes", "with_positions", "with_offsets", "with_positions_offsets"]},
                position_increment_gap: 100,
                fielddata: {__one_of: [false, true]},
                eager_global_ordinals: {__one_of: [false, true]},
                similarity: {__one_of: ["BM25", "boolean", "cosine", "dot_product", "l2_norm", "max_inner_product"]},

                // numeric
                coerce: {__one_of: [true, false]},
                ignore_malformed: {__one_of: [false, true]},
                scaling_factor: 100,

                // dates
                format: {
                    __one_of: ["strict_date_optional_time", "strict_date_optional_time_nanos", "epoch_millis", "epoch_second",
                        "basic_date", "basic_date_time", "basic_date_time_no_millis",
                        "date", "date_hour", "date_hour_minute", "date_hour_minute_second", "date_hour_minute_second_millis",
                        "date_optional_time", "date_time", "date_time_no_millis",
                        "strict_date", "strict_date_time", "strict_date_time_no_millis",
                        "hour_minute", "hour_minute_second", "time", "time_no_millis",
                        "week_date", "year", "year_month", "year_month_day",
                        "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd"]
                },
                locale: "",

                // alias
                path: "$FIELD$",

                // join
                relations: {
                    __template: {"PARENT": "CHILD"}
                },

                // dense_vector
                dims: 128,

                // objects
                enabled: {__one_of: [true, false]},
                dynamic: {__one_of: [true, false, "strict", "runtime"]},
                include_in_parent: {__one_of: [false, true]},
                include_in_root: {__one_of: [false, true]},
                properties: {
                    __scope_link: "_mapping.properties"
                },

                // multi-fields
                fields: {
                    __template: {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    },
                    "*": {
                        __scope_link: "_mapping.properties.$FIELD$"
                    }
                }
            }
        }
    }
});
