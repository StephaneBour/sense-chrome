SPAN_QUERIES = {
    // TODO add one_of for objects
    span_first: {__scope_link: ".query.span_first"},
    span_near: {__scope_link: ".query.span_near"},
    span_or: {__scope_link: ".query.span_or"},
    span_not: {__scope_link: ".query.span_not"},
    span_term: {__scope_link: ".query.span_term"},
    span_multi: {__scope_link: ".query.span_multi"},
    span_containing: {__scope_link: ".query.span_containing"},
    span_within: {__scope_link: ".query.span_within"},
    field_masking_span: {__scope_link: ".query.field_masking_span"}
};

const GEO_POINT = {lat: 40.73, lon: -74.1};

sense.kb.addGlobalAutocompleteRules("query", {
    match: {
        __template: {"FIELD": "TEXT"},
        "$FIELD$": {
            "query": "",
            "operator": {__one_of: ["or", "and"]},
            "minimum_should_match": "",
            "analyzer": "",
            "fuzziness": {__one_of: ["AUTO", 0, 1, 2]},
            "prefix_length": 0,
            "max_expansions": 50,
            "fuzzy_transpositions": {__one_of: [true, false]},
            "lenient": {__one_of: [false, true]},
            "zero_terms_query": {__one_of: ["none", "all"]},
            "auto_generate_synonyms_phrase_query": {__one_of: [true, false]},
            "boost": 1.0
        }
    },
    match_phrase: {
        __template: {"FIELD": "PHRASE"},
        "$FIELD$": {
            query: "",
            analyzer: "",
            slop: 0,
            zero_terms_query: {__one_of: ["none", "all"]}
        }
    },
    match_phrase_prefix: {
        __template: {"FIELD": "PREFIX"},
        "$FIELD$": {
            query: "",
            analyzer: "",
            max_expansions: 50,
            slop: 0,
            zero_terms_query: {__one_of: ["none", "all"]}
        }
    },
    match_bool_prefix: {
        __template: {"FIELD": "TEXT"},
        "$FIELD$": {
            query: "",
            analyzer: "",
            operator: {__one_of: ["or", "and"]},
            minimum_should_match: "",
            fuzziness: {__one_of: ["AUTO", 0, 1, 2]}
        }
    },
    multi_match: {
        __template: {"query": "", "fields": []},
        query: "",
        fields: ["$FIELD$"],
        type: {__one_of: ['best_fields', 'most_fields', 'cross_fields', 'phrase', 'phrase_prefix', 'bool_prefix']},
        operator: {__one_of: ["or", "and"]},
        minimum_should_match: "",
        tie_breaker: 0.0,
        analyzer: "",
        fuzziness: {__one_of: ["AUTO", 0, 1, 2]},
        lenient: {__one_of: [false, true]},
        boost: 1.0
    },
    combined_fields: {
        __template: {"query": "", "fields": []},
        query: "",
        fields: ["$FIELD$"],
        operator: {__one_of: ["or", "and"]},
        minimum_should_match: "",
        zero_terms_query: {__one_of: ["none", "all"]}
    },
    bool: {
        filter: [
            {__scope_link: "GLOBAL.query"}
        ],
        must: [
            {__scope_link: "GLOBAL.query"}
        ],
        must_not: [
            {__scope_link: "GLOBAL.query"}
        ],
        should: [
            {__scope_link: "GLOBAL.query"}
        ],
        minimum_should_match: 1,
        boost: 1.0,
        _name: ""
    },
    boosting: {
        __template: {positive: {}, negative: {}, negative_boost: 0.5},
        positive: {__scope_link: ".query"},
        negative: {__scope_link: ".query"},
        negative_boost: 0.5
    },
    ids: {
        __template: {values: ["ID"]},
        values: [""]
    },
    constant_score: {
        __template: {filter: {}, boost: 1.2},
        filter: {__scope_link: ".query"},
        boost: 1.2
    },
    dis_max: {
        __template: {tie_breaker: 0.7, boost: 1.2, queries: []},
        tie_breaker: 0.7,
        boost: 1.2,
        queries: [
            {__scope_link: ".query"}
        ]
    },
    exists: {
        __template: {
            "field": "FIELD"
        },
        field: "$FIELD$"
    },
    function_score: {
        __template: {
            query: {},
            functions: [
                {}
            ]
        },
        query: {__scope_link: ".query"},
        functions: [
            {
                filter: {__scope_link: ".query"},
                weight: 1.0,
                script_score: {
                    script: {__scope_link: "GLOBAL.SCRIPT_ENV"}
                },
                random_score: {seed: 10, field: "_seq_no"},
                field_value_factor: {
                    field: "$FIELD$",
                    factor: 1.2,
                    modifier: {__one_of: ["none", "log", "log1p", "log2p", "ln", "ln1p", "ln2p", "square", "sqrt", "reciprocal"]},
                    missing: 1
                },
                gauss: {"$FIELD$": {origin: "", scale: "", offset: "", decay: 0.5}},
                exp: {"$FIELD$": {origin: "", scale: "", offset: "", decay: 0.5}},
                linear: {"$FIELD$": {origin: "", scale: "", offset: "", decay: 0.5}}
            }
        ],
        score_mode: {__one_of: ["multiply", "sum", "avg", "first", "max", "min"]},
        boost_mode: {__one_of: ["multiply", "replace", "sum", "avg", "max", "min"]},
        max_boost: 10,
        min_score: 0,
        boost: 1.0
    },
    script_score: {
        __template: {
            query: {match_all: {}},
            script: {source: ""}
        },
        query: {__scope_link: ".query"},
        script: {__scope_link: "GLOBAL.SCRIPT_ENV"},
        min_score: 0,
        boost: 1.0
    },
    script: {
        __template: {
            script: {source: ""}
        },
        script: {__scope_link: "GLOBAL.SCRIPT_ENV"}
    },
    fuzzy: {
        __template: {"FIELD": {value: "VALUE"}},
        "$FIELD$": {
            "value": "",
            "fuzziness": {__one_of: ["AUTO", 0, 1, 2]},
            "max_expansions": 50,
            "prefix_length": 0,
            "transpositions": {__one_of: [true, false]},
            "boost": 1.0
        }
    },
    has_child: {
        __template: {type: "CHILD_RELATION", query: {}},
        "type": "",
        "query": {__scope_link: ".query"},
        "score_mode": {__one_of: ["none", "avg", "max", "min", "sum"]},
        "min_children": 1,
        "max_children": 10,
        "ignore_unmapped": {__one_of: [false, true]},
        "inner_hits": {}
    },
    has_parent: {
        __template: {parent_type: "PARENT_RELATION", query: {}},
        "parent_type": "",
        "query": {__scope_link: ".query"},
        "score": {__one_of: [false, true]},
        "ignore_unmapped": {__one_of: [false, true]},
        "inner_hits": {}
    },
    parent_id: {
        __template: {type: "CHILD_RELATION", id: "ID"},
        type: "",
        id: "",
        ignore_unmapped: {__one_of: [false, true]}
    },
    match_all: {},
    match_none: {},
    more_like_this: {
        __template: {
            "fields": ["FIELD"],
            "like": "text like this one",
            "min_term_freq": 1,
            "max_query_terms": 12
        },
        fields: ["$FIELD$"],
        like: "",
        unlike: "",
        min_term_freq: 2,
        max_query_terms: 25,
        stop_words: [""],
        min_doc_freq: 5,
        max_doc_freq: 100,
        min_word_length: 0,
        max_word_length: 0,
        minimum_should_match: "30%",
        boost_terms: 1,
        include: {__one_of: [false, true]},
        boost: 1.0,
        analyzer: ""
    },
    prefix: {
        __template: {
            "FIELD": {"value": ""}
        },
        "$FIELD$": {
            value: "",
            case_insensitive: {__one_of: [false, true]},
            boost: 1.0
        }
    },
    query_string: {
        __template: {
            "default_field": "FIELD",
            "query": "this AND that OR thus"
        },
        query: "",
        default_field: "$FIELD$",
        fields: ["$FIELD$"],
        default_operator: {__one_of: ["OR", "AND"]},
        analyzer: "",
        allow_leading_wildcard: {__one_of: [true, false]},
        enable_position_increments: {__one_of: [true, false]},
        fuzziness: {__one_of: ["AUTO", 0, 1, 2]},
        fuzzy_max_expansions: 50,
        fuzzy_prefix_length: 0,
        phrase_slop: 0,
        boost: 1.0,
        analyze_wildcard: {__one_of: [false, true]},
        minimum_should_match: "20%",
        lenient: {__one_of: [false, true]},
        tie_breaker: 0,
        time_zone: "+01:00",
        type: {__one_of: ['best_fields', 'most_fields', 'cross_fields', 'phrase', 'phrase_prefix', 'bool_prefix']}
    },
    simple_query_string: {
        __template: {
            "query": "",
            "fields": []
        },
        query: "",
        fields: ["$FIELD$"],
        default_operator: {__one_of: ["OR", "AND"]},
        analyzer: "",
        flags: "ALL",
        analyze_wildcard: {__one_of: [false, true]},
        lenient: {__one_of: [false, true]},
        minimum_should_match: "",
        auto_generate_synonyms_phrase_query: {__one_of: [true, false]}
    },
    range: {
        __template: {
            "FIELD": {
                gte: 10,
                lte: 20
            }
        },
        "$FIELD$": {
            __template: {gte: 10, lte: 20},
            gt: 1,
            gte: 1,
            lt: 20,
            lte: 20,
            format: "",
            time_zone: "+01:00",
            relation: {__one_of: ["INTERSECTS", "CONTAINS", "WITHIN"]},
            boost: 1.0
        }
    },
    span_first: {
        __template: {
            "match": {
                "span_term": {"FIELD": "VALUE"}
            },
            "end": 3
        },
        match: SPAN_QUERIES
    },
    span_near: {
        __template: {
            "clauses": [
                {span_term: {"FIELD": {"value": "VALUE"}}}
            ],
            slop: 12,
            in_order: false
        },
        clauses: [
            SPAN_QUERIES
        ],
        slop: 12,
        in_order: {__one_of: [false, true]}
    },
    span_term: {
        __template: {"FIELD": {"value": "VALUE"}},
        "$FIELD$": {
            value: "",
            boost: 2.0
        }
    },
    span_not: {
        __template: {
            include: {
                span_term: {"FIELD": {"value": "VALUE"}}
            },
            exclude: {
                span_term: {"FIELD": {"value": "VALUE"}}
            }
        },
        include: SPAN_QUERIES,
        exclude: SPAN_QUERIES
    },
    span_or: {
        __template: {
            clauses: [
                {span_term: {"FIELD": {"value": "VALUE"}}}
            ]
        },
        clauses: [
            SPAN_QUERIES
        ]
    },
    span_multi: {
        __template: {
            match: {
                prefix: {"FIELD": {"value": "VALUE"}}
            }
        },
        match: {
            prefix: {__scope_link: ".query.prefix"},
            wildcard: {__scope_link: ".query.wildcard"},
            regexp: {__scope_link: ".query.regexp"},
            fuzzy: {__scope_link: ".query.fuzzy"},
            range: {__scope_link: ".query.range"}
        }
    },
    span_containing: {
        __template: {little: {}, big: {}},
        little: SPAN_QUERIES,
        big: SPAN_QUERIES
    },
    span_within: {
        __template: {little: {}, big: {}},
        little: SPAN_QUERIES,
        big: SPAN_QUERIES
    },
    field_masking_span: {
        __template: {query: {}, field: "FIELD"},
        query: SPAN_QUERIES,
        field: "$FIELD$"
    },
    term: {
        __template: {"FIELD": {value: "VALUE"}},
        "$FIELD$": {
            value: "",
            case_insensitive: {__one_of: [false, true]},
            boost: 1.0
        }
    },
    terms: {
        __template: {
            "FIELD": ["VALUE1", "VALUE2"]
        },
        "$FIELD$": [""],
        boost: 1.0
    },
    terms_set: {
        __template: {
            "FIELD": {
                "terms": ["VALUE1", "VALUE2"],
                "minimum_should_match_field": "FIELD"
            }
        },
        "$FIELD$": {
            terms: [""],
            minimum_should_match_field: "$FIELD$",
            minimum_should_match_script: {__scope_link: "GLOBAL.SCRIPT_ENV"}
        }
    },
    wildcard: {
        __template: {
            "FIELD": {value: "VALUE"}
        },
        "$FIELD$": {
            value: "",
            case_insensitive: {__one_of: [false, true]},
            boost: 1.0
        }
    },
    regexp: {
        __template: {"FIELD": {value: "VALUE"}},
        "$FIELD$": {
            value: "",
            boost: 1.0,
            flags: {__one_of: ["ALL", "ANYSTRING", "COMPLEMENT", "EMPTY", "INTERSECTION", "INTERVAL", "NONE"]},
            case_insensitive: {__one_of: [false, true]},
            max_determinized_states: 10000
        }
    },
    nested: {
        __template: {
            path: "path_to_nested_doc",
            query: {}
        },
        path: "$FIELD$",
        query: {__scope_link: ".query"},
        score_mode: {__one_of: ["avg", "sum", "max", "min", "none"]},
        ignore_unmapped: {__one_of: [false, true]},
        inner_hits: {},
        _name: ""
    },
    geo_bounding_box: {
        __template: {
            "FIELD": {
                "top_left": {
                    "lat": 40.73,
                    "lon": -74.1
                },
                "bottom_right": {
                    "lat": 40.717,
                    "lon": -73.99
                }
            }
        },
        "$FIELD$": {
            top_left: GEO_POINT,
            bottom_right: GEO_POINT
        },
        validation_method: {__one_of: ["STRICT", "IGNORE_MALFORMED", "COERCE"]},
        ignore_unmapped: {__one_of: [false, true]}
    },
    geo_distance: {
        __template: {
            distance: "100km",
            "FIELD": {lat: 40.73, lon: -74.1}
        },
        distance: "100km",
        distance_type: {__one_of: ["arc", "plane"]},
        "$FIELD$": GEO_POINT,
        validation_method: {__one_of: ["STRICT", "IGNORE_MALFORMED", "COERCE"]},
        ignore_unmapped: {__one_of: [false, true]}
    },
    geo_shape: {
        __template: {
            "FIELD": {
                shape: {
                    type: "envelope",
                    coordinates: [
                        [-45, 45],
                        [45, -45]
                    ]
                },
                "relation": "within"
            }
        },
        "$FIELD$": {
            shape: {
                type: "",
                coordinates: []
            },
            indexed_shape: {
                id: "",
                index: "$INDEX$",
                path: "$FIELD$"
            },
            relation: {__one_of: ["intersects", "disjoint", "within", "contains"]}
        },
        ignore_unmapped: {__one_of: [false, true]}
    },
    distance_feature: {
        __template: {field: "FIELD", pivot: "7d", origin: "now"},
        field: "$FIELD$",
        pivot: "",
        origin: "",
        boost: 1.0
    },
    rank_feature: {
        __template: {field: "FIELD"},
        field: "$FIELD$",
        saturation: {pivot: 8},
        log: {scaling_factor: 4},
        sigmoid: {pivot: 7, exponent: 0.6},
        linear: {},
        boost: 1.0
    },
    pinned: {
        __template: {ids: ["ID"], organic: {}},
        ids: [""],
        docs: [{_index: "$INDEX$", _id: ""}],
        organic: {__scope_link: ".query"}
    },
    knn: {
        __template: {field: "FIELD", query_vector: [], num_candidates: 100},
        field: "$FIELD$",
        query_vector: [],
        num_candidates: 100,
        filter: {__scope_link: ".query"},
        similarity: 0.5,
        boost: 1.0
    },
    percolate: {
        __template: {field: "FIELD", document: {}},
        field: "$FIELD$",
        document: {},
        documents: [],
        index: "$INDEX$",
        id: ""
    }
});
