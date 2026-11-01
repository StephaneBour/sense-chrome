sense.kb.addGlobalAutocompleteRules("highlight", {
        pre_tags: [], post_tags: [], tags_schema: "styled",
        type: {__one_of: ["unified", "plain", "fvh"]},
        fragment_size: 100,
        number_of_fragments: 5,
        require_field_match: {__one_of: [true, false]},
        highlight_query: {},
        fields: {"$FIELD$": {"fragment_size": 100, "number_of_fragments": 5, "type": {__one_of: ["unified", "plain", "fvh"]}}}
    }
);

// only used with scope links as there is no common name for scripts
sense.kb.addGlobalAutocompleteRules("SCRIPT_ENV", {
        __template: {
            source: "",
            lang: "painless"
        },
        source: "",
        lang: {__one_of: ["painless", "expression", "mustache"]},
        params: {},
        id: ""
    }
);
