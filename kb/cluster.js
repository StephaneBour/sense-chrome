sense.kb.addEndpointDescription('_nodes/stats', {
    methods: ["GET"],
    endpoint_autocomplete: ['_nodes/stats'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_nodes', {
    methods: ["GET"],
    match: /^_nodes(\/(?!stats)|$)/,
    endpoint_autocomplete: ['_nodes', '_nodes/hot_threads', '_nodes/usage'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_cluster/state', {
    methods: ["GET"],
    endpoint_autocomplete: ['_cluster/state'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_cluster/health', {
    methods: ["GET"],
    endpoint_autocomplete: ['_cluster/health'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_cluster/stats', {
    methods: ["GET"],
    endpoint_autocomplete: ['_cluster/stats'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_cluster/pending_tasks', {
    methods: ["GET"],
    endpoint_autocomplete: ['_cluster/pending_tasks'],
    indices_mode: "none",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_cluster/allocation/explain', {
    methods: ["GET", "POST"],
    endpoint_autocomplete: ['_cluster/allocation/explain'],
    indices_mode: "none",
    types_mode: "none",
    data_autocomplete_rules: {
        index: "$INDEX$",
        shard: 0,
        primary: {__one_of: [true, false]},
        current_node: ""
    }
});

sense.kb.addEndpointDescription('_cluster/settings', {
    methods: ["GET", "PUT"],
    endpoint_autocomplete: ['_cluster/settings'],
    indices_mode: "none",
    types_mode: "none",
    data_autocomplete_rules: {
        persistent: {
            "cluster.routing.allocation.enable": {__one_of: ["all", "primaries", "new_primaries", "none"]},
            "cluster.routing.rebalance.enable": {__one_of: ["all", "primaries", "replicas", "none"]},
            "cluster.routing.allocation.same_shard.host": {__one_of: [false, true]},
            "cluster.routing.allocation.exclude._name": "",
            "cluster.routing.allocation.exclude._ip": "",
            "cluster.routing.allocation.disk.threshold_enabled": {__one_of: [true, false]},
            "cluster.routing.allocation.disk.watermark.low": "85%",
            "cluster.routing.allocation.disk.watermark.high": "90%",
            "cluster.routing.allocation.disk.watermark.flood_stage": "95%",
            "cluster.max_shards_per_node": 1000,
            "action.auto_create_index": {__one_of: [true, false]},
            "action.destructive_requires_name": {__one_of: [true, false]},
            "indices.recovery.max_bytes_per_sec": "40mb",
            "search.max_buckets": 65536
        },

        transient: {
            __scope_link: ".persistent"
        }
    }
});

sense.kb.addEndpointDescription('_cat', {
    methods: ["GET"],
    match: /^_cat/,
    endpoint_autocomplete: [
        '_cat/aliases', '_cat/allocation', '_cat/count', '_cat/fielddata', '_cat/health', '_cat/indices',
        '_cat/master', '_cat/nodeattrs', '_cat/nodes', '_cat/pending_tasks', '_cat/plugins', '_cat/recovery',
        '_cat/repositories', '_cat/segments', '_cat/shards', '_cat/snapshots', '_cat/tasks', '_cat/templates',
        '_cat/thread_pool'
    ],
    indices_mode: "multi",
    types_mode: "none"
});

sense.kb.addEndpointDescription('_tasks', {
    methods: ["GET", "POST"],
    match: /^_tasks/,
    endpoint_autocomplete: ['_tasks', '_tasks/TASK_ID', '_tasks/TASK_ID/_cancel'],
    indices_mode: "none",
    types_mode: "none"
});
