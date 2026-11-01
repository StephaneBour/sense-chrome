sense.kb.addGlobalAutocompleteRules("aggregations", {
        // Metrics Aggregations
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
        weighted_avg: {
            __template: {value: {field: ""}, weight: {field: ""}},
            value: {field: "$FIELD$", missing: ""},
            weight: {field: "$FIELD$", missing: ""}
        },
        median_absolute_deviation: {
            __template: {field: ""},
            field: "$FIELD$",
            compression: 1000,
            missing: ""
        },
        string_stats: {
            __template: {field: ""},
            field: "$FIELD$",
            show_distribution: {__one_of: [false, true]}
        },
        top_metrics: {
            __template: {metrics: {field: ""}, sort: {"FIELD": "desc"}},
            metrics: {field: "$FIELD$"},
            sort: {"$FIELD$": {__one_of: ["desc", "asc"]}},
            size: 1
        },
        value_count: {
            __template: {field: ""},
            field: "$FIELD$",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },

        // Buckets aggregation
        date_histogram: {
            __template: {field: "", calendar_interval: "month"},
            calendar_interval: {__one_of: ["year", "quarter", "month", "week", "day", "hour", "minute", "1y", "1q", "1M", "1w", "1d", "1h", "1m"]},
            fixed_interval: {__one_of: ["1d", "12h", "1h", "30m", "1m", "30s"]},
            field: "$FIELD$",
            format: "",
            time_zone: "+01:00",
            offset: "",
            keyed: {__one_of: [true, false]},
            missing: "",
            min_doc_count: "",
            extended_bounds: {
                min: "",
                max: ""
            },
            hard_bounds: {
                min: "",
                max: ""
            }
        },
        auto_date_histogram: {
            __template: {field: "", buckets: 10},
            field: "$FIELD$",
            buckets: 10,
            format: "",
            time_zone: "+01:00",
            minimum_interval: {__one_of: ["year", "month", "day", "hour", "minute", "second"]}
        },
        composite: {
            __template: {
                size: 10,
                sources: [
                    {"NAME": {"terms": {"field": ""}}}
                ]
            },
            size: 10,
            sources: [
                {
                    "*": {
                        terms: {field: "$FIELD$", missing_bucket: {__one_of: [false, true]}, order: {__one_of: ["asc", "desc"]}},
                        histogram: {field: "$FIELD$", interval: 5},
                        date_histogram: {field: "$FIELD$", calendar_interval: "1d", time_zone: "+01:00"},
                        geotile_grid: {field: "$FIELD$", precision: 8}
                    }
                }
            ],
            after: {}
        },
        multi_terms: {
            __template: {terms: [{field: ""}, {field: ""}]},
            terms: [{field: "$FIELD$", missing: ""}],
            size: 10,
            order: {
                _count: {__one_of: ["desc", "asc"]},
                _key: {__one_of: ["desc", "asc"]}
            }
        },
        rare_terms: {
            __template: {field: ""},
            field: "$FIELD$",
            max_doc_count: 1
        },
        variable_width_histogram: {
            __template: {field: "", buckets: 10},
            field: "$FIELD$",
            buckets: 10
        },
        geohash_grid: {
            __template: {field: "", precision: 5},
            field: "$FIELD$",
            precision: 5,
            size: 10000
        },
        geotile_grid: {
            __template: {field: "", precision: 8},
            field: "$FIELD$",
            precision: 8,
            size: 10000
        },
        children: {
            __template: {type: "CHILD_RELATION"},
            type: ""
        },
        parent: {
            __template: {type: "CHILD_RELATION"},
            type: ""
        },
        date_range: {
            __template: {field: "", range: [{gte: "now-30d", lte: "now"}]},
            field: "$FIELD$",
            format: "",
            range: [{gte: "", gt: "", lt: "", lte: "", to: "", from: ""}],
        },
        diversified_sampler: {
            __template: {field: "", shard_size: ""},
            shard_size: "",
            field: "$FIELD$",
            max_docs_per_value: "",
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        filter: {
            __scope_link: ".query"
        },
        filters: {
            other_bucket_key: "",
            filters: {
                "*": {
                    __scope_link: ".query"
                }
            }
        },
        geo_distance: {
            __template: {field: "", origin: ""},
            origin: "",
            field: "$FIELD$",
            ranges: [{gte: "", gt: "", lt: "", lte: "", to: "", from: ""}],
            unit: "",
            distance_type: {__one_of: ["arc", "plane"]},
            keyed: {__one_of: [true, false]},
        },
        global: {},
        histogram: {
            __template: {field: "", interval: "50"},
            interval: "",
            field: "$FIELD$",
            offset: "",
            keyed: {__one_of: [true, false]},
            missing: "",
            extended_bounds: {
                min: "",
                max: ""
            },
            min_doc_count: ""
        },
        ip_range: {
            __template: {field: "", ranges: [{to: ""}, {from: ""}]},
            field: "$FIELD$",
            ranges: [{to: "", from: "", mask: ""}],
            keyed: {__one_of: [true, false]},
        },
        missing: {
            __template: {
                field: ""
            }
            ,
            field: "$FIELD$",
        }
        ,
        nested: {
            __template: {
                path: ""
            },
            path: "$FIELD$"
        },
        range: {
            __template: {field: "", ranges: [{to: ""}, {from: ""}]},
            field: "$FIELD$",
            ranges: [{to: "", from: "", key: ""}],
            keyed: {__one_of: [true, false]},
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            }
        },
        reverse_nested: {},
        sampler: {
            __template: {shard_size: "100"},
            shard_size: ""
        },
        significant_terms: {
            __template: {field: ""},
            field: "$FIELD$"
        },
        significant_text: {
            __template: {field: ""},
            field: "$FIELD$"
        },
        terms: {
            __template: {
                field: ""
            }
            ,
            field: "$FIELD$",
            size:
                "",
            min_doc_count: 1,
            shard_size: "",
            missing: "",
            include: "",
            exclude: "",
            execution_hint: {__one_of: ["map", "global_ordinals"]},
            collect_mode: {__one_of: ["breadth_first", "depth_first"]},
            show_term_doc_count_error:
                {
                    __one_of: [true, false]
                }
            ,
            order: {
                _count: {
                    __one_of: ["desc", "asc"]
                }
                ,
                _key: {
                    __one_of: ["desc", "asc"]
                }
                ,
                "*":
                    {
                        __one_of: ["desc", "asc"]
                    }
            }
        }
        ,


        // Pipeline aggregations
        avg_bucket: {
            __template: {buckets_path: ""},
            buckets_path: "",
            gap_policy: {__one_of: ["skip", "insert_zeros", "keep_values"]}
        },
        max_bucket: {__scope_link: "GLOBAL.aggregations.avg_bucket"},
        min_bucket: {__scope_link: "GLOBAL.aggregations.avg_bucket"},
        sum_bucket: {__scope_link: "GLOBAL.aggregations.avg_bucket"},
        stats_bucket: {__scope_link: "GLOBAL.aggregations.avg_bucket"},
        extended_stats_bucket: {__scope_link: "GLOBAL.aggregations.avg_bucket"},
        percentiles_bucket: {
            __template: {buckets_path: ""},
            buckets_path: "",
            percents: []
        },
        cumulative_sum: {
            __template: {buckets_path: ""},
            buckets_path: "",
            format: ""
        },
        derivative: {
            __template: {buckets_path: ""},
            buckets_path: "",
            gap_policy: {__one_of: ["skip", "insert_zeros", "keep_values"]},
            unit: ""
        },
        moving_fn: {
            __template: {buckets_path: "", window: 10, script: "MovingFunctions.unweightedAvg(values)"},
            buckets_path: "",
            window: 10,
            shift: 0,
            script: ""
        },
        bucket_script: {
            __template: {buckets_path: {}, script: ""},
            buckets_path: {},
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            },
            gap_policy: {__one_of: ["skip", "insert_zeros", "keep_values"]}
        },
        bucket_selector: {
            __template: {buckets_path: {}, script: ""},
            buckets_path: {},
            script: {
                __scope_link: "GLOBAL.SCRIPT_ENV"
            },
            gap_policy: {__one_of: ["skip", "insert_zeros", "keep_values"]}
        },
        bucket_sort: {
            __template: {sort: [], size: 10},
            sort: [],
            from: 0,
            size: 10,
            gap_policy: {__one_of: ["skip", "insert_zeros", "keep_values"]}
        },

// Loop
        aggs: {
            __template: {
                "aggregation_name":
                    {}
            }
            ,
            "*":
                {
                    __scope_link: "GLOBAL.aggregations"
                }
        }
        ,
        aggregations: {
            __template: {
                "aggregation_name":
                    {}
            }
            ,
            "*":
                {
                    __scope_link: "GLOBAL.aggregations"
                }
        }
    }
);