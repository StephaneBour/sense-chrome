(function () {
    const global = window;

    let currentServer;
    let per_index_types = {};
    let per_alias_indexes = [];

    function expandAliases(indicesOrAliases) {
        // takes a list of indices or aliases or a string which may be either and returns a list of indices
        // returns a list for multiple values or a string for a single.

        if (!indicesOrAliases) return indicesOrAliases;

        if (typeof indicesOrAliases === "string") indicesOrAliases = [indicesOrAliases];
        indicesOrAliases = $.map(indicesOrAliases, function (iOrA) {
            if (per_alias_indexes[iOrA]) return per_alias_indexes[iOrA];
            return [iOrA];
        });
        let ret = [].concat.apply([], indicesOrAliases);
        ret.sort();
        let last;
        ret = $.map(ret, function (v) {
            const r = last == v ? null : v;
            last = v;
            return r;
        });
        return ret.length > 1 ? ret : ret[0];
    }

    function getFields(indices, types) {
        // get fields for indices and types. Both can be a list, a string or null (meaning all).
        let ret = [];
        indices = expandAliases(indices);
        if (typeof indices == "string") {
            const type_dict = per_index_types[indices];
            if (!type_dict) return [];

            if (typeof types == "string") {
                const f = type_dict[types];
                ret = f ? f : [];
            } else {
                // filter what we need
                $.each(type_dict, function (type, fields) {
                    if (!types || types.length === 0 || $.inArray(type, types) !== -1)
                        ret.push(fields);
                });

                ret = [].concat.apply([], ret);
            }
        } else {
            // multi index mode.
            $.each(per_index_types, function (index) {
                if (!indices || indices.length === 0 || $.inArray(index, indices) !== -1)
                    ret.push(getFields(index, types));
            });
            ret = [].concat.apply([], ret);
        }

        return ret;
    }

    function getTypes(indices) {
        let ret = [];

        indices = expandAliases(indices);
        if (typeof indices == "string") {
            const type_dict = per_index_types[indices];
            if (!type_dict) return [];

            // filter what we need
            $.each(type_dict, function (type) {
                ret.push(type);
            });
        } else {
            // multi index mode.
            $.each(per_index_types, function (index) {
                if (!indices || $.inArray(index, indices) !== -1)
                    ret.push(getTypes(index));
            });
            ret = [].concat.apply([], ret);
        }
        return ret.filter(function (v, i, a) {
            return a.indexOf(v) === i
        }); // dedupe array;

    }


    function getIndices(include_aliases) {
        const ret = [];
        $.each(per_index_types, function (index) {
            ret.push(index);
        });
        if (typeof include_aliases === "undefined" ? true : include_aliases) {
            $.each(per_alias_indexes, function (alias) {
                ret.push(alias);
            });
        }
        return ret;
    }

    function getFieldNamesFromFieldMapping(field_name, field_mapping) {
        let nested_fields;
        if (field_mapping['enabled'] === false) return [];

        function applyPathSettings(nested_field_names) {
            const path_type = field_mapping['path'] || "full";
            if (path_type === "full") {
                return $.map(nested_field_names, function (f) {
                    return field_name + "." + f;
                });
            }
            return nested_field_names;
        }

        if (field_mapping["properties"]) {
            nested_fields = getFieldNamesFromTypeMapping(field_mapping);
            return applyPathSettings(nested_fields);
        }

        if (field_mapping['type'] === 'multi_field') {
            nested_fields = $.map(field_mapping['fields'], function (field_mapping, field_name) {
                return getFieldNamesFromFieldMapping(field_name, field_mapping);
            });

            return applyPathSettings(nested_fields);
        }

        if (field_mapping["index_name"]) return [field_mapping["index_name"]];
        return [field_name];
    }

    function extractConcatenatedKeys(json) {
        let keys = [];

        function extractKeys(obj, prefix) {
            for (let key in obj) {
                // Construire le chemin complet de la clé
                let fullPath = prefix ? prefix + "." + key : key;

                if (obj.hasOwnProperty(key)) {
                    // Si c'est un objet avec des propriétés, on explore récursivement
                    if (obj[key] && typeof obj[key] === 'object' && obj[key].hasOwnProperty('properties')) {
                        extractKeys(obj[key].properties, fullPath);
                    } else {
                        // Sinon, on ajoute simplement la clé complète
                        keys.push(fullPath);
                    }
                }
            }
        }

        extractKeys(json);
        return keys;
    }

    function getFieldNamesFromTypeMapping(type_mapping) {
        return extractConcatenatedKeys(type_mapping);
    }

    function loadMappings(mappings) {
        per_index_types = {};
        $.each(mappings, function (index, index_mapping) {
            const normalized_index_mappings = {};

            let mapping;

            if (typeof index_mapping['mappings'] == 'undefined') {
                mapping = index_mapping;
            } else {
                mapping = index_mapping['mappings'];
            }

            $.each(mapping, function (type_name, type_mapping) {
                normalized_index_mappings[type_name] = getFieldNamesFromTypeMapping(type_mapping);
            });
            per_index_types[index] = normalized_index_mappings;
        });
    }

    function loadAliases(aliases) {
        per_alias_indexes = {}
        $.each(aliases, function (index, index_aliases) {
            $.each(index_aliases.aliases, function (alias) {
                if (alias === index) return; // alias which is identical to index means no index.
                let cur_aliases = per_alias_indexes[alias];
                if (!cur_aliases) {
                    cur_aliases = [];
                    per_alias_indexes[alias] = cur_aliases;
                }
                cur_aliases.push(index);
            });
        });

        per_alias_indexes['_all'] = getIndices(false);
    }

    function clear() {
        per_index_types = {};
        per_alias_indexes = {};
    }

    function retrieveMappingFromServer() {
        if (!currentServer) return;

        // Reset autocomplete values
        clear();

        callES(currentServer, "_mapping", "GET", null, function (data) {
            loadMappings(data);
        });
        callES(currentServer, "_aliases", "GET", null, function (data) {
            loadAliases(data);
        });
    }

    function notifyServerChange(newServer) {
        if (newServer.indexOf("://") < 0) newServer = "http://" + newServer;
        newServer = newServer.trim("/");
        if (newServer === currentServer) return; // already have it.
        currentServer = newServer;
        retrieveMappingFromServer();
    }

    function mapping_retriever() {
        retrieveMappingFromServer();
        setTimeout(function () {
            mapping_retriever();
        }, 60000);
    }

    mapping_retriever();

    if (!global.sense) global.sense = {};
    global.sense.mappings = {};
    global.sense.mappings.getFields = getFields;
    global.sense.mappings.getIndices = getIndices;
    global.sense.mappings.getTypes = getTypes;
    global.sense.mappings.loadMappings = loadMappings;
    global.sense.mappings.loadAliases = loadAliases;
    global.sense.mappings.expandAliases = expandAliases;
    global.sense.mappings.clear = clear;
    global.sense.mappings.notifyServerChange = notifyServerChange;
})();