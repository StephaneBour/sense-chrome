sense.kb.addEndpointDescription('_search', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: [
        "_search"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        min_score: 0.5,
        query: {
            // populated by a global rule
        },
        aggs: {
            __template: {
                "aggregation_name": {}
            },
            "*": {
                __scope_link: "GLOBAL.aggregations"
            }
        },
        aggregations: {
            __template: {
                "aggregation_name": {}
            },
            "*": {
                __scope_link: "GLOBAL.aggregations"
            }
        },
        post_filter: {
            __scope_link: "GLOBAL.query"
        },
        size: {__template: 20},
        from: {},
        _source: {
            __any_of: [
                "$FIELD$",
                {includes: ["$FIELD$"], excludes: ["$FIELD$"]}
            ]
        },
        sort: {
            __template: [
                {"FIELD": {"order": "desc"}}
            ],
            __any_of: [
                {
                    "$FIELD$": {
                        "order": {__one_of: ["desc", "asc"]},
                        "mode": {__one_of: ["min", "max", "sum", "avg", "median"]},
                        "missing": {__one_of: ["_last", "_first"]},
                        "unmapped_type": "",
                        "format": ""
                    }
                },
                "$FIELD$",
                "_score",
                "_doc"
            ]
        },
        search_after: [],
        track_total_hits: {__one_of: [true, false, 10000]},
        track_scores: {__one_of: [true, false]},
        timeout: "1s",
        terminate_after: 1000,
        fields: {
            __template: ["FIELD"],
            __any_of: [
                "$FIELD$",
                {field: "$FIELD$", format: ""}
            ]
        },
        stored_fields: ["$FIELD$"],
        docvalue_fields: {
            __any_of: [
                "$FIELD$",
                {field: "$FIELD$", format: ""}
            ]
        },
        runtime_mappings: {
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
        script_fields: {
            __template: {
                "FIELD": {
                    "script": {
                        "source": ""
                    }
                }
            },
            "*": {
                script: {
                    __scope_link: "GLOBAL.SCRIPT_ENV"
                }
            }
        },
        collapse: {
            __template: {field: "FIELD"},
            field: "$FIELD$",
            inner_hits: {
                name: "",
                size: 5,
                sort: []
            },
            max_concurrent_group_searches: 4
        },
        pit: {
            __template: {id: "", keep_alive: "1m"},
            id: "",
            keep_alive: "1m"
        },
        knn: {
            __template: {field: "FIELD", query_vector: [], k: 10, num_candidates: 100},
            field: "$FIELD$",
            query_vector: [],
            k: 10,
            num_candidates: 100,
            filter: {},
            similarity: 0.5,
            boost: 1.0
        },
        rescore: {
            window_size: 50,
            query: {
                rescore_query: {},
                query_weight: 0.7,
                rescore_query_weight: 1.2,
                score_mode: {__one_of: ["total", "multiply", "avg", "max", "min"]}
            }
        },
        suggest: {
            __template: {
                "SUGGESTION_NAME": {
                    "text": "",
                    "term": {"field": "FIELD"}
                }
            },
            text: "",
            "*": {
                text: "",
                prefix: "",
                term: {field: "$FIELD$", size: 5},
                phrase: {field: "$FIELD$", size: 5},
                completion: {field: "$FIELD$", size: 5, skip_duplicates: {__one_of: [true, false]}}
            }
        },
        highlight: {
            // populated by a global rule
        },
        indices_boost: [],
        version: {__one_of: [true, false]},
        seq_no_primary_term: {__one_of: [true, false]},
        explain: {__one_of: [true, false]},
        profile: {__one_of: [true, false]},
        stats: [""]
    }
});

sense.kb.addEndpointDescription('_count', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: [
        "_count"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        query: {
            // populated by a global rule
        }
    }
});

sense.kb.addEndpointDescription('_delete_by_query', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_delete_by_query"
    ],
    indices_mode: "required_multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        query: {
            // populated by a global rule
        },
        max_docs: 1000
    }
});

sense.kb.addEndpointDescription('_update_by_query', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: [
        "_update_by_query"
    ],
    indices_mode: "required_multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        query: {
            // populated by a global rule
        },
        script: {
            __scope_link: "GLOBAL.SCRIPT_ENV"
        },
        max_docs: 1000,
        conflicts: {__one_of: ["abort", "proceed"]}
    }
});

sense.kb.addEndpointDescription('_explain', {
    def_method: "POST",
    methods: ["GET", "POST"],
    match: /^_explain\//,
    endpoint_autocomplete: [
        "_explain/ID"
    ],
    indices_mode: "single",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        query: {
            // populated by a global rule
        }
    }
});

sense.kb.addEndpointDescription('_validate/query', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: [
        "_validate/query"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        query: {
            // populated by a global rule
        }
    }
});

sense.kb.addEndpointDescription('_pit', {
    def_method: "POST",
    methods: ["POST", "DELETE"],
    match: /^_pit/,
    endpoint_autocomplete: [
        "_pit?keep_alive=1m"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        id: ""
    }
});

sense.kb.addEndpointDescription('_msearch', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: [
        "_msearch"
    ],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none"
});
