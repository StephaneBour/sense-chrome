// ES >= 5 : les filtres ont été fusionnés avec les requêtes,
// tout contexte "filter" (bool.filter, constant_score.filter, aggregation filter...) attend une requête.
sense.kb.addGlobalAutocompleteRules("filter", {
    __scope_link: "GLOBAL.query"
});

sense.kb.addGlobalAutocompleteRules("post_filter", {
    __scope_link: "GLOBAL.query"
});
