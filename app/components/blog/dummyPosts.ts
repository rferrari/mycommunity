const dummyPosts = [
    {
        abs_rshares: 0,
        active: "2024-08-16T12:08:18",
        active_votes: [],
        allow_curation_rewards: true,
        allow_replies: true,
        allow_votes: true,
        author: "johndoe",
        author_reputation: "34879294456530",
        author_rewards: 0,
        beneficiaries: [],
        body: "This is a test post for the Hive blockchain. We're testing the layout of the post grid and post card components. This is just a dummy post, but it should give us a good idea of how the posts will look in the final application.",
        body_length: 0,
        cashout_time: "1969-12-31T23:59:59",
        category: "testing",
        children: 0,
        children_abs_rshares: 0,
        created: "2024-08-16T00:41:06",
        curator_payout_value: "0.000 HBD",
        depth: 0,
        id: 85763875,
        json_metadata: {
            app: "myapp/1.0",
            format: "markdown",
            description: "Test post for the Hive blockchain",
            tags: ["testing", "hive"],
            users: ["johndoe"],
            links: [],
            image: ["https://via.placeholder.com/600x400.png?text=Post+Image+1"],
        },
        last_payout: "2024-08-16T00:41:06",
        last_update: "2024-08-16T00:41:06",
        max_accepted_payout: "0.000 HBD",
        max_cashout_time: "1969-12-31T23:59:59",
        net_rshares: 0,
        net_votes: 10,
        parent_author: "",
        parent_permlink: "testing",
        pending_payout_value: "0.000 HBD",
        percent_hbd: 10000,
        permlink: "dummy-post-1",
        promoted: "0.000 HBD",
        reblogged_by: [],
        replies: [],
        reward_weight: 10000,
        root_author: "johndoe",
        root_permlink: "dummy-post-1",
        root_title: "Test Post 1",
        title: "Test Post 1",
        total_payout_value: "0.000 HBD",
        total_pending_payout_value: "0.000 HBD",
        total_vote_weight: 0,
        url: "/testing/@johndoe/dummy-post-1",
        vote_rshares: 0,
    },
    {
        abs_rshares: 0,
        active: "2024-08-16T12:08:18",
        active_votes: [],
        allow_curation_rewards: true,
        allow_replies: true,
        allow_votes: true,
        author: "janedoe",
        author_reputation: "34879294456530",
        author_rewards: 0,
        beneficiaries: [],
        body: "This is another test post to see how different posts appear in the grid. This one has a slightly longer body to test text overflow and multi-line handling.",
        body_length: 0,
        cashout_time: "1969-12-31T23:59:59",
        category: "design",
        children: 0,
        children_abs_rshares: 0,
        created: "2024-08-16T00:41:06",
        curator_payout_value: "0.000 HBD",
        depth: 0,
        id: 85763876,
        json_metadata: {
            app: "myapp/1.0",
            format: "markdown",
            description: "Design post for layout testing",
            tags: ["design", "testing"],
            users: ["janedoe"],
            links: [],
            image: ["https://via.placeholder.com/600x400.png?text=Post+Image+2"],
        },
        last_payout: "2024-08-16T00:41:06",
        last_update: "2024-08-16T00:41:06",
        max_accepted_payout: "0.000 HBD",
        max_cashout_time: "1969-12-31T23:59:59",
        net_rshares: 0,
        net_votes: 20,
        parent_author: "",
        parent_permlink: "design",
        pending_payout_value: "0.000 HBD",
        percent_hbd: 10000,
        permlink: "dummy-post-2",
        promoted: "0.000 HBD",
        reblogged_by: [],
        replies: [],
        reward_weight: 10000,
        root_author: "janedoe",
        root_permlink: "dummy-post-2",
        root_title: "Test Post 2",
        title: "Test Post 2",
        total_payout_value: "0.000 HBD",
        total_pending_payout_value: "0.000 HBD",
        total_vote_weight: 0,
        url: "/design/@janedoe/dummy-post-2",
        vote_rshares: 0,
    },
    {
        abs_rshares: 0,
        active: "2024-08-16T12:08:18",
        active_votes: [],
        allow_curation_rewards: true,
        allow_replies: true,
        allow_votes: true,
        author: "hiveblogger",
        author_reputation: "34879294456530",
        author_rewards: 0,
        beneficiaries: [],
        body: "Here's one more post to round out our test grid. This post includes some markdown formatting **bold text** and _italic text_ to ensure it renders correctly in the preview.",
        body_length: 0,
        cashout_time: "1969-12-31T23:59:59",
        category: "hive",
        children: 0,
        children_abs_rshares: 0,
        created: "2024-08-16T00:41:06",
        curator_payout_value: "0.000 HBD",
        depth: 0,
        id: 85763877,
        json_metadata: {
            app: "myapp/1.0",
            format: "markdown",
            description: "Hive blog post with markdown formatting",
            tags: ["hive", "markdown", "testing"],
            users: ["hiveblogger"],
            links: [],
            image: ["https://via.placeholder.com/600x400.png?text=Post+Image+3"],
        },
        last_payout: "2024-08-16T00:41:06",
        last_update: "2024-08-16T00:41:06",
        max_accepted_payout: "0.000 HBD",
        max_cashout_time: "1969-12-31T23:59:59",
        net_rshares: 0,
        net_votes: 15,
        parent_author: "",
        parent_permlink: "hive",
        pending_payout_value: "0.000 HBD",
        percent_hbd: 10000,
        permlink: "dummy-post-3",
        promoted: "0.000 HBD",
        reblogged_by: [],
        replies: [],
        reward_weight: 10000,
        root_author: "hiveblogger",
        root_permlink: "dummy-post-3",
        root_title: "Test Post 3",
        title: "Test Post 3",
        total_payout_value: "0.000 HBD",
        total_pending_payout_value: "0.000 HBD",
        total_vote_weight: 0,
        url: "/hive/@hiveblogger/dummy-post-3",
        vote_rshares: 0,
    },
];

export default dummyPosts;
