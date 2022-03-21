module.exports = {
    apps: [
        {
            name: "lc-website-beta",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 7001,
                NODE_ENV: "production"
            }
        },
        {
            name: "lc-website-prod",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 7002,
                NODE_ENV: "production"
            }
        }
    ]
};
