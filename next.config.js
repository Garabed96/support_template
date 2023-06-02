module.exports = {
  experimental: {
    turbo: {
      loaders: {
        // Option format
        ".md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md",
            },
          },
        ],
        // Option-less format
        ".mdx": ["@mdx-js/loader"],
      },
    },
    serverActions: true,
  },
};
