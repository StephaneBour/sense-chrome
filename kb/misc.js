sense.kb.addEndpointDescription('_cache/clear', {
    methods: ["POST"],
    endpoint_autocomplete: ['_cache/clear'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none"
});

// Documents : ES >= 7 n'a plus de type, on utilise _doc / _create / _update / _source
sense.kb.addEndpointDescription('_doc', {
    def_method: "PUT",
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
    match: /^_doc(\/|$)/,
    endpoint_autocomplete: ['_doc', '_doc/ID'],
    indices_mode: "single",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_create', {
    def_method: "PUT",
    methods: ["PUT", "POST"],
    match: /^_create\//,
    endpoint_autocomplete: ['_create/ID'],
    indices_mode: "single",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_source', {
    def_method: "GET",
    methods: ["GET", "HEAD"],
    match: /^_source\//,
    endpoint_autocomplete: ['_source/ID'],
    indices_mode: "single",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_update', {
    def_method: "POST",
    methods: ["POST"],
    match: /^_update\//,
    endpoint_autocomplete: ['_update/ID'],
    indices_mode: "single",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        doc: {},
        doc_as_upsert: {__one_of: [true, false]},
        upsert: {},
        scripted_upsert: {__one_of: [true, false]},
        detect_noop: {__one_of: [true, false]},
        script: {
            __scope_link: "GLOBAL.SCRIPT_ENV"
        }
    }
});

sense.kb.addEndpointDescription('_mget', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: ['_mget'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        ids: [],
        docs: [
            {_index: "$INDEX$", _id: "", _source: ["$FIELD$"]}
        ]
    }
});

sense.kb.addEndpointDescription('_bulk', {
    def_method: "POST",
    methods: ["POST", "PUT"],
    endpoint_autocomplete: ['_bulk'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_reindex', {
    def_method: "POST",
    methods: ["POST"],
    endpoint_autocomplete: ['_reindex'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        __template: {
            source: {index: ""},
            dest: {index: ""}
        },
        conflicts: {__one_of: ["abort", "proceed"]},
        max_docs: 1000,
        source: {
            index: "$INDEX$",
            query: {
                // populated by a global rule
            },
            _source: ["$FIELD$"],
            size: 1000,
            remote: {host: "", username: "", password: ""}
        },
        dest: {
            index: "",
            op_type: {__one_of: ["index", "create"]},
            pipeline: "",
            version_type: {__one_of: ["internal", "external", "external_gte"]}
        },
        script: {
            __scope_link: "GLOBAL.SCRIPT_ENV"
        }
    }
});

sense.kb.addEndpointDescription('_analyze', {
    def_method: "POST",
    methods: ["GET", "POST"],
    endpoint_autocomplete: ['_analyze'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        __template: {
            analyzer: "standard",
            text: ""
        },
        analyzer: "standard",
        tokenizer: "standard",
        filter: [],
        char_filter: [],
        normalizer: "",
        field: "$FIELD$",
        text: "",
        explain: {__one_of: [false, true]}
    }
});

sense.kb.addEndpointDescription('_field_caps', {
    methods: ["GET", "POST"],
    endpoint_autocomplete: ['_field_caps?fields=*'],
    indices_mode: "multi",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_resolve/index', {
    methods: ["GET"],
    match: /^_resolve\/index/,
    endpoint_autocomplete: ['_resolve/index/NAME'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_data_stream', {
    methods: ["GET", "PUT", "DELETE"],
    match: /^_data_stream/,
    endpoint_autocomplete: ['_data_stream', '_data_stream/NAME'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none"
});

sense.kb.addEndpointDescription('_ingest/pipeline', {
    def_method: "PUT",
    methods: ["GET", "PUT", "DELETE"],
    match: /^_ingest\/pipeline/,
    endpoint_autocomplete: ['_ingest/pipeline', '_ingest/pipeline/PIPELINE_ID', '_ingest/pipeline/_simulate'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        description: "",
        processors: [],
        on_failure: [],
        docs: [{_source: {}}],
        _meta: {},
        version: 1
    }
});

sense.kb.addEndpointDescription('_snapshot', {
    methods: ["GET", "PUT", "POST", "DELETE"],
    match: /^_snapshot/,
    endpoint_autocomplete: ['_snapshot', '_snapshot/REPOSITORY', '_snapshot/REPOSITORY/SNAPSHOT'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none",
    data_autocomplete_rules: {
        type: {__one_of: ["fs", "url", "s3", "gcs", "azure", "source"]},
        settings: {location: "", compress: {__one_of: [true, false]}},
        indices: "",
        ignore_unavailable: {__one_of: [false, true]},
        include_global_state: {__one_of: [true, false]}
    }
});

sense.kb.addEndpointDescription('_security/_authenticate', {
    methods: ["GET"],
    endpoint_autocomplete: ['_security/_authenticate'],
    indices_mode: "none",
    types_mode: "none",
    doc_id_mode: "none"
});
