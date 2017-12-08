sense.kb.addGlobalAutocompleteRules("aggregations", {
        avg: {
            __template: {field: ""},
            field: "$FIELD$",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        cardinality: {
            __template: {field: "", precision_threshold: 1000},
            field: "$FIELD$",
            precision_threshold: "",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        extended_stats: {
            __template: {field: ""},
            field: "$FIELD$",
            sigma: "",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        geo_bounds: {
            __template: {field: ""},
            field: "$FIELD$",
            wrap_longitude: {__one_of: [true, false]},
        },
        geo_centroid: {
            __template: {field: ""},
            field: "$FIELD$",
        },
        max: {
            __template: {field: ""},
            field: "$FIELD$",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        min: {
            __template: {field: ""},
            field: "$FIELD$",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        percentiles: {
            __template: {field: ""},
            field: "$FIELD$",
            percents: [],
            keyed: {__one_of: [true, false]},
            missing: "",
            tdigest: {
                compression: ""
            },
            hdr: {
                number_of_significant_value_digits: ""
            },
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        percentile_ranks: {
            __template: {field: ""},
            field: "$FIELD$",
            values: [],
            keyed: {__one_of: [true, false]},
            missing: "",
            hdr: {
                number_of_significant_value_digits: ""
            },
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        scripted_metric: {
            init_script: {},
            map_script: {},
            combine_script: {},
            reduce_script: {},
        },
        stats: {
            __template: {field: ""},
            field: "$FIELD$",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        sum: {
            __template: {field: ""},
            field: "$FIELD$",
            missing: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        top_hits: {
            __template: {sort: [{date: {order: "desc"}}], _source: {includes: [""]}},
            _source: {
                includes: ["$FIELD$"]
            },
            sort: {
                __template: [
                    {"FIELD": {"order": "desc"}}
                ],
                __any_of: [
                    {
                        "$FIELD$": {
                            "order": {__one_of: ["desc", "asc"]}
                        }
                    },
                    "$FIELD$"
                ]
            }
        },
        value_count: {
            __template: {field: ""},
            field: "$FIELD$",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
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
        }
    }
);